<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mobilebanking;
use App\invs;
use App\User;
use App\Shops as shops;
use App\Address;
use App\Product;
use App\Transactions;
use App\invs_wallet;
use App\balance;
use App\PreOrder;
use App\flash;
use App\shipping_details;
use App\twoctwoppayment;
use App\Setting;
use App\Coupon;
use App\CouponInvs;
use DateTime;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Image;
use Auth;
use Session;

class TwoCTwoPController extends Controller
{
    public function credit(Request $request, $inv_ref)
    {
        // dd($request);
        $a_wh_product = explode(',', $request->products);
        $a_wh_inv_no = explode(',', $request->inv_no);
        $shop_array = [];

        DB::beginTransaction();

        try {
            $invs = $basket_all =  invs::where('user_id', Auth::user()->id)->where('inv_ref', $inv_ref)->whereIn('inv_no', $a_wh_inv_no)
                ->where(function ($query) use ($a_wh_product) {
                    foreach ($a_wh_product as $key => $val) {
                        $query->orWhere(DB::raw("JSON_CONTAINS( JSON_EXTRACT(inv_products, '$[*].product_id'), '[\"".$val."\"]' )"), '=', '1');
                    }
                    return $query;
                })
                ->orderBy('updated_at', 'DESC')->get();
            // echo $basket_all; exit;
            $gtotal = $basket_all->sum('shipping_cost') + $basket_all->sum('total');
            
            $payment_description = [];
            // $invs = invs::where('inv_ref', $inv_ref)->get();
            foreach ($invs as $inv) {
                $pro_id = [];
                // $total += $inv->total;
                foreach ($inv->inv_products as $keypro => $inv_product) {
                    if ($inv->inv_products[$keypro]['type'] == 'pre_order') {

                        array_push($pro_id, $inv_product['product_id']);
                        $product = PreOrder::whereIn('id', $pro_id)->get();
                        foreach ($product as $pro) {
                            if (!in_array($pro->name, $payment_description)) {
                                array_push($payment_description, $pro->name);
                            }
                        }
                    } else  if ($inv->inv_products[$keypro]['type'] == 'flashsale') {

                        array_push($pro_id, $inv_product['product_id']);
                        $product = flash::whereIn('id', $pro_id)->get();
                        foreach ($product as $pro) {
                            if (!in_array($pro->name, $payment_description)) {
                                array_push($payment_description, $pro->name);
                            }
                        }
                    } else  if ($inv->inv_products[$keypro]['type'] == null) {

                        array_push($pro_id, $inv_product['product_id']);
                        $product = Product::whereIn('id', $pro_id)->get();
                        foreach ($product as $pro) {
                            if (!in_array($pro->name, $payment_description)) {
                                array_push($payment_description, $pro->name);
                            }
                        }
                    }
                }
            }
            // dd($invs);

            $merchant_id = env('2C2P_MERCHANT_ID');			//Get MerchantID when opening account with 2C2P
    	    $secret_key = env('2C2P_SECRET_KEY');	//Get SecretKey from 2C2P PGW Dashboard
            $order_id  = $inv_ref;
            $currency = env('2C2P_CURRENCY_CODE');

            // $gtotal = ($request_data[0]->total + $request_data[0]->shipping_cost) * 103 / 100;
            // $gtotal = $request_data[0]->total + $request_data[0]->shipping_cost;
            // dd($gtotal);
            $ntotal = number_format($gtotal, 2, '', '');
            $revertamount = mb_strlen((string)$ntotal);
            if ($revertamount < 12) {
                $amount = str_pad($ntotal, 12, "0", STR_PAD_LEFT);
            }

            // $totalb = str_replace('.', '', $totala);
            // $total = str_replace(',', '', $totalb);
            // dd($total);
            $version = env('2C2P_VERSION');
            $payment_url = env('2C2P_URL');
    	    $result_url_1 = env('2C2P_RESULT_URL_1');

            $params = $version.$merchant_id.$payment_description[0].$order_id.$currency.$amount.$result_url_1;
    	    $hash_data = hash_hmac('sha256',$params, $secret_key,false);	//Compute hash value
    	

            //สิ่งที่เพิ่มเข้ามา เพื่ออัพเดทข้อมูล เจมส์ทำเอง
            $address = Address::where('id', $request->address)->get();
            $sort_address = ([
                "name" => $address[0]->name . ' ' . $address[0]->surname,
                "tel" => $address[0]->tel,
                "address" => $address[0]->address1 . ' ' . $address[0]->address2 . ' ' . $address[0]->county . ' ' . $address[0]->district . ' ' . $address[0]->city . ' ' . $address[0]->zipcode . ' ' . $address[0]->country
            ]);

            $invs = invs::where('inv_ref', $inv_ref)->get();
            foreach ($invs as $inv) {
                // dd($inv->shop_id);
                if (!in_array($inv->shop_id, $shop_array)) {
                    array_push($shop_array, $inv->shop_id);
                }
            }
            // dd($shop_array);
            $shipping = explode(',', $request['shipping']);
            // dd($shipping);
            $shop_id = explode(',', $request['shop']);

            foreach ($shipping as $key => $ship) {
                // dd($shipping);
                // if (dd(array_reverse($shop_array[$key])) == $shop_id[$key]) {
                $test = invs::where('inv_ref', $request->inv_ref)->where('shop_id', $shop_array[$key])->update([
                    'shipping_id' => $ship,
                    'address' => [$sort_address],
                    'updated_at' => new DateTime()
                ]);
            }

            $a_inv_no = explode(',', $request->inv_no);

            $o_setting = Setting::where('id', '=', '1')->first();

            $time = new DateTime();
            
            $i_disc_product = $i_disc_ship = $i_total_disc = 0; $s_disc_to = $i_coupon_id = '';

            if( $request->coupon_code != '' ) {
                $o_coupon =  Coupon::where('code', strtoupper($request->coupon_code) )
                        ->where('remain_amt', '>', 0)->where('min_buy', '<', $basket_all->sum('total') )
                        ->whereRaw('(CASE `cust_type` WHEN \'NEW\' THEN (!exists( SELECT * FROM invs WHERE user_id = \''.Auth::user()->id.'\' AND status IN (2,3,4,43,5,52,53,54,7) ) ) ELSE TRUE END) ')
                        ->where('start_dt', '<=', $time->format('Y-m-d H:i:s'))->where('end_dt', '>=', $time->format('Y-m-d H:i:s') )->first();

                if( $o_coupon === null ) {
                    return redirect()->back()->with('messageError', trans('message.warn_coupon_ran_out') );
                }
                $s_disc_to = $o_coupon->disc_to;
                $i_coupon_id = $o_coupon->coupon_id;
                if( $o_coupon->disc_to == 'PRODUCT' ) {
                    if( $o_coupon->disc_type == 'PERCENT' ) {
                        $i_disc_product = ( $basket_all->sum('total') * $o_coupon->disc_percent ) / 100;
                        if( $i_disc_product > $o_coupon->disc_amt ) {
                            $i_disc_product = $o_coupon->disc_amt;
                        }
                    } else {
                        $i_disc_product = $o_coupon->disc_amt;
                    }
                } elseif( $o_coupon->disc_to == 'SHIP' ) {
                    $i_disc_ship = $o_coupon->disc_amt;
                }
                $i_total_disc = $i_disc_product + $i_disc_ship;
            }
            foreach ($a_inv_no as $key => $v_inv_no) {
                $a_invs = invs::where('inv_ref', $request->inv_ref)->where('inv_no', $v_inv_no)->first();
                $i_inv_disc = 0;
                if( $s_disc_to == 'PRODUCT' ) {
                    $i_inv_disc = ($a_invs->total / $basket_all->sum('total')) * $i_disc_product;
                }
                if( $s_disc_to == 'SHIP' ) {
                    $i_inv_disc = ($a_invs->shipping_cost / $basket_all->sum('shipping_cost')) * $i_disc_amt;
                }

                invs::where('user_id', Auth::user()->id)->where('inv_ref', $inv_ref)->where('inv_no', $v_inv_no)->update([
                    'payment' => 'credit',
                    'status' => '1',
                    'gp_rate' => $o_setting->gp_rate,
                    'coupon_id' => $i_coupon_id,
                    'coupon_code' => strtoupper($request->coupon_code),
                    'coupon_at' => new DateTime(),
                    'disc_to' => $s_disc_to,
                    'disc_amt' => $i_inv_disc,
                    'updated_at' => new DateTime()
                ]);
            }
            
            if( $request->coupon_code != '' ) {
                $i_chk_coupon_invs = CouponInvs::where('coupon_code', $request->coupon_code)->where('inv_ref', $request->inv_ref)->where('inv_no', $request->inv_no)
                    ->distinct()->count('inv_ref');
                $i_dis = 0;
                if( $i_chk_coupon_invs == 0 ) {
                    $i_dis = 1;
                    CouponInvs::create([
                        'inv_ref' => $request->inv_ref,
                        'inv_no' => $request->inv_no,
                        'coupon_code' => strtoupper( $request->coupon_code ),
                        'created_by' => Auth::user()->id,
                        'created_at' => new DateTime()
                    ]);
                }
                Coupon::where('coupon_id', $o_coupon->coupon_id)->update([
                        'remain_amt'  =>  $o_coupon->remain_amt - $i_dis,
                        'updated_at' => new DateTime()
                ]);
            }

            // dd(env('SCB_APP_REQUEST_TOKEN_URL'));
            $grandtotal = $total = number_format($gtotal - $i_total_disc, 2, '.', '');

            $data["total_price"] = $grandtotal;
            $data["payment_url"] = $payment_url;
            $data["version"] = $version;
            $data["merchant_id"] = $merchant_id;
            $data["currency"] = $currency;
            $data["result_url_1"] = $result_url_1;
            $data["hash_value"] = $hash_data;
            $data["payment_description"] = $payment_description[0];
            $data["order_id"] = $order_id;
            $data["amount"] = $amount;

            DB::commit();

            return view('pages.product-payment-credit-2c2p', $data);
        } catch (\Exception $e) {
            DB::rollback();
            // throw $e;

            return redirect()->back()->with('messageError', trans('message.warn_something_went_wrong') );
        }
    }
    
