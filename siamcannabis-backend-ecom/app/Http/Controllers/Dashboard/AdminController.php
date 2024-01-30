<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\User;
use App\Address;
use DateTime;
// use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Request;
use Laravel\Ui\Presets\React;
use App\Shops;
use App\Product;
use App\flash;
use App\Helpers;
use App\Kyc;
use App\invs;
use App\PreOrder;
use App\log;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\admin\HomeController as UserHC;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    // count product
    public function coutInvs(Request $request)
    {
        $data = [];
        if (isset($request->dateStart) && $request->dateStart != "" && isset($request->dateEnd) && $request->dateEnd != "") {
            $from = date($request->dateStart);
            $to = date($request->dateEnd);
            $data['invs'] = invs::where('status', 2)->whereBetween('updated_at', [$from, $to])->groupBy('shop_id')->get();
            // dd($data['invs'] );
            $data['group'] = [];
            $data['group']['flashsale'] = [];
            $data['group']['product_s'] = [];
            foreach ($data['invs'] as $key => $value) {
                $data['invs'][$key]->order = invs::where('status', 2)->whereBetween('updated_at', [$from, $to])->where('shop_id', $value->shop_id)->get();
                foreach ($data['invs'][$key]->order as $order_key => $order_value) {
                    foreach ($order_value->inv_products as $inv_products_key => $inv_products_value) {
                        // dd($inv_products_value);
                        $id = $inv_products_value['product_id'];
                        $dis1 = $inv_products_value['dis1'];
                        $dis2 = $inv_products_value['dis2'];
                        // dd($id);
                        if (isset($inv_products_value['type']) && $inv_products_value['type'] == 'flashsale') {
                            if (isset($data['group']['flashsale'][$id]['data'][$dis1][$dis2])) {

                                $data['group']['flashsale'][$id]['data'][$dis1][$dis2]['amount'] +=  $inv_products_value['amount'];
                            } else {
                                $data['group']['flashsale'][$id]['data'][$dis1][$dis2] =  $inv_products_value;
                            }
                            $data['group']['flashsale'][$id]['product'] = flash::where('id', $id)->first();
                        } else {
                            if (isset($data['group']['product_s'][$id]['data'][$dis1][$dis2])) {

                                $data['group']['product_s'][$id]['data'][$dis1][$dis2]['amount'] +=  $inv_products_value['amount'];
                            } else {
                                $data['group']['product_s'][$id]['data'][$dis1][$dis2] =  $inv_products_value;
                            }
                            $data['group']['product_s'][$id]['product'] = Product::where('id', $id)->first();
                        }
                    }
                }
            }
            if (count($data['group']['flashsale']) > 0) {
                ksort($data['group']['flashsale']);
            }
            if (count($data['group']['product_s']) > 0) {
                ksort($data['group']['product_s']);
            }
        }
        // dd($data['group']);
        return view('countProduct', $data);
    }

    // flash //
    public function updatepromotionFixed(Request $request)
    {
        $data = [];
        if ($request->id) {
            $data['data'] = Product::where('id', $request->id)->first();
        }
        return view('mockup', $data);
    }
    public function updatepromotion(Request $request)
    {
        $time = new DateTime();
        $product = product::where('id', $request->id)->first();
        $product_old_id = $product->product_option;
        //   dd($product_old_id);
        foreach ($product_old_id['stock'] as $key => $value) {
            $product_old_id['stock'][$key] = $value - $request->amount[$key];
        }
        // echo "<pre>"; print_r($product_old_id['stock']); echo "</pre>";
        // echo "<pre>"; print_r($request->amount); echo "</pre>";
        // echo "<pre>"; print_r($product->product_option['stock']); echo "</pre>";

        // exit();

        $option = $product->product_option;
        // array_push($option, 'quantity' => $request->quantity);
        $option['amount'] = $request->amount;
        $option['discount'] = $product->product_option['price'];
        $option['stock'] = $request->amount;
        $option['price'] = $request->price;
        // dd($option);
        $time_period = "[" . implode(",", $request->time_period) . "]";
        // dd($time_period);
        // $time_period = json_encode($request->time_period);
        // dd($request->time_period);
        $flash = flash::insertGetId([
            'shop_id' => $product->shop_id,
            'name' => $product->name,
            'description' => $product->description,
            'category_id' => $product->category_id,
            'sub_category_id' => $product->sub_category_id,
            'brand_id' => null,
            'warranty_type' => null,
            'product_unit' => null,
            'product_weight' => $product->product_weight,
            'product_L' => $product->product_L,
            'product_W' => $product->product_W,
            'product_H' => $product->product_H,
            'product_option' => json_encode($option),
            'product_img' => json_encode($product->product_img),
            'created_at' => $time,
            'updated_at' => $time,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'product_old_id' => $request->id,
            'time_period' => $time_period,
            'product_pin' => 0,
            'type' => $request->type,
            'status' => 'enabled',
            'product_limit' => $request->limit,
        ]);

        if ($flash) {
            product::where('id', $request->id)->update([
                "product_option" => $product_old_id,
            ]);
            return "true";
        }

        return "false";
        // dd($product);
    }

    public function updatediscount(Request $request)
    {
        $product =  Product::find($request->id);
        $arrNew = $product->product_option;
        foreach ($request->discount2 as $key => $val) {
            $arrNew['stn'][$key] = $val;
        }

        Product::where('id', $request->id)->update([
            'product_option' => $arrNew,
        ]);


        return "true";
    }

    public function editpromotion(Request $request)
    {

        $date = date('Y-m-d');
        $flash = flash::where('end_date', '<', $date)->get();
        // dd($flash);
        foreach ($flash as $product) {
            // dd($product->product_option);
            $product_join = product::where('id', $product->product_old_id)->first();
            $option = $product_join->product_option;
            $flash_option = $product->product_option;
            foreach ($option['stock'] as $key => $value) {
                $option['stock'][$key] = $value + $flash_option['stock'][$key];
            }
            $temp = $product_join->product_option;
            $temp['stock'] =  $option['stock'];
            $product_join->product_option = $temp;
            $update = $product_join->save();
            //    dd($update);

            if ($product) {
                flash::where('id', $product->id)->update([
                    "status" => 'unenabled',
                ]);
                return "true";
            }
            return "false";
        }
    }



    public function deletedpromotion(Request $request)
    {

        $flash = flash::whereIn('id', $request->id)->get();
        // dd($flash);
        foreach ($flash as $product) {
            // dd($product->product_option);
            $product_join = product::where('id', $product->product_old_id)->first();
            $option = $product_join->product_option;
            $flash_option = $product->product_option;
            foreach ($option['stock'] as $key => $value) {
                $option['stock'][$key] = $value + $flash_option['stock'][$key];
            }
            $temp = $product_join->product_option;
            $temp['stock'] =  $option['stock'];
            $product_join->product_option = $temp;
            $update = $product_join->save();
            //    dd($update);

            if ($product) {
                $flash_del = flash::whereIn('id', $request->id)->delete();
                // dd($flash_del);
                return "true";
            }
            return "false";
        }
    }

    public function pinproduct(Request $request)
    {
        for ($i = 0; $i < count($request->id); $i++) {
            $flash[] = flash::where('id', $request->id[$i])->update([
                "product_pin" => '1',
            ]);
        }
        return 'true';
    }

    public function dispinproduct(Request $request)
    {
        for ($i = 0; $i < count($request->id); $i++) {
            $flash[] = flash::where('id', $request->id[$i])->update([
                "product_pin" => '0',
            ]);
        }
        return 'true';
    }

    public function myproduct(Request $request)
    {
        // dd($request);
        if (isset($request->search)) {
            $product =  product::select('product_s.*', 'shops.shop_name')->selectRaw("JSON_EXTRACT(product_option, '$.stock') as stock")->leftJoin('shops', 'shops.id', 'product_s.shop_id')->orderBy('product_s.created_at', 'asc');
            foreach ($_GET as $key => $val) {
                if ($key == 'date_start' and $val != '') {
                    // dd($val);
                    $product = $product->where('start_date', '>=', $val);
                } elseif ($key == 'date_end' and $val != '') {
                    $product = $product->where('end_date', '<=', $val);
                } elseif ($key == 'status' and $val != '') {
                    if ($val == '2') {
                    } else {
                        $product = $product->where('product_pin', $val);
                    }
                } elseif ($key == 'p_name' and $val != '') {
                    $product = $product->where('name', 'like', '%' . $val . '%');
                } elseif ($key == 'remain_start' and $val != '') {
                    $product = $product->where(DB::raw("JSON_EXTRACT(product_option, '$.stock')"), '>=', $val);
                } elseif ($key == 'remain_end' and $val != '') {
                    $product = $product->where(DB::raw("JSON_EXTRACT(product_option, '$.stock')"), '<=', $val);
                } elseif ($key == 'price_start' and $val != '') {
                    $product = $product->where(DB::raw("JSON_EXTRACT(product_option, '$.price')"), '>=', $val);
                } elseif ($key == 'price_end' and $val != '') {
                    $product = $product->where(DB::raw("JSON_EXTRACT(product_option, '$.price')"), '<=', $val);
                } elseif ($key == 's_name' and $val != '') {
                    $product = $product->where('shop_name', 'like', '%' . $val . '%');
                } elseif ($key == 'chkIsPromoSearch' and $val == 'Y') {
                    $product = $product->where('is_promo', '=', '' . $val . '');
                }
            }
            $product = $product->paginate(50);
            // dd($product);
            // $product = $product->toSql();
        } else {
            $product =  product::select('product_s.*', 'shops.shop_name')->leftJoin('shops', 'shops.id', 'product_s.shop_id')->orderBy('product_s.created_at', 'asc')->paginate(50);
        }
        // dd($product);
        // $flash_s = flash::where('status', 'enabled')->orderBy('product_pin', 'desc')->get();
        // dd($flash_s);
        // dd($product);
        return view('dashboard.flash_sale', compact('product'));
    }


    public function myproductban(Request $request)
    {
        $product = product::where('id', $request->id)->first();
        if ($product->status_goods == '99') {
            product::where('id', $request->id)->update([
                'status_goods' => '1',
                'note' => '',
                'updated_at' => new DateTime(),
            ]);
        } else {
            if ($request->note == '') {
                return "false";
            }
            product::where('id', $request->id)->update([
                'status_goods' => '99',
                'note' => $request->note,
                'updated_at' => new DateTime(),
            ]);
        }
        return "true";
    }

    public function set_promo_item(Request $request)
    {
        $product = product::where('id', $request->set_promo_product_id)->first();
        if ($product->is_promo == '' || $product->is_promo == 'N') {
            product::where('id', $request->set_promo_product_id)->update([
                'is_promo' => 'Y',
                'updated_at' => new DateTime(),
            ]);
        } else {
            product::where('id', $request->set_promo_product_id)->update([
                'is_promo' => 'N',
                'updated_at' => new DateTime(),
            ]);
        }
        return "true";
    }
    public function unset_promo_item(Request $request)
    {
        $product = product::where('id', $request->unset_promo_product_id)->first();
        if ($product->is_promo == 'Y') {
            product::where('id', $request->unset_promo_product_id)->update([
                'is_promo' => 'N',
                'updated_at' => new DateTime(),
            ]);
        } else {
            product::where('id', $request->unset_promo_product_id)->update([
                'is_promo' => 'Y',
                'updated_at' => new DateTime(),
            ]);
        }
        return "true";
    }

    // flash //

    public function product_ninebaht(Request $request)
    {

        // $product =  product::select('product_s.*', 'shops.shop_name')->leftJoin('shops', 'shops.id', 'product_s.shop_id')->orderBy('product_s.created_at', 'asc')->get();
        // dd($product);
        if (isset($request->search)) {
            $flash_s = flash::where('status', 'enabled')->orderBy('product_pin', 'desc');
            foreach ($_GET as $key => $val) {
                if ($key == 'date_start' and $val != '') {
                    // dd($val);
                    $flash_s = $flash_s->where('start_date', '>=', $val);
                } elseif ($key == 'date_end' and $val != '') {
                    $flash_s = $flash_s->where('end_date', '<=', $val);
                } elseif ($key == 'status' and $val != '') {
                    if ($val == '2') {
                    } else {
                        $flash_s = $flash_s->where('product_pin', $val);
                    }
                } elseif ($key == 'p_name' and $val != '') {
                    $flash_s = $flash_s->where('name', 'like', '%' . $val . '%');
                } elseif ($key == 'remain' and $val != '') {
                    $product = $flash_s->where(DB::raw("JSON_EXTRACT(product_option, '$.stock')"), 'like', '%' . $val . '%');
                } elseif ($key == 'amoung' and $val != '') {
                    $product = $flash_s->where(DB::raw("JSON_EXTRACT(product_option, '$.amount')"), 'like', '%' . $val . '%');
                } elseif ($key == 'price' and $val != '') {
                    $product = $flash_s->where(DB::raw("JSON_EXTRACT(product_option, '$.price')"), 'like', '%' . $val . '%');
                } elseif ($key == 'u_name' and $val != '') {
                    $flash_s = $flash_s->where('users.name', 'like', '%' . $val . '%');
                }
            }
            $flash_s = $flash_s->paginate(50);
        } else {
            $flash_s = flash::where('status', 'enabled')->orderBy('product_pin', 'desc')->paginate(50);
        }
        // dd($flash_s);
        return view('dashboard.nine_baht', compact('flash_s'));
    }



    public function getDataUser(Request $request)
    {
        if (isset($request->search)) {
            $user = User::with('Kyc')->orderBy('created_at', 'desc');
            foreach ($_GET as $key => $val) {
                if ($key == 'chkISShop' and $val != '') {
                    $user = $user->whereRaw('exists(select id from shops where shops.user_id=users.id)');
                } elseif ($key == 'date_start' and $val != '') {
                    $user = $user->where('created_at', '>=', $val. ' 00:00:00');
                } elseif ($key == 'date_end' and $val != '') {
                    $user = $user->where('created_at', '<=', $val. ' 23:59:59');
                } elseif ($key == 'kyc_select' and $val != '') {
                    if ($val == '0') {
                    } else {
                        $user = $user->where('kyc_status', $val);
                    }
                } elseif ($key == 'sex' and $val != '') {
                    if ($val == '0') {
                    } else {
                        $user = $user->where('sex', $val);
                    }
                } elseif ($key == 'email' and $val != '') {
                    $user = $user->where('email', 'like', '%' . $val . '%');
                } elseif ($key == 'phone' and $val != '') {
                    $user = $user->where('phone', 'like', '%' . $val . '%');
                } elseif ($key == 'u_name' and $val != '') {
                    // dd($val);
                    $user = $user->where(DB::raw("CONCAT(name , ' ' , surname)"), 'like', '%' . $val . '%');
                    // $user = $user->select(DB::raw("CONCAT('name' , ' ' , 'surname') as con"));
                    // $user = $user->where('name', 'like', '%' . $val . '%');
                }
            }

            $user = $user->paginate(50);
            // dd($user[2]->kyc[0]->image_second);
        } else {
            $user = User::with('kyc')->orderBy('created_at', 'desc')->paginate(50);
        }

        foreach($user as $val_user){
            $user_shop = Shops::where('user_id', $val_user->id)->first();
            if($user_shop != null){
                $val_user->shop_name = $user_shop->shop_name;
            }

            if($val_user->sex == 'male'){
                $val_user->sex = 'ชาย';
            }else if($val_user->sex == 'female'){
                $val_user->sex = 'หญิง';
            }
            $s_origin_addr = ''; $s_shop_addr = [];
            $o_user_addr = Address::where('user_id', $val_user->id)->get();
            if( $o_user_addr ) {
                foreach ($o_user_addr as $key => $val) {
                    if($val->status_address == '2') {
                        $s_origin_addr = $val->address1.' '.$val->address2.' '.$val->county.' '.$val->district.' '.$val->city.' '.$val->zipcode.' '.$val->country;
                    } else {
                        $s_shop_addr[] = $val->address1.' '.$val->address2.' '.$val->county.' '.$val->district.' '.$val->city.' '.$val->zipcode.' '.$val->country;
                    }
                }
            }
            $val_user->origin_addr = $s_origin_addr;
            $val_user->shop_addr = $s_shop_addr;
        }
        // $approve = User::whereIn('kyc_status', [2, 3])->where('kyc_pic', '!=', 'user.svg')->orderBy('updated_at', 'desc')->get();
        //Admin Only\\
        // $admin = User::where('type', '0')->where('kyc_status', '1')->orderBy('updated_at', 'desc')->get();
        // dd($admin);
        // $Isadmin = User::where('type', '1')->orderBy('updated_at', 'desc')->get();
        // dd($Isadmin);
        //Admin Only\\
        // $ban = User::where('type', '=', '99')->orderBy('updated_at', 'desc')->get();
        // dd($ban);
        // echo '<pre>';
        // print_r($user);
        // echo '</pre>'; exit;
        $data = ['user'];

        return view('dashboard.approve', compact($data));
    }


    public function btn_approve(Request $request)
    {
        // Approve Status 0 = Not Approve , 1 = Approved \\
        // ['0' => 'กรุณาใส่รูปภาพ', '1' => 'ตรวจสอบผ่านแล้ว', '2' => 'ทำการแก้ไขรูปภาพ', '3' => 'รอการตรวจสอบ'];
        // $kyc = new Kyc();
        // $kyc->status_second = 1;
        // $kyc->save();

        Kyc::where('user_id', $request['id'])->update([
            'status_second' => '1',
            'updated_at' => new DateTime(),
        ]);

        Shops::where('user_id', $request['id'])->update([
            'kyc_status' => 'approve',
            'updated_at' => new DateTime(),
        ]);

        User::where('id', $request['id'])->update([
            'kyc_status' => '1',
            'updated_at' => new DateTime(),
        ]);

        return redirect()->back();
    }
    // public function deletepic(Request $request)
    // {
    //     User::where('id', $request['id'])->update([
    //         // 'kyc_pic' => "kyc.png",
    //         'kyc_status' => "2",
    //         'kyc_remark' => $request['txtRemark']
    //     ]);
    //     return redirect()->back();
    // }

    public function deletepic(Request $request)
    {
        Kyc::where('user_id', $request['id'])->update([
            'status_second' => '3',
            'updated_at' => new DateTime(),
        ]);

        Shops::where('user_id', $request['id'])->update([
            'kyc_status' => null,
            'updated_at' => new DateTime(),
        ]);

        User::where('id', $request['id'])->update([
            'kyc_status' => "2",
            'kyc_remark' => $request['remark']
        ]);
        return redirect()->back();
    }

    public function BeAdmin(Request $request)
    {
        // Be Admin Status 0 = Not user , 1 = admin \\
        // dd($request);
        User::whereIn('id', $request['id'])->update([
            'type' => '1',
            'updated_at' => new DateTime(),
        ]);



        return redirect()->back();
    }
    public function retireAdmin(Request $request)
    {
        // dd($request);
        User::where('id', $request['id'])->update([
            'type' => '0',
            'updated_at' => new DateTime(),
        ]);
        return back();
    }






    public function BanUser(Request $request)
    {

        // Ban Status 0 = Not ban , Ban = 99 \\
        // dd($request);
        User::where('id', $request['id'])->update([
            'type' => '99',
            'updated_at' => new DateTime(),
        ]);

        return redirect()->back();
    }
    public function Unban(Request $request)
    {
        User::where('id', $request['id'])->update([
            'type' => '0',
            'updated_at' => new DateTime(),
        ]);
        return redirect()->back();
    }

    public function influencer()
    {
        ini_set('max_execution_time', 300);
        $shop = shops::select('shops.*', 'users.name', 'users.surname', 'users.phone', 'users.email')->leftJoin('users', 'shops.user_id', '=', 'users.id')->orderBy('shops.created_at', 'desc')->paginate(50);
        // dd($shop);
        return view('dashboard.influencer', compact('shop'));
    }
    public function search_data(Request $request)
    {
        ini_set('max_execution_time', 300);
        // dd($request);
        $shop = shops::select('shops.*', 'users.name', 'users.surname', 'users.phone', 'users.email')->leftJoin('users', 'shops.user_id', '=', 'users.id')->orderBy('created_at', 'desc');
        foreach ($_GET as $key => $val) {
            if ($key == 'start_date' and $val != '') {
                $shop = $shop->where('shops.created_at', '>=', $val . ' 00:00:00');
            } elseif ($key == 'end_date' and $val != '') {
                $shop = $shop->where('shops.created_at', '<=', $val . ' 23:59:59');
            } elseif ($key == 'Influencer' and $val != '') {
                $shop = $shop->where('Influencer', 'like', '%' . $val . '%');
            } elseif ($key == 'shop_name' and $val != '') {
                $shop = $shop->where('shop_name', 'like', '%' . $val . '%');
            } elseif ($key == 'shop_select' and $val != '' and $val != '0') {
                $shop = $shop->where('approve_shop', 'like', '%' . $val . '%');
            }
            // dd($_GET);
        }
        $shop = $shop->paginate(50)->appends(request()->query());
        // dd($shop);

        return view('dashboard.influencer', compact('shop'));
    }
    public function dont_Pesernal()
    {
        ini_set('max_execution_time', 300);
        $shop = shops::where('Influencer', null)->orderBy('created_at', 'desc')->paginate(50);
        // dd($not);
        return view('dashboard.influencer', compact('shop'));
    }

    public function updateInfluncer(Request $request)
    {
        // dd($request);
        ini_set('max_execution_time', 300);

        if (!isset($request['approve_shop'])) {
            return redirect()->back()->with('alert', 'กรุณาเลือกรายการที่จะทำการตรวจสอบ');
        }
        foreach ($request['approve_shop'] as $id) {
            shops::where('id', $id)->update([
                'approve_shop' => 1
            ]);
        }
        return redirect()->back();
    }

    public function killInfluncer(Request $request)
    {
        // dd($request);
        ini_set('max_execution_time', 300);
        if (!isset($request['approve_shop'])) {
            return redirect()->back()->with('alert', 'กรุณาเลือกรายการที่จะทำการตรวจสอบ');
        }

        foreach ($request['approve_shop'] as $id) {
            $shop_inv = invs::where('shop_id', $request->approve_shop)->get();
            if (count($shop_inv) > 0) {
                return redirect()->back()->with('alert', 'ไม่สามารถลบรายการที่มีการสั่งซื้อได้');
            }

            $shops_product = Product::where('shop_id', $id)->get();
            if (count($shops_product) > 0) {
                foreach ($shops_product as $val) {
                    Product::where('id', $val->id)->delete();
                }
            }

            $shops_flsh_product = flash::where('shop_id', $id)->get();
            if (count($shops_flsh_product) > 0) {
                foreach ($shops_flsh_product as $val) {
                    flash::where('id', $val->id)->delete();
                }
            }

            $shops_pre_product = PreOrder::where('shop_id', $id)->get();
            if (count($shops_pre_product) > 0) {
                foreach ($shops_pre_product as $val) {
                    PreOrder::where('id', $val->id)->delete();
                }
            }

            shops::where('id', $id)->delete();

            log::insert([
                'user_id' => Auth::guard('admin')->user()->id,
                'parent_id' => $id,
                'type' => 'admin_delete_shop',
                'note' => 'ลบร้านค้า',
                'status' => '99',
                'ip' => UserHC::getUserIP(),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }
        return redirect()->back();
    }

    public function banInfluncer(Request $request)
    {
        // dd($request);
        ini_set('max_execution_time', 300);
        if (!isset($request['approve_shop'])) {
            return redirect()->back()->with('alert', 'กรุณาเลือกรายการที่จะทำการตรวจสอบ');
        }
        foreach ($request['approve_shop'] as $id) {
            $shops_product = Product::where('shop_id', $id)->get();
            if (count($shops_product) > 0) {
                foreach ($shops_product as $val) {
                    Product::where('id', $val->id)->update([
                        'status_goods' => '99'
                    ]);
                }
            }

            $shops_flsh_product = flash::where('shop_id', $id)->get();
            if (count($shops_flsh_product) > 0) {
                foreach ($shops_flsh_product as $val) {
                    flash::where('id', $val->id)->update([
                        'status' => 'unenabled'
                    ]);
                }
            }

            $shops_pre_product = PreOrder::where('shop_id', $id)->get();
            if (count($shops_pre_product) > 0) {
                foreach ($shops_pre_product as $val) {
                    PreOrder::where('id', $val->id)->update([
                        'status_goods' => '99'
                    ]);
                }
            }

            shops::where('id', $id)->update([
                'approve_shop' => 'decline'
            ]);

            log::insert([
                'user_id' => Auth::guard('admin')->user()->id,
                'parent_id' => $id,
                'type' => 'admin_ban_shop',
                'note' => 'Ban ร้านค้า',
                'status' => '99',
                'ip' => UserHC::getUserIP(),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }
        return redirect()->back();
    }

    public function approveInfluncer(Request $request)
    {
        // dd($request->btn_choice);
        // dd($request);
        ini_set('max_execution_time', 300);
        if (!isset($request['approve_shop'])) {
            return redirect()->back()->with('alert', 'กรุณาเลือกรายการที่จะทำการตรวจสอบ');
        }
        if ($request->btn_choice == 'approve') {
            foreach ($request['approve_shop'] as $id) {

                $shops_product = Product::where('shop_id', $id)->get();
                if (count($shops_product) > 0) {
                    foreach ($shops_product as $val) {
                        Product::where('id', $val->id)->update([
                            'status_goods' => '1'
                        ]);
                    }
                }

                $shops_flsh_product = flash::where('shop_id', $id)->get();
                if (count($shops_flsh_product) > 0) {
                    foreach ($shops_flsh_product as $val) {
                        flash::where('id', $val->id)->update([
                            'status' => 'enabled'
                        ]);
                    }
                }

                $shops_pre_product = PreOrder::where('shop_id', $id)->get();
                if (count($shops_pre_product) > 0) {
                    foreach ($shops_pre_product as $val) {
                        PreOrder::where('id', $val->id)->update([
                            'status_goods' => '1'
                        ]);
                    }
                }
                // dd($id);
                shops::where('id', $id)->update([
                    'approve_shop' => $request->btn_choice
                ]);

                $lnwza = shops::where('id', $id)->get();
                // dd($lnwza);

                log::insert([
                    'user_id' => Auth::guard('admin')->user()->id,
                    'parent_id' => $id,
                    'type' => 'admin_ban_shop',
                    'note' => $request->btn_choice . ' ร้านค้า',
                    'status' => '1',
                    'ip' => UserHC::getUserIP(),
                    'created_at' => date('Y-m-d H:i:s')
                ]);
            }
        } else {
            foreach ($request['approve_shop'] as $id) {
                $shops_product = Product::where('shop_id', $id)->get();
                if (count($shops_product) > 0) {
                    foreach ($shops_product as $val) {
                        Product::where('id', $val->id)->update([
                            'status_goods' => '99'
                        ]);
                    }
                }

                $shops_flsh_product = flash::where('shop_id', $id)->get();
                if (count($shops_flsh_product) > 0) {
                    foreach ($shops_flsh_product as $val) {
                        flash::where('id', $val->id)->update([
                            'status' => 'unenabled'
                        ]);
                    }
                }

                $shops_pre_product = PreOrder::where('shop_id', $id)->get();
                if (count($shops_pre_product) > 0) {
                    foreach ($shops_pre_product as $val) {
                        PreOrder::where('id', $val->id)->update([
                            'status_goods' => '99'
                        ]);
                    }
                }
                shops::where('id', $id)->update([
                    'approve_shop' => $request->btn_choice
                ]);

                log::insert([
                    'user_id' => Auth::guard('admin')->user()->id,
                    'parent_id' => $id,
                    'type' => 'admin_ban_shop',
                    'note' => $request->btn_choice . ' ร้านค้า',
                    'status' => '1',
                    'ip' => UserHC::getUserIP(),
                    'created_at' => date('Y-m-d H:i:s')
                ]);
            }
        }
        return redirect()->back();
    }

    public function delbanInfluncer(Request $request)
    {
        // dd($request);
        ini_set('max_execution_time', 300);
        if (!isset($request['approve_shop'])) {
            return redirect()->back()->with('alert', 'กรุณาเลือกรายการที่จะทำการตรวจสอบ');
        }
        foreach ($request['approve_shop'] as $id) {
            $shops_product = Product::where('shop_id', $id)->get();
            if (count($shops_product) > 0) {
                foreach ($shops_product as $val) {
                    Product::where('id', $val->id)->update([
                        'status_goods' => '1'
                    ]);
                }
            }

            $shops_flsh_product = flash::where('shop_id', $id)->get();
            if (count($shops_flsh_product) > 0) {
                foreach ($shops_flsh_product as $val) {
                    flash::where('id', $val->id)->update([
                        'status' => 'enabled'
                    ]);
                }
            }

            $shops_pre_product = PreOrder::where('shop_id', $id)->get();
            if (count($shops_pre_product) > 0) {
                foreach ($shops_pre_product as $val) {
                    PreOrder::where('id', $val->id)->update([
                        'status_goods' => '1'
                    ]);
                }
            }

            shops::where('id', $id)->update([
                'approve_shop' => 'waiting'
            ]);

            log::insert([
                'user_id' => Auth::guard('admin')->user()->id,
                'parent_id' => $id,
                'type' => 'admin_waiting_shop',
                'note' => 'ปลด Ban ร้านค้า',
                'status' => '1',
                'ip' => UserHC::getUserIP(),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }
        return redirect()->back();
    }

    public function shop_delete(Request $request)
    {
        return view('dashboard.kill_shop');
    }
    public function shop_delete_phone(Request $request)
    {
        // $shop = shops::orderBy('created_at', 'desc')->paginate(1000);
        $allphone = trim($request->phone);
        $arr_p = (explode("\r\n", $allphone));
        $arr2_p = implode(",", $arr_p);
        // $shop = Shops::leftJoin('users', 'shops.user_id', '=', 'users.id')->whereIn('users.phone', [$arr2_p])->get();
        $shop = Shops::select('shops.*')->leftJoin('users', 'shops.user_id', '=', 'users.id');
        foreach ($arr_p as $val) {
            $shop = $shop->orWhere('users.phone', $val);
        }
        $shop = $shop->paginate(1000);
        // dd($shop);
        return view('dashboard.influencer', compact('shop'));
    }
}