    public function Response2c2pCredit(Request $request){

        $transectionlog = new twoctwoppayment();
        $transectionlog->version = $request->version;
        $transectionlog->request_timestamp = $request->request_timestamp;
        $transectionlog->merchant_id = $request->merchant_id;
        $transectionlog->currency = $request->currency;
        $transectionlog->order_id = $request->order_id;
        $transectionlog->amount = $request->amount;
        $transectionlog->invoice_no = $request->invoice_no;
        $transectionlog->transaction_ref = $request->transaction_ref;
        $transectionlog->approval_code = $request->approval_code;
        $transectionlog->eci = $request->eci;
        $transectionlog->transaction_datetime = $request->transaction_datetime;
        $transectionlog->payment_channel = $request->payment_channel;
        $transectionlog->payment_status = $request->payment_status;
        $transectionlog->channel_response_code = $request->channel_response_code;
        $transectionlog->channel_response_desc = $request->channel_response_desc;
        $transectionlog->masked_pan = $request->masked_pan;
        $transectionlog->stored_card_unique_id = $request->stored_card_unique_id;
        $transectionlog->backend_invoice = $request->backend_invoice;
        $transectionlog->paid_channel = $request->paid_channel;
        $transectionlog->paid_agent = $request->paid_agent;
        $transectionlog->recurring_unique_id = $request->recurring_unique_id;
        $transectionlog->ippPeriod = $request->ippPeriod;
        $transectionlog->ippInterestType = $request->ippInterestType;
        $transectionlog->ippInterestRate = $request->ippInterestRate;
        $transectionlog->ippMerchantAbsorbRate = $request->ippMerchantAbsorbRate;
        $transectionlog->payment_scheme = $request->payment_scheme;
        $transectionlog->process_by = $request->process_by;
        $transectionlog->sub_merchant_list = $request->sub_merchant_list;
        $transectionlog->issuer_country = $request->issuer_country;
        $transectionlog->issuer_bank = $request->issuer_bank;
        $transectionlog->card_type = $request->card_type;
        $transectionlog->user_defined_1 = $request->user_defined_1;
        $transectionlog->user_defined_2 = $request->user_defined_2;
        $transectionlog->user_defined_3 = $request->user_defined_3;
        $transectionlog->user_defined_4 = $request->user_defined_4;
        $transectionlog->user_defined_5 = $request->user_defined_5;
        $transectionlog->browser_info = $request->browser_info;
        $transectionlog->hash_value = $request->hash_value;
        $transectionlog->save();

        // dd($transectionlog);

        if ($request->payment_status =='000'){
            $inv_ref = $request->order_id;
            $ids = [];

            if(strpos($inv_ref,'wallet')!== false){
                invs_wallet::where('inv_ref', $inv_ref)->update([
                    'status' => 2,
                ]);

                $invswallet =  invs_wallet::where('inv_ref', $inv_ref)->first();
                // dd($invswallet->user_id);
                $getcredit =  balance::where('user_id', $invswallet->user_id)->first();

                /////////ยอดเข้า wallet หัก ค่าทธรรมเนียม 3%
                $realcredit=$invswallet->total*100/103;
                // dd($realcredit);

                $newcredit = $getcredit->credit +  $realcredit;

                balance::where('user_id', $invswallet->user_id)->update([
                    'credit' => $newcredit,
                ]);
                array_push($ids, $invswallet->id);

                $transactions = new Transactions();
                $transactions->type = 'wallet Credit';
                $transactions->user_id = $invswallet->user_id;
                $transactions->inv_ref = $invswallet->inv_ref;
                $transactions->total = $invswallet->total;
                $transactions->point = 0;
                $transactions->coin = 0;
                $transactions->status = 2;
                $transactions->payment = 'wallet Credit';
                $transactions->inv_id = array("id"=> $ids);
                $transactions->save();



            } else {

                DB::update('update invs set status = 2 where inv_ref = ?',[$inv_ref]);

                $ids = [];
                // $time = new DateTime();
                $new_id_invs = [];
                $new_inv_ref = [];
                $basket_all =  invs::where('inv_ref', $inv_ref)->get();

                $data = [];
                foreach ($basket_all as $key_cost => $val_cost) {
                    if ($val_cost->uidmp != null || $val_cost->uidmp != '') {
                        $sale_cost = 0;
                        $inv_mp = [];
                        $inv_mp['inv_id'] = $val_cost->id;
                        foreach ($val_cost->inv_products as $key_pro => $val_pro) {
                            if (isset($val_pro['margin']) && $val_pro['margin'] != null && $val_pro['margin'] != '') {
                                $inv_mp['products'][$key_pro] = $val_pro;
                                $sale_cost += (($val_pro['price'] - $val_pro['margin']) * $val_pro['amount']);
                            }
                        }
                        $inv_mp['sale_cost'] = $sale_cost;
                        $inv_mp['mp_cost'] = $sale_cost * 0.85;
                        $inv_mp['stn_cost'] = $sale_cost * 0.15;
                        $inv_mp['status'] = 1;

                        // array_push($data, $inv_mp);
                        $data['data_mp'][$key_cost] = $inv_mp;
                    }

                    $val_shop = shops::where('id', $val_cost->shop_id)->first();
                    // dd($val_cost);
                    if (isset($val_shop->Influencer) && $val_shop->Influencer != '') {
                        if (isset($val_shop->influence_date) && $val_shop->influence_date != '') {
                            $now = new DateTime();
                            $now = date_format($now, "Y-m-d");
                            $now = date_create($now);
                            date_sub($now, date_interval_create_from_date_string("3 month"));
                            $now = date_format($now, "Y-m-d");

                            // $date = date_format($val_shop->influence_date, "Y-m-d");

                            if ($now <= $val_shop->influence_date) {
                                $data['data_influ'][$key_cost]['inv_id'] = $val_cost->id;
                                $data['data_influ'][$key_cost]['influ_id'] = $val_shop->Influencer;
                                $data['data_influ'][$key_cost]['influ_cost'] = $val_cost->total * 0.01;
                            }
                        }
                    }
                }

                foreach ($basket_all as $invs_mp) {
                    if (isset($data['data_mp']) || isset($data['data_influ'])) {
                        if (isset($data['data_mp'])) {
                            $data_array = array(
                                "inv_no" => $invs_mp->inv_ref,
                                "uidmp" => $invs_mp->uidmp,
                                "data" => $data,
                                "domain" => 'birdfresh',
                            );
                        } else {
                            $data_array = array(
                                "inv_no" => $invs_mp->inv_ref,
                                "data" => $data,
                                "domain" => 'birdfresh',
                            );
                        }
                        $make_call = $this->callAPI('POST', 'https://dev.shopteeniimp.com/api/v1/insert_invs', json_encode($data_array));
                        $response = json_decode($make_call, true);
                    }
                }

                foreach ($basket_all as $value) {

                    array_push($ids, $value->id);

                    $invs = invs::where('id', $value->id)->first();
                    foreach ($invs->inv_products as $value2) {
                        $pd_all[] = $value2;
                        $pd_id[]      = $value2['product_id'];
                        $pd_amoung[]  = $value2['amount'];
                        $pd_option[]  = $value2['option1'];
                        $pd_dis1[]  = $value2['dis1'];

                    }


                    foreach ($pd_all as $key => $val) {
                        if ($val['type'] == 'pre_order') {
                            $get_pd = PreOrder::where('id', $pd_id[$key])->first();
                            $arrNew = $get_pd->preOrder_option;
                            $lengthDis2 = count($arrNew[0]['dis2']);
                            $key_dis1 = array_search($val['dis1'], $arrNew[0]['dis1']);
                            $key_dis2 = array_search($val['dis2'], $arrNew[0]['dis2'] ?? null);
                            $stock_key = $key_dis1 * $lengthDis2 + $key_dis2;

                            $key_start_date = array_keys(array_column($arrNew[0]['datetime_range'], 'start_date'), $val['start_date']);
                            $in_stock = $arrNew[0]['datetime_range'][$key_start_date[0]]['stock'][$stock_key];


                            $sales = $get_pd->sales + $val['amount'];
                            $arrNew[0]['datetime_range'][$key_start_date[0]]['stock'][$stock_key] =  $in_stock - $val['amount'];
                            PreOrder::where('id', $pd_id[$key])->update([
                                'preOrder_option' => $arrNew,
                                'sales' => $sales
                            ]);


                        } else {

                            $get_pd = Product::where('id', $pd_id[$key])->first();
                            $arrNew = $get_pd->product_option;
                            $lengthDis2 = count($get_pd->product_option['dis2']);
                            $key_dis1 = array_search($val['dis1'], $get_pd->product_option['dis1']);
                            $key_dis2 = array_search($val['dis2'], $get_pd->product_option['dis2']);
                            $stock_key = $key_dis1 * $lengthDis2 + $key_dis2;
                            $in_stock = $get_pd->product_option['stock'][$stock_key];

                            $sales = $get_pd->sales + $val['amount'];
                            $arrNew['stock'][$stock_key] =  $in_stock - $val['amount'];
                            Product::where('id', $pd_id[$key])->update([
                                'product_option' => $arrNew,
                                'sales' => $sales
                            ]);
                        }
                    }

                    // $get_pd = Product::where('id', $pd_id)->first();
                    // $arrNew = $get_pd->product_option;
                    // $lengthDis2 = count($get_pd->product_option['dis2']);
                    // foreach ($pd_all as $key => $val) {
                    //     $key_dis1 = array_search($val['dis1'], $get_pd->product_option['dis1']);
                    //     $key_dis2 = array_search($val['dis2'], $get_pd->product_option['dis2']);
                    //     $stock_key = $key_dis1 * $lengthDis2 + $key_dis2;
                    //     $in_stock = $get_pd->product_option['stock'][$stock_key];

                    // array_push($ids, $value->id);

                    // $invs = invs::where('id', $value->id)->first();
                    // foreach ($invs->inv_products as $value) {
                    //     $pd_all[] = $value;
                    //     $pd_id[]      = $value['product_id'];
                    //     $pd_amoung[]  = $value['amount'];
                    //     $pd_option[]  = $value['option1'];
                    //     $pd_dis1[]  = $value['dis1'];
                    // }

                    $weight = shipping_details::where('shipde_id', $invs->shipping_id)->first();
                    $price_weight = ($weight->shipde_price / count($pd_all));


                    //แยก invs เอาออกก่อน เพราะฟังก์ชั่นผิด----------------------------------------------------------

                    // $inv_ref = $time->format('YmdHis') . $invs->user_id;
                    //ถ้า pd_all มากกว่าหรือเท่ากับ 2
                    // if (count($pd_all) >= 2) {
                    //     foreach ($pd_all as $key => $val) {
                    //         //แยกตาม val type
                    //         if ($val['type'] == 'pre_order') {

                    //             $new_data = invs::create([
                    //                 'inv_ref' => $invs->inv_ref . "_PreOder",
                    //                 'shop_id' => $invs->shop_id,
                    //                 'inv_products' => [$val],
                    //                 'user_id' => $invs->user_id,
                    //                 'shipping_cost' => $price_weight,
                    //                 'payment' => $invs->payment,
                    //                 'campaign_id' => null,
                    //                 'shipping_id' => $invs->shipping_id,
                    //                 'total' => $val['price'],
                    //                 'note' => 'test',
                    //                 'coupon_id' => null,
                    //                 'status' => 2,
                    //                 'shipping_note' => null,
                    //                 'address' => $invs->address,
                    //                 'transfer_img' => $invs->transfer_img,
                    //                 'transfer_slip' => $invs->transfer_slip,
                    //                 'created_at' => new DateTime(),
                    //                 'updated_at' => new DateTime(),
                    //             ]);
                    //             array_push($new_id_invs, $new_data->id);
                    //             array_push($new_inv_ref, $new_data);
                    //         } else if ($val['type'] == 'flashsale') {
                    //             $new_data = invs::create([
                    //                 'inv_ref' => $invs->inv_ref . "_FlashSale",
                    //                 'shop_id' => $invs->shop_id,
                    //                 'inv_products' => [$val],
                    //                 'user_id' => $invs->user_id,
                    //                 'shipping_cost' => $price_weight,
                    //                 'payment' => $invs->payment,
                    //                 'campaign_id' => null,
                    //                 'shipping_id' => $invs->shipping_id,
                    //                 'total' => $val['price'],
                    //                 'note' => 'test',
                    //                 'coupon_id' => null,
                    //                 'status' => 2,
                    //                 'shipping_note' => null,
                    //                 'address' => $invs->address,
                    //                 'transfer_img' => $invs->transfer_img,
                    //                 'transfer_slip' => $invs->transfer_slip,
                    //                 'created_at' => new DateTime(),
                    //                 'updated_at' => new DateTime(),
                    //             ]);
                    //             array_push($new_id_invs, $new_data->id);
                    //             array_push($new_inv_ref, $new_data);
                    //         } else if ($val['type'] == '9baht') {
                    //             $new_data = invs::create([
                    //                 'inv_ref' => $invs->inv_ref . "_9Baht",
                    //                 'shop_id' => $invs->shop_id,
                    //                 'inv_products' => [$val],
                    //                 'user_id' => $invs->user_id,
                    //                 'shipping_cost' => $price_weight,
                    //                 'payment' => $invs->payment,
                    //                 'campaign_id' => null,
                    //                 'shipping_id' => $invs->shipping_id,
                    //                 'total' => $val['price'],
                    //                 'note' => 'test',
                    //                 'coupon_id' => null,
                    //                 'status' => 2,
                    //                 'shipping_note' => null,
                    //                 'address' => $invs->address,
                    //                 'transfer_img' => $invs->transfer_img,
                    //                 'transfer_slip' => $invs->transfer_slip,
                    //                 'created_at' => new DateTime(),
                    //                 'updated_at' => new DateTime(),
                    //             ]);
                    //             array_push($new_id_invs, $new_data->id);
                    //             array_push($new_inv_ref, $new_data);
                    //         }
                    //     }
                    //     invs::where('id', $request->order_id)->delete();
                    // } else {
                    //     invs::where('id', $request->order_id)->update([
                    //         'status' => 2,
                    //         'updated_at' => new DateTime()
                    //     ]);

                    //     $inv = $basket_all->first();
                    //     $grandtotal = $basket_all->sum('total') + $basket_all->sum('shipping_cost');
                    //     /////////////////////////////ยอดชำระ +ค่าธรรมเนียม 3%
                    //     $caltotal = $grandtotal*103/100;

                    //     $transactions = new Transactions();
                    //     $transactions->type = 'credit';
                    //     $transactions->user_id = $inv->user_id;
                    //     $transactions->inv_ref = $inv->inv_ref;
                    //     $transactions->total = $caltotal;
                    //     $transactions->point = 0;
                    //     $transactions->coin = 0;
                    //     $transactions->status = 2;
                    //     $transactions->payment = 'credit';
                    //     $transactions->inv_id = array("id"=> $ids);
                    //     $transactions->save();

                    // }



                }



                // foreach ($new_id_invs as $value) {
                //     array_push($ids, $value);
                // }

                // foreach ($new_inv_ref as $new_inv) {

                //     $grandtotal = $new_inv->sum('total') + $new_inv->sum('shipping_cost');
                //     /////////////////////////////ยอดชำระ +ค่าธรรมเนียม 3%
                //     $caltotal = $grandtotal * 103 / 100;

                //     $transactions = new Transactions();
                //     $transactions->type = 'credit';
                //     $transactions->user_id = $new_inv->user_id;
                //     $transactions->inv_ref = $new_inv->inv_ref;
                //     $transactions->total = $caltotal;
                //     $transactions->point = 0;
                //     $transactions->coin = 0;
                //     $transactions->status = 2;
                //     $transactions->payment = 'credit';
                //     $transactions->inv_id = array("id" => $ids);
                //     $transactions->save();

                //     // dd($caltotal);


                // }

                //แยก invs เอาออกก่อน เพราะฟังก์ชั่นผิด----------------------------------------------------------


                $inv = $basket_all->first();
                $grandtotal = $basket_all->sum('total') + $basket_all->sum('shipping_cost');
                /////////////////////////////ยอดชำระ +ค่าธรรมเนียม 3%
                $caltotal = $grandtotal*103/100;

                $transactions = new Transactions();
                $transactions->type = 'credit';
                $transactions->user_id = $inv->user_id;
                $transactions->inv_ref = $inv->inv_ref;
                $transactions->total = $caltotal;
                $transactions->point = 0;
                $transactions->coin = 0;
                $transactions->status = 2;
                $transactions->payment = 'credit';
                $transactions->inv_id = array("id"=> $ids);
                $transactions->save();
            }

        }
        // return redirect('/profile_my_sale');
        Session::save();
                        header("Location: ".url()->to(route('profile_my_sale')));
                        exit();
    }

    public function buyWallettctp(Request $request){

        // dd($request);
    try {

        // dd($request);
        $inv_ref = 'wallet'.date('YmdHisu').auth()->user()->id;
        $insert = invs_wallet::insertGetId([
            'user_id' => auth()->user()->id,
            'inv_ref' => $inv_ref,
            'payment' => $request->type,
            'total' => $request->wallet,
            'status' => 1,
            'created_at' => date('Y-m-d H:i:s'),
        ]);
        if($insert){

            $merchant_id = env('2C2P_MERCHANT_ID');			//Get MerchantID when opening account with 2C2P
            $secret_key = env('2C2P_SECRET_KEY');	//Get SecretKey from 2C2P PGW Dashboard
            $order_id  = $inv_ref;
            $currency = "764";


            $gtotal = $request->wallet;
            // dd($gtotal);
            $ntotal = number_format($gtotal, 2, '', '');
            $revertamount = mb_strlen((string)$ntotal);
            if ($revertamount < 12) {
                $amount = str_pad($ntotal, 12, "0", STR_PAD_LEFT);
            }

            // $totalb = str_replace('.', '', $totala);
            // $total = str_replace(',', '', $totalb);
            // dd($total);
            $version = env('2C2P_VERSION');
            $payment_url = env('2C2P_URL');
            $result_url_1 = env('2C2P_RESULT_URL_1');

            $payment_description = "Multi Pay Wallet Payment";
        

            $params = $version.$merchant_id.$payment_description.$order_id.$currency.$amount.$result_url_1;
            $hash_data = hash_hmac('sha256',$params, $secret_key,false);	//Compute hash value

            $data['inv'] = invs_wallet::where('id',$insert)->first();
            $data["hash_value"] = $hash_data;
            $data["payment_description"] = $payment_description;
            $data["order_id"] = $order_id;
            $data["amount"] = $amount;


            // $data['inv'] = invs_wallet::where('id',$insert)->first();
            // $total = number_format($request->wallet, 2, '', '');
            // $data['trade_mony'] = $total;
            // $user = user::where('id',auth()->user()->id)->first();
            // $data['order_first_name'] = $user->name;
            // $data['order_email'] =$user->email;
            // $pay_type = 'PACA';
            // $secure_key = env('TREEPAY_SECURE_KEY');
            // $site_cd = env('TREEPAY_SITE_CD');
            // $hash_string  = $pay_type . $inv_ref . $total . $site_cd . $secure_key . $user->id;
            // $hash_data = hash('sha256', $hash_string);
            // $data['pay_type'] = $pay_type;
            // $data['site_cd'] = $site_cd;
            // $data['hash_data'] = $hash_data;
            
            return response()->json($data);
        }
    } catch (\Exception $exception) {
        return response()->json($exception->getMessage());
        // echo 'error insert';
    }
    
}
    public static function callAPI($method, $url, $data)
    {
        // dd($data);
        $curl = curl_init();
        switch ($method) {
            case "POST":
                // dd('post', $data);
                curl_setopt($curl, CURLOPT_POST, 1);
                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }
        // OPTIONS:
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'Content-Type: application/json',
            'APIKEY: mZWG43D9ygXnOh3wtIHe6Jmev4xCNVNlezPJZPHhqsokPyUliOhwkzIF3tmQ'
        ));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        // EXECUTE:
        $result = curl_exec($curl);
        if (!$result) {
            die("Connection Failure");
        }
        curl_close($curl);
        return $result;
    }

    
}
