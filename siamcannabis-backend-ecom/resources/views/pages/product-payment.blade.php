@extends('layouts.default')
@section('style')

<style>
    body{
        background-color: #F9F9F9 !important;
    }
    .swiper-slide{
        background: unset !important;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: unset !important;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .nav-tabs .nav-item.show .nav-link,
    .nav-tabs .nav-link.active {
        color: #000;
        background-color: #f9f9f9;
        border: 1px solid #34c38f;
        border-radius: 5px;
    }

    .nav-tabs .nav-link:hover {
        color: #000;
        background-color: #f9f9f9;
        border: 1px solid #34c38f;
        border-radius: 5px;
    }

    .nav-tabs .nav-link {
        color: #000;
        background-color: #fafaff;
        border-radius: 5px;
        width: 100%;
        border: 1px solid #fafaff;
    }

    .nav-tabs {
        border: unset;
    }

    .round {
        position: relative;
    }

    .round label {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
        height: 24px;
        left: 0;
        position: absolute;
        top: 0;
        width: 24px;
    }

    .round label:after {
        border: 2px solid #fff;
        border-top: none;
        border-right: none;
        content: "";
        height: 6px;
        left: 6px;
        opacity: 0;
        position: absolute;
        top: 6px;
        transform: rotate(-45deg);
        width: 10px;
    }

    .round input[type="checkbox"] {
        visibility: hidden;
    }

    .round input[type="checkbox"]:checked+label {
        background-color: #66bb6a;
        border-color: #66bb6a;
    }

    .round input[type="checkbox"]:checked+label:after {
        opacity: 1;
    }

    /* width */
    .modal-body ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    .modal-body ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    .modal-body ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    .modal-body ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .bg-demo-custom {
        background-color: rgb(0, 0, 0, 0.5) !important;
    }

    .input_custom_bg {
        background-color: #ededed !important;
    }
    .btn-outline-primary {
    color: #080b65;
    border-color: #080b65;
    }

    .btn-outline-primary:hover {
        color: #fff;
        background-color: #080b65;
        border-color:#080b65
    }
    
</style>

@endsection

@section('content')
<div class="container">
    <div class="row">
        {{-- <<<<<<< shopteenii-web-application/resources/views/pages/product-payment.blade.php  --}}
        <div
            class="col-lg-10 col-md-12 col-12 mx-auto mb-3">
            <div class="row d-lg-block d-md-none d-none">
                <div class="col-12 p-0 mt-2">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb" style="background-color: unset;">
                            <li class="breadcrumb-item"><a href="{{ url('/') }}" style="color: #080b65;">{{ trans('message.back') }}</a>
                            </li>
                            <i class="fa fa-angle-right px-2 d-flex align-items-center" aria-hidden="true"></i>
                            <li class="breadcrumb-item active" aria-current="page">{{ trans('message.invoice') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
            @if(session('messageError'))
            <div class="row">
                <div class="col-12 mt-2 px-0">
                    <div class="alert alert-danger" role="alert">
                        {{ trans('message.warning') }} : {{ session('messageError') }}
                    </div>
                </div>
            </div>
            @endif
            @if(session('stockeOver'))
            <div class="row">
                <div class="col-12 my-4">
                    <div class="alert alert-danger" role="alert">
                        {{ trans('message.warning') }} : {{ session('stockeOver') }}
                    </div>
                </div>
            </div>
            @endif
            <form action="/product-payment/visa" method="POST" class="form_pay" enctype="multipart/form-data">
                @csrf
                @foreach($invs as $shop_key => $shop_id)
                <?php
                    // @foreach($shop as $shop_key => $shop_id)
                    // $shop_id = $k_shop_id;
                ?>
                <input type="hidden" name="shop_id[]" class="shop_id" value="{{ $shop_id->shop_id }}">

                <div class="row p-4 rounded8px mb-3" style="background-color: #fff;">
                    <div class="col-12 px-lg-3 px-md-3 px-0">
                        <h4><strong style="color: #333;">{{ trans('message.product') }}</strong></h4>
                    </div>
                    <div class="col-12 px-lg-3 px-md-3 px-0 mb-2">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-12 d-flex  flex-column justify-content-start">
                            <h5 class="mb-0">{{ $a_shop[$shop_id->shop_id]['shop_name'] }}</h5>
                            </div>
                            <div class="col-6 d-flex justify-content-end">
                                <p class="mb-0" stype="font-size:12px;">
                                    {{ trans('message.invoice_no') }} : {{ $inv_ref }}@if(isset($invs[$shop_key]->inv_no) && $invs[$shop_key]->inv_no !=null)-{{ $invs[$shop_key]->inv_no }}@endif
                                </p>
                            </div>
                            <!-- <div class="col-lg-3 col-md-6 col-12 ml-auto d-flex flex-row justify-content-end">
                                <div class="btn-outline-c45e9f btn form-control mb-2 mr-2"><a
                                        href="/shop-user-details?id={{$shop_id->shop_id}}" style="color : #c45e9f"><img
                                            src="new_ui/img/icon-shop.svg" style="width: 20px;" class="mr-2"
                                            alt="">ไปที่ร้านค้า</a></div>
                                {{-- <div class="btn-outline-c45e9f btn form-control"><img src="new_ui/img/icon-chat.svg"
                                style="width: 20px;" class="mr-2" alt="">แชทเลย</div> --}}
                            </div> -->
                        </div>
                    </div>
                    <div class="col-12 px-lg-3 px-md-3 px-0">
                        <table class="table-bordered">
                            <tbody>
                                {{-- {{ dd($product_id) }} --}}
                                @foreach($payment as $pay)
                                @if( $shop_id->shop_id == $pay['shop_id'] && $shop_id->shipty_id == $pay['shipty_id'] )
                                <input type="hidden" name="type" value="{{ @$pay['type'] }}">
                                <tr>
                                    <td scope="row" class=" text-right" data-label="{{ trans('message.total_product') }}">
                                        <div class="row">
                                            <div class="col-12 text-lg-left text-md-right text-sm-right">
                                                <div class="media layout01">
                                                    {{-- {{ dd($product['product']) }} --}}
                                                    {{-- {{ dd($product_flash) }} --}}

                                                    @if(isset($pay['type']) && $pay['type'] != null && $pay['type'] == 'flashsale')
                                                        @foreach($product['flashsale'] as $key_pro => $product_sale)
                                                            {{-- {{ dd($product_sale) }} --}}
                                                            @if($product_sale->id == $pay['product_id'])
                                                                <img src="/img/product/{{ $product_sale->product_img[0] }}"
                                                                style="width: 60px;" class="mr-3 rounded8px" alt=""
                                                                onerror="this.onerror=null;this.src='/img/no_image.png';">


                                                                {{-- Img Flashsale --}}
                                                                <img src="img/fs.png" class="position-absolute" tyle="top: 2px; width: 50px;" alt="">
                                                                {{-- Img Flashsale --}}

                                                                <div class="media-body">
                                                                    <h6 class="mt-0 flash_sale" type_product="{{ $product_sale['type'] }}">
                                                                        <strong>
                                                                            {{ $product_sale->name }}
                                                                        </strong>
                                                                    </h6>
                                                                </div>
                                                                <input type="hidden" id="hdProducts_{{$pay['product_id']}}" name="hdProducts" value="{{$pay['product_id']}}">
                                                            @endif
                                                        @endforeach
                                                        @if($pay['dis1'] != null && $pay['dis2'] != null)
                                                            {{ $pay['dis1']}} , {{ $pay['dis2'] }}
                                                        @endif
                                                        @if($pay['dis1'] != null)
                                                            {{ $pay['dis1'] }}
                                                        @endif
                                                        @if($pay['dis2'] != null)
                                                            {{ $pay['dis2'] }}
                                                        @endif
                                                    @elseif(isset($pay['type']) && $pay['type'] == 'pre_order')
                                                        @foreach($product['preOrder'] as $key_pro => $product_sale)
                                                            {{-- {{ dd($product_sale) }} --}}
                                                            @if($product_sale->id == $pay['product_id'])
                                                                <img src="/img/product/{{ $product_sale->product_img[0] }}"
                                                                    style="width: 60px;" class="mr-3 rounded8px" alt=""
                                                                    onerror="this.onerror=null;this.src='/img/no_image.png';">


                                                                {{-- Tag Pre-Order --}}
                                                                <div class="position-absolute pl-2 pr-2 py-1"
                                                                    style="clip-path: polygon(100% 0%, 90% 50%, 100% 100%, 0 100%, 0% 50%, 0 0); top: 0; left: 0; background-color: #23c197;">
                                                                    <h6 class="mb-0" style="font-size: 12px;">
                                                                        <strong style="color: #fff;">Pre - Order</strong>
                                                                    </h6>
                                                                </div>
                                                                {{-- Tag Pre-Order --}}

                                                                <div class="media-body">
                                                                    <h6 class="mt-0 flash_sale" type_product="{{ $product_sale['type'] }}">
                                                                        <strong>{{ $product_sale->name }}</strong>
                                                                    </h6>
                                                                </div>
                                                                <input type="hidden" id="hdProducts_{{$pay['product_id']}}" name="hdProducts" value="{{$pay['product_id']}}">
                                                            @endif
                                                        @endforeach
                                                        @if($pay['dis1'] != null && $pay['dis2'] != null)
                                                            {{ $pay['dis1']}} , {{ $pay['dis2'] }}
                                                        @endif
                                                        @if($pay['dis1'] != null)
                                                            {{ $pay['dis1'] }}
                                                        @endif
                                                        @if($pay['dis2'] != null)
                                                            {{ $pay['dis2'] }}
                                                        @endif
                                                    @else
                                                    {{-- @if($pay['type'] != 'flashsale' && $pay['type'] != 'pre_order') --}}
                                                        @foreach($product['product'] as $key_pro => $product_sale)


                                                            @if($product_sale->id == $pay['product_id'])
                                                                <img src="/img/product/{{ $product_sale->product_img[0] }}"
                                                                    style="width: 60px;" class="mr-3 rounded8px" alt=""
                                                                    onerror="this.onerror=null;this.src='/img/no_image.png';">

                                                                <div class="media-body">
                                                                    <h6 class="mb-0"><strong>{{ $product_sale->name }}
                                                                        </strong>
                                                                    </h6>
                                                                </div>
                                                                <input type="hidden" id="hdProducts_{{$pay['product_id']}}" name="hdProducts" value="{{$pay['product_id']}}">
                                                            @endif
                                                        @endforeach
                                                        @if($pay['dis1'] != null && $pay['dis2'] != null)
                                                            {{ $pay['dis1']}} , {{ $pay['dis2'] }}
                                                        @endif
                                                        @if($pay['dis1'] != null)
                                                            {{ $pay['dis1'] }}
                                                        @endif
                                                        @if($pay['dis2'] != null)
                                                            {{ $pay['dis2'] }}
                                                        @endif

                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right" data-label="{{ trans('message.price') }}/{{ trans('message.amount') }}">
                                        <div class="row ">
                                            <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                                                <h4 class="mb-0"><strong style="color: #333;">฿
                                                        {{ $pay['price'] }}</strong>
                                                </h4>
                                            </div>
                                            {{-- <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                                            <h6 class="mb-0" style="color: #919191;">1140 <span
                                                    style="color: #000; text-nowrap">(-37%)</span></h6>
                                        </div> --}}
                                        </div>
                                    </td>
                                    <td data-label="{{ trans('message.amount') }}">
                                        <div class="row">
                                            <div class="col-12 mb-2 text-lg-center text-md-right text-sm-right">
                                                <h6 class="mb-0 text-nowrap"><strong>x {{ $pay['amount'] }} </strong></h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td class=" " data-label="{{ trans('message.total_price') }}">
                                        <div class="row">
                                            <div class="col-12 mb-2 text-lg-center text-md-right text-sm-right">
                                                @php
                                                $total = $pay['amount'] * $pay['price'];
                                                @endphp
                                                <h4 class="mb-0 text-nowrap"><strong style="color: #333;">฿
                                                        {{ $pay['amount'] * $pay['price'] }}</strong></h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                @endif
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    <div class="col-12 px-lg-3 px-md-3 px-0">
                        <div class="row mx-0 p-4 rounded8px mb-3 mt-3" style="background-color: #fafaff;">
                            <!-- <div class="col-lg-6 col-md-6 col-12 px-lg-3 px-md-3 px-0" style="border-right: 1px solid #efefef;">
                                <div class="row">
                                    <div class="col-12 ">
                                        <h4><strong style="color: #346751;">ข้อความถึงผู้ขาย</strong></h4>
                                    </div>
                                    <div class="col-12 mb-4">
                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                            aria-describedby="emailHelp">
                                    </div>
                                </div>
                            </div> -->
                            <div class="col-lg-12 col-md-12 col-12 px-lg-3 px-md-3 px-0 div_shipping">
                                <div class="row">
                                    <div class="col-lg-8 col-md-6 col-12">

                                    <h6 class="form-inline"><strong style="color: #333;">{{ trans('message.shipping') }} <p class="detention"
                                                    attr-id="{{ $shop_id->shop_id }}" style="color: red">*{{ trans('message.shipping_vendor') }}
                                                </p>
                                            </strong>
                                        </h6>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-12 d-flex justify-content-between">
                                    <input type="hidden" name="shipping[{{ $shop_id->shop_id }}][]" attr-id="{{ $shop_id->shop_id }}"
                                            class="shipping_class" value="{{ $shop_id->shipty_id }}">
                                        <input type="hidden" name="inv_no[{{ $shop_id->shop_id }}][]" attr-id="{{ $shop_id->shop_id }}"
                                            class="inv_no" value="{{ $invs[$shop_key]->inv_no }}">
                                        {{--status for type shipping_details --}}
                                        <input type="hidden" name="shipping_id[{{ $shop_id->shop_id }}][]" attr-id="{{ $shop_id->shop_id }}"
                                            class="shipping_id" value="{{ $result[$shop_id->shop_id][$shop_id->shipty_id]['shipde_id'] }}">
                                        <h6 class="mb-0">
                                            <span class="shipping_font" attr-id="{{ $shop_id->shop_id }}">{{ $shipping[$shop_id->shop_id]['ship_name'][$shop_id->shipty_id] }}</span>
                                            <span attr-id="{{ $shop_id->shop_id }}" class="cal_shipping">{{ $result[$shop_id->shop_id][$shop_id->shipty_id]['shipde_price'] }}</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                @endforeach


                {{-- --------------------------------------------------------------------------------------------------------------------------------------------------------- --}}
                <input type="hidden" name="inv_ref" value="{{ @$invs[0]->inv_ref }}">
                <input type="hidden" name="user_name"
                    value="{{ @$o_user_addr->name }} {{ @$o_user_addr->surname }}">
                <input type="hidden" name="tel_address" value="{{ @$o_user_addr->tel }}">
                <input type="hidden" name="address"
                    value="{{ @$o_user_addr->address1 }} {{ @$o_user_addr->add }} {{ @$o_user_addr->district }} {{ @$o_user_addr->county }} {{ @$o_user_addr->city }} {{ @$o_user_addr->zipcode }}">


                <div class="row p-4 rounded8px mb-3 no_address" style="background-color: #fff;">
                    <div class="col-12 mb-2 px-lg-3 px-md-3 px-0">
                        <h4><strong style="color: #333;">{{ trans('message.ship_address') }}<p class="address_detention"
                                    style="color:red">
                                    *{{ trans('message.please_specify') }} {{ trans('message.ship_address') }}</p></strong></h4>
                    </div>
                    <div class="col-lg-10 col-md-10 col-12 px-lg-3 px-md-3 px-0">
                        <div class="row">
                            <input type="hidden" name="id_address" value="{{ @$o_user_addr->id }}">
                            <div class="col-lg-5 col-md-6 col-12">
                                <h6><strong>{{ trans('message.name') }} - {{ trans('message.surname') }} : </strong><span id="shipping_name">
                                        {{ @$o_user_addr->name }} {{ @$o_user_addr->surname }}</span></h6>
                                <h6><strong>เบอร์โทรศัพท์ : </strong> (+66) <span id="shipping_tel">
                                        {{ @$o_user_addr->tel }}</span></h6>
                            </div>
                            <div class="col-lg-6 col-md-6 col-12">
                                <h6 style="line-height: 25px;"><strong>{{ trans('message.my_address') }} : </strong><span id="shipping_address">
                                        {{ @$o_user_addr->address1 }} {{ @$o_user_addr->add }}
                                        {{ @$o_user_addr->district }} {{ @$o_user_addr->county }}
                                        {{ @$o_user_addr->city }}
                                        {{ @$o_user_addr->zipcode }} </span>

                                    @if(@$o_user_addr->status == 1)
                                    <span id="default" style="color: #346751;">
                                        ({{ trans('message.main_address') }})
                                    </span>
                                    @endif
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-12 d-flex justify-content-end px-lg-3 px-md-3 px-0">
                        @if(count($address) > 0)
                        <a href="#" data-toggle="modal" data-target="#change_address">
                            @else
                            <a href="#" data-toggle="modal" data-target="#add_address">
                                @endif
                                <h6 class="mb-0" style="color: #080b65; text-decoration: underline;">{{ trans('message.change') }}</h6>
                            </a>
                    </div>
                </div>


                {{-- --------------------------------------------------------------------------------------------------------------------------------------------------------- --}}


                {{-- Modal Change Addres --}}
                <div class="modal fade" id="change_address">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-md" role="document">
                        <div class="modal-content">
                            <div class="modal-header pt-4">
                                <div class='col-12 position-relative' style='text-align:center'>
                                    <strong>
                                        <h6 class="mb-0"><strong>{{ trans('message.change') }}{{ trans('message.ship_address') }}</strong></h6>
                                    </strong>
                                    <button type="button" class="close position-absolute" style="right: 4px; top: -8px;"
                                        data-dismiss="modal">&times;</button>
                                </div>
                            </div>
                            <div class="modal-body address_add_modal" style="padding-bottom: 0;">
                                @foreach($address as $item)
                                <div class="col-lg-12 col-12 px-2 chkmodal">
                                    <div class="col-lg-12 col-md-12 col-12 px-0 mt-0 o-bg-box">
                                        <div>
                                            <div class="col-lg-12 col-md-12 col-sm-12 pb-0">
                                                <div class="row">
                                                    <div class="col-lg-12 address_pay">
                                                        <div class="form-row">
                                                            <input class="form-check-input change_addtess" type="radio"
                                                                {{-- name="address_{{ $item->id }}" --}} name="address"
                                                                 value="{{ $item->id }}" data-id="{{$item->id}}"
                                                                data-name="{{ $item->name }}
                                                            {{ $item->surname }}" data-tel="{{ $item->tel }}"
                                                                data-status="{{ $item->status }}" data-address="{{ $item->address1 }} {{ $item->item }}
                                                            {{ $item->district }} {{ $item->county }} {{ $item->city }}
                                                            {{ $item->zipcode }}" @if($item->is_last_ship == 'Y' || $item->status == 1)
                                                            checked
                                                            @endif>
                                                            <div
                                                                class=" col-lg-4 col-md-3 col-5 text-md-right text-lg-left order-1 order-md-1 order-lg-1">
                                                                <strong>{{ trans('message.name') }} - {{ trans('message.surname') }} : </strong>
                                                            </div>
                                                            <div
                                                                class="col-lg-5 col-md-6 col-7  pr-lg-0 pr-md-0 order-3 order-md-2 order-lg-2">
                                                                <input readonly type="text"
                                                                    value="{{ $item->name }} {{ $item->surname }}"
                                                                    class="rounded8px" 
                                                                    aria-describedby="emailHelp"
                                                                    placeholder="ชื่อ - นามสกุล"
                                                                    style="background-color: white; border: none;">
                                                            </div>
                                                            <div
                                                                class="col-lg-3 col-md-2 col-5 order-4 order-md-3 order-lg-3">
                                                                @if($item->status > 0)
                                                                <a style="color:#333"><b>({{ trans('message.main_address') }})</b></a>
                                                                @endif
                                                            </div>
                                                        </div>
                                                        <div class="form-row">
                                                            <div
                                                                class=" col-lg-4 col-md-3 col-5 text-md-right text-lg-left">
                                                                <strong>{{ trans('message.tel') }} : </strong>
                                                            </div>
                                                            <div class="col-lg-6 col-md-9 col-6">
                                                                <input readonly type="text" value="{{ $item->tel }}"
                                                                    class="rounded8px py-0" id="exampleInputEmail1"
                                                                    aria-describedby="emailHelp"
                                                                    style="background-color: white; border: none;">
                                                            </div>
                                                        </div>
                                                        <div class="form-row">
                                                            <div class="col-lg-4 col-md-3 col-12 text-md-right text-lg-right"
                                                                style="padding-right: 20px;">
                                                                <strong>{{ trans('message.my_address') }} : </strong>
                                                            </div>
                                                            @php
                                                            $space = " ";
                                                            $textsum
                                                            =$item->address1.$space.$item->item.$space.$item->district.$space.$item->county.$space.$item->city.$space.$item->zipcode;
                                                            @endphp
                                                            <div class="col-lg-8 col-md-9 col-12">
                                                                <textarea readonly class="" rows="2"
                                                                    style="background-color: white; border: none;width:100%;resize: none">{{ $textsum }}</textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                @endforeach
                            </div>
                            <div class="modal-footer border-0 text-center">
                                {{-- <div class="text-center mb-4 w-100" style="color:#1947e3"> <a class="add_address"
                                data-toggle="modal" data-target="#add_address"><b>+{{ trans('message.add_address') }}</b></a> </div> --}}
                                <div class="col-12">
                                    <button type="button" class="btn btn-outline-primary form-control add_address"
                                        data-toggle="modal" data-target="#add_address">{{ trans('message.add_address') }}</button>
                                </div>
                                <div class="col-12">
                                    <div class="form-row">
                                        <div class="col-6"><button type="button" class="form-control btn_cancel_address"
                                                data-dismiss="modal"
                                                style="color:white;background:#b2b2b2">{{ trans('message.cancel') }}</button>
                                        </div>
                                        <div class="col-6 ">
                                            <button class="form-control change_address_btn  btn-save" type="button">{{ trans('message.ok') }}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    </div>







                {{-- Modal Change Addres --}}




                <div class="row p-4 rounded8px mb-3" style="background-color: #fff;">
                    <div class="col-12 mb-2 px-lg-3 px-md-3 px-lg-3 px-md-3 px-0">
                        <h4><strong style="color: #333;">{{ trans('message.payment_method') }}</strong></h4>
                    </div>
                    <div class="col-12 px-lg-3 px-md-3 px-0">
                        <div class="form-group d-lg-none d-md-none d-block">
                            <select class="form-control" id="select-submenu">
                                <option value="4">{{ trans('message.bank_transfer') }}</option>
                                <option value="3">{{ trans('message.qr_payment') }}</option>
                                <option value="2">{{ trans('message.credit_card') }} <!--span class="text-danger"
                                        style="font-size: 12px;">(* คิดค่าธรรมเนียม 3%)</span--></option>
                                <!-- <option value="1">Multi Pay</option> -->
                            </select>
                        </div>
                        <div class="d-lg-block d-md-block d-none">
                            <ul class="nav nav-tabs row" id="myTab" role="tablist">
                                <li class="nav-item col-lg-4  col-md-4 col-6 mb-md-4 px-1" id="select_pay_bank"
                                    role="presentation">
                                    <a class="nav-link active d-flex justify-content-center align-items-center flex-column py-4"
                                        id="list-4-tab" data-toggle="tab" href="#list-4" role="tab"
                                        aria-controls="list-4" aria-selected="false">
                                        <img src="new_ui/img/icons/bank.svg" style="height: 50px;" alt="">
                                        <h6 class="mb-0 text-center mt-2"><strong>{{ trans('message.bank_transfer') }}</strong></h6>
                                        <h6 class="mb-0 text-center" style="color: #23c197;">{{ trans('message.wait_45_min') }}</h6>
                                    </a>
                                </li>
                                <li class="nav-item col-lg-4  col-md-4 col-6 mb-md-4 px-1" id="select_pay_mobile"
                                    role="presentation">
                                    <a class="nav-link d-flex justify-content-center align-items-center flex-column py-4"
                                        id="list-3-tab" data-toggle="tab" href="#list-3" role="tab"
                                        aria-controls="list-3" aria-selected="false">
                                        <img src="new_ui/img/icons/mobile.svg" style="height: 50px;" alt="">
                                        <h6 class="mb-0 text-center mt-2"><strong>{{ trans('message.qr_payment') }}</strong></h6>
                                        <h6 class="mb-0 text-center" style="color: #23c197;">{{ trans('message.wait_45_min') }}</h6>
                                    </a>
                                </li>
                                <li class="nav-item col-lg-4  col-md-4 col-6 mb-md-4 px-1" id="select_pay_credit"
                                    role="presentation">
                                    <a class="nav-link d-flex justify-content-center align-items-center flex-column py-4"
                                        id="list-2-tab" data-toggle="tab" href="#list-2" role="tab"
                                        aria-controls="list-2" aria-selected="false">
                                        <img src="new_ui/img/icons/credit.svg" style="height: 50px;" alt="">
                                        <h6 class="mb-0 text-center mt-2"><strong>{{ trans('message.credit_card') }}</strong></h6>
                                        <h6 class="mb-0 text-center" style="color: #23c197;">{{ trans('message.security_guaranteed') }}</h6>
                                        <!--span class="text-danger position-absolute"
                                            style="font-size: 12px; bottom: 5px; left: 50%; transform: translate(-50%);"><strong>(* คิดค่าธรรมเนียม 3%)</strong></span-->
                                    </a>
                                </li>
                                <!-- <li class="nav-item col-lg-3  col-md-6 col-6 mb-md-4 position-relative"
                                    id="select_pay_wallet" role="presentation">
                                    <a class="nav-link d-flex justify-content-center align-items-center flex-column py-4"
                                        id="list-1-tab" data-toggle="tab" href="#list-1" role="tab"
                                        aria-controls="list-1" aria-selected="false">
                                        <img src="new_ui/img/payment/MultiPay_Logo.png" style="width: 150px;" alt="">
                                        <h6 class="mb-0 text-center mt-2">Multi Pay</h6>
                                        <h6 class="mb-0 text-center" style="color: #23c197;">ฟรีค่าธรรมเนียม</h6>

                                    </a>
                                </li> -->

                            </ul>
                        </div>
                        <div class="tab-content" id="myTabContent">

                            <div class="tab-pane fade " id="list-1" role="tabpanel" aria-labelledby="list-1-tab">
                                <div class="form-group" hidden>
                                    <input type="checkbox" name="bank" value="wallet">
                                </div>
                                @include('pages.payment-page.payment-t10')
                            </div>
                            <div class="tab-pane fade" id="list-2" role="tabpanel" aria-labelledby="list-2-tab">
                                <div class="form-group" hidden>
                                    <input type="checkbox" name="bank" value="credit">
                                </div>
                                @include('pages.payment-page.payment-credit')
                            </div>
                            <div class="tab-pane fade " id="list-3" role="tabpanel" aria-labelledby="list-3-tab">
                                <div class="form-group" hidden>
                                    <input type="checkbox" name="bank" value="mobilebanking">
                                </div>
                                @include('pages.payment-page.payment-bank1')
                            </div>
                            <div class="tab-pane fade show active" id="list-4" role="tabpanel"
                                aria-labelledby="list-4-tab">
                                <div class="form-group" hidden>
                                    <input type="checkbox" name="bank" value="bank" checked>
                                </div>
                                @include('pages.payment-page.payment-bank2')
                            </div>

                        </div>
                    </div>
                </div>

                <div class="row px-4 pt-4 pb-0" style="background-color: #fff; border-radius: 8px 8px 0 0;">
                    <div class="col-lg-6 col-md-6 col-12 mb-2">
                        {{--<h4><strong style="color: #346751;">เหรียญ T10</strong></h4>
                        <input type="text" class="form-control" id="exampleCoin" aria-describedby="emailHelp">--}}
                    </div>
                    <div class="col-lg-6 col-md-6 col-12 mb-2">
                        <h4><strong style="color: #346751;">{{ trans('message.discount_code') }}</strong></h4>
                        <div class="input-group mb-3">
                            <input type="text" id="txtCoupon" name="txtCoupon" class="form-control" placeholder="{{ trans('message.input_discount_code') }}"
                                aria-describedby="spChkCoupon">
                            <div class="input-group-append">
                                <span class="input-group-text btn#346751" style="cursor: pointer;"
                                    id="spChkCoupon">{{ trans('message.check') }}</span>
                            </div>
                        </div>
                        <h6><strong id="stShowCouponError" class="error hide"></strong></h6>
                    </div>
                </div>

                <div class="row p-4" style="background-color: #fff; border-radius: 0 0 8px 8px;">
                    <div class="col-lg-6 col-md-6 col-12 ml-auto px-lg-3 px-md-3 px-0">
                        <div class="row">
                            <div class="col-6">
                                <h6 class="mb-2">{{ trans('message.total_product_price') }}</h6>
                                <h6 class="mb-2">{{ trans('message.product_discount') }}</h6>
                                <h6 class="mb-2">{{ trans('message.ship_price') }}</h6>
                                <!--h6 class="mb-2 d-none complex">ค่าธรรมเนียม</h6-->
                                <h6 class="mb-2">{{ trans('message.ship_discount') }}</h6>
                                <h6 class="mb-2">{{ trans('message.ship_price_after_discount') }}</h6>
                                <h6 class="mb-2">{{ trans('message.grand_total') }}</h6>
                            </div>
                            <div class="col-6 text-right">
                                <h6 class="mb-2 ">{{ $total_price }}</h6>
                                <!--h6 class="mb-2" style="color: #c40000;">-100</h6-->
                                <h6 id="spDiscProduct" class="mb-2" style="color: gray;">0</h6>
                                {{-- <h6 class="mb-2">60</h6> --}}
                                <?php
                                    $shipde_price = 0;
                                    // echo '<pre>';
                                    // print_r($result);
                                    // echo '</pre>'; exit;
                                    foreach ($result as $k_shop_id => $v_shipty) {
                                        foreach ($v_shipty as $k_shipty_id => $v_shipty) {
                                            $shipde_price += $v_shipty['shipde_price'];
                                        }
                                    }
                                    $shipde_price = intval($shipde_price);
                                ?>
                                <h6 id="spShip" class="mb-2 sum_shipping" style="color: gray;"><span>{{ $shipde_price }}</span></h6>
                                <!--h6 class="mb-2 d-none complex" id="showComplex" style="color: gray;">
                                    <span>{{ $total_price*3/100 }}</span>
                                </h6-->
                                @php
                                    $auto_price = $total_price+$shipde_price;
                                @endphp
                                <h6 class="mb-2" style="color: gray;"><span id="spDiscShip">0</span></h6>
                                <h6 class="mb-2 sum_shipping" style="color: gray;"><span id="spTotalShip">{{ $shipde_price }}</span></h6>
                                <h4 class="mb-2 total_price"><strong style="color: #080b65;">฿ <span id="spTotalPrice">{{ $auto_price }}</span></strong></h4>

                                <input type="hidden" id="ori_total_product" value="{{ $total_price }}">
                                <input type="hidden" id="ori_total_ship" value="{{ $shipde_price }}">
                                <input type="hidden" id="ori_total_price" value="{{ $auto_price }}">

                                <input type="hidden" id="total_product" name="total_product" value="{{ $total_price }}">
                                <input type="hidden" id="total_ship" name="total_ship" value="{{ $shipde_price }}">
                                <input type="hidden" id="total_discount" name="total_discount" value="{{ $shipde_price }}">
                                <input type="hidden" id="total_price" name="total_price" value="{{ $auto_price }}">
                            </div>
                        </div>
                    </div>
                    <div class="col-12 px-lg-3 px-md-3 px-0">
                        <hr class="w-100">
                    </div>
                    <div class="col-lg-2 col-md-3 col-12 ml-auto px-lg-3 px-md-3 px-0">
                        <button type="button" class="btn form-control btn_product" style="background-color: #080b65; color: #fff;">
                            {{ trans('message.pay') }}
                        </button>
                    </div>
                </div>

            </form>
    </div>
</div>

</div>


<!-- Modal -->
<div class="modal fade" id="SendVisa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
            <div class="modal-header pb-0" style="border-bottom: unset;">
                <div class="col-12 position-relative">
                    <h5 class="modal-title text-center " id="exampleModalLabel"><strong>{{ trans('message.confirm_payment') }}</strong>
                    </h5>
                    <button type="button" class="close position-absolute" style="right: 5px; top: 0px;"
                        data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="modal-body">
                <div class="row px-2 ">
                    <div class="col-6 d-flex align-items-center">
                        <h6 class="mb-0">{{ trans('message.to_pay') }}</h6>
                    </div>
                    <div class="col-6 text-right">
                        <h5 class="mb-0 total_price">
                            <strong style="color: #080b65;">
                                ฿ <span id="spConfirmTotalPrice">{{ $auto_price }}</span>
                            </strong>
                        </h5>
                    </div>
                    {{-- <div class="col-12">
                        <hr class="w-100">
                    </div> --}}
                    {{-- <div class="col-6 d-flex align-items-center">
                        <h6 class="mb-0">ช่องทางการชำระเงิน</h6>
                    </div>
                    <div class="col-6 text-right">
                        <div class="form-group mb-0">
                            <select class="form-control" id="exampleFormControlSelect1">
                                    <option value="1">T10 วอลเล็ท</option>
                                    <option value="2">บัตรเครดิต/บัตรเดบิต</option>
                                    <option value="3">โมบายแบงค์กิ้ง</option>
                                    <option value="4">โอนเงินธนาคาร</option>
                                </select>
                        </div>
                    </div> --}}
                </div>
            </div>
            <div class="modal-footer pt-0" style="border-top: unset;">
                <div class="form-row w-100">
                    <div class="col-6">
                        <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">{{ trans('message.back') }}</button>
                    </div>
                    <a class="col-6" href="#" id="comfirm_buy">
                        <!-- <button type="button" class="btn btn#346751 form-control btn_submit">ชำระ</button> -->
                        <button type="button" class="btn form-control" style="background-color: #080b65; color: #fff;">{{ trans('message.pay') }}</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="confirmwallet" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
            <div class="modal-header pb-0" style="border-bottom: unset;">
                <div class="col-12 position-relative">
                    <h5 class="modal-title text-center " id="exampleModalLabel"><strong>เปิดการใช้งาน Multipay Wallet
                        </strong>
                    </h5>
                    <button type="button" class="close position-absolute" style="right: 5px; top: 0px;"
                        data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="modal-body">
                <div class="row px-2 ">
                    <div class="col-6 d-flex align-items-center">
                        <h6 class="mb-0">ท่านยังไม่ได้เปิดการใช้งาน Multipay Wallet</h6>
                    </div>
                </div>
            </div>
            <div class="modal-footer pt-0" style="border-top: unset;">
                <div class="form-row w-100">
                    <div class="col-6">
                        <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">กลับ</button>
                    </div>
                    <a class="col-6" href="{{ url('profile_wallet_t10') }}">
                        <!-- <button type="button" class="btn btn#346751 form-control btn_submit">ชำระ</button> -->
                        <button type="button" class="btn btn#346751 form-control">ยืนยัน</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>




{{-- Modal Add Address Button --}}
<div class="modal fade" id="add_address" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header pt-4">
                <div class='col-12 position-relative' style='text-align:center'>
                    <strong>
                        <h6 class="mb-0"><strong>{{ trans('message.add_address') }}</strong></h6>
                    </strong>
                    <button type="button" class="close position-absolute" style="right: 4px; top: -8px;"
                        data-dismiss="modal">&times;</button>
                </div>
            </div>
            {{-- <form action="address/add" method="POST" enctype="multipart/form-data"> --}}
            @csrf
            <input type="hidden" value="{{Auth::user()->id}}" name="user_id">
            <div class="modal-body">
                <div class="form-row">
                    <div class="col-6 mb-3 ">
                        <input required type="text" class="form-control rounded8px" id="name" name='name'
                            placeholder="{{ trans('message.name') }}" style="background-color: #ededed; border: none;">
                    </div>
                    <div class="col-6 mb-3 ">
                        <input required type="text" class="form-control rounded8px" id="surname" name="surname"
                            placeholder="{{ trans('message.surname') }}" style="background-color: #ededed; border: none;">
                    </div>
                    <div class="col-12 mb-3 ">
                        <input required maxlength="10" type="text" class="form-control rounded8px" id="tel" name='tel'
                            placeholder="{{ trans('message.tel') }}" onkeypress="return isNumberKey(event)"
                            style="background-color: #ededed; border: none;">
                    </div>
                    <div class="col-12 mb-3 ">
                        <input required type="text" class="form-control rounded8px" id="address1" name='address1'
                            placeholder="{{ trans('message.address_no_ex') }}"
                            style="background-color: #ededed; border: none;">
                    </div>
                    {{-- <div class="col-12 mb-3 ">
                            <input type="text" class="form-control rounded8px" id="address2" name='address2'
                                placeholder="ที่อยู่เพิ่มเติม" style="background-color: #ededed; border: none;">
                        </div> --}}
                    <div class="col-12 ">
                        <div class='form-row'>
                            <div class="col-6">
                                <div class="form-group">
                                    <input required autocomplete="nope" class="form-control rounded8px input_custom_bg"
                                        style="background-color: #ededed !important;border : 0px; " type="text"
                                        id="district" name='district' placeholder="{{ trans('message.address_tambon_ex') }}">

                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <input required autocomplete="nope" class="form-control rounded8px input_custom_bg"
                                        style="background-color: #ededed !important;border : 0px; " type="text"
                                        id="county" name='county' placeholder="{{ trans('message.address_amphur_ex') }}">
                                </div>
                            </div>
                        </div>
                        <div class='form-row'>
                            <div class="col-6">
                                <div class="form-group">
                                    <input required autocomplete="nope" class="form-control rounded8px input_custom_bg"
                                        style="background-color: #ededed !important;border : 0px; " type="text"
                                        id="city" name='city' placeholder="{{ trans('message.address_province_ex') }}">
                                </div>
                            </div>
                            <div class="col-6 ">
                                <div class="form-group">
                                    <input required autocomplete="nope" maxlength="5"
                                        class="form-control rounded8px input_custom_bg"
                                        style="background-color: #ededed !important;border : 0px; " type="text"
                                        id="zipcode" name='zipcode' placeholder="{{ trans('message.address_zipcode_ex') }}">
                                </div>
                            </div>
                        </div>
                        {{-- <div class="col-6 mb-3 ">
                                <input required autocomplete="nope" class="form-control rounded8px"
                                    style="background-color: #c1bdbd;border : 0px; " type="text" id="zipcode" name='zipcode'
                                    placeholder="รหัสไปรณีย์">
                            </div> --}}
                    </div>
                    @if(count($address) <= 0 && isset($address)) <div class='d-flex flex-row'>
                        <div class="col-1 mb-3">
                            <div class="round">
                                <input type="checkbox" id="checkbox" name='checkbox' checked />
                                <label for="checkbox" id='checkbox' name="checkbox"></label>
                            </div>
                        </div>
                        <div class="col-11 mb-3 ">
                            <strong>{{ trans('message.address_tambon_ex') }}</strong>
                        </div>

                        @else

                        <div class="col-1 mb-3">
                            <div class="round">
                                <input type="checkbox" id="checkbox" name='checkbox' checked />
                                <label for="checkbox" id='checkbox' name="checkbox"></label>
                            </div>
                        </div>
                        <div class="col-11 mb-3 ">
                            <strong>{{ trans('message.set_as') }} {{ trans('message.main_address') }}</strong>
                        </div>
                        @endif
                </div>

            </div>

            <div class="col-12">
                <div class='form-row'>
                    <div class="col-6 mb-3 text-center">
                        <button type="button" class="btn form-control text-white rounded8px btn_cancle_address"
                            data-dismiss="modal" style="background-color: #b2b2b2;">{{ trans('message.cancel') }}</button>
                    </div>
                    <div class="col-6 mb-3 text-center">
                        <button class="btn btn-save form-control text-white rounded8px submit_address" type="submit">{{ trans('message.save') }}</button>
                    </div>
                </div>
            </div>
        </div>
        {{-- </form> --}}
    </div>
</div>
{{-- add Address Button --}}

@endsection

@section('script')
<script type="text/javascript" src="https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/dependencies/JQL.min.js"></script>
<script type="text/javascript" src="https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/dependencies/typeahead.bundle.js"></script>

<link rel="stylesheet" href="/new_ui/plugins/thailand/jquery.Thailand.min.css">
<script type="text/javascript" src="/new_ui/plugins/thailand/jquery.Thailand.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha256.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/enc-base64.min.js"></script>

<script type="text/javascript">
    $('#select-submenu').on('change', function () {
        value = $(this).val();
        $('a.nav-link[href="#list-' + value + '"]').click();
    });

    function vat3percent(type){
        return;
        var total = '{{ $total_price }}';
        var shipping = $('.sum_shipping span').text();
        var aTotal = parseFloat(total) + parseFloat(shipping);
        var target = $('.complex');
        if(type=="credit"){
            // var vTotal = aTotal*103/100;
            // var vat = aTotal*3/100;
           $('.total_price span').text(vTotal);
           // $('#showComplex span').text(vat);
            target.removeClass('d-none');
        }else{
           $('.total_price span').text(aTotal);
            target.addClass('d-none');
        }
    }
    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    $(document).ready(function () {
        $('.change_address_btn').on('click', function () {
            $.ajax({
                url: 'address/change',
                type: 'POST',
                data: {
                    addr_id: $('input[name="address"]:checked').val(),
                    _token: '{{ csrf_token() }}',
                },
                success: function (data) {
                    if( data['status'] == 'true' ) {
                        window.location.reload();
                    } else {
                        alert("ข้อมูลไม่ถูกต้อง");
                    }
                },
                error: function (data) {

                }
            });
        });

        //Submit
        $('.modal#change_address .change_address_btn').on('click', function () {
            $this = $('.modal#change_address input[name="address"]:checked');
            // console.log("$this", $this);
            var id = $this.data('id');
            var name = $this.data('name');
            var tel = $this.data('tel');
            var address = $this.data('address');
            var status = $this.data('status');


            if(name.trim() == '' || tel.trim() == '' || address.trim() == ''){
                Swal.fire({
                        text: "ข้อมูลไม่ครบ กรุณากรอกให้ครบ",
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ปิดหน้าต่าง!'
                    });
                return false;
            }

            if (status == '1') {
                $('#default').show();
            } else {
                $('#default').hide();
            }

            $('#change_address').modal('hide');
            $('#shipping_name').html(name);
            $('#shipping_tel').html(tel);
            $('#shipping_address').html(address);
            $('input[name="name"]').val(name);
            $('input[name="tel"]').val(tel);
            $('input[name="address"]').val(address);
            $('input[name="id_address"]').val(id);
            $('.address_detention').css('display','none');
            // console.log('submit');
        });
        // Cancel
        $('.modal#change_address .btn_cancel_address').on('click', function () {
            // console.log('cancel');
            // $('input[name="id_address"]').val('');
        });
        // กด เพิ่มที่อยู่ ปิด Modal เลือกที่อยู่ที่มีอยู่

        $('.add_address').on('click',function(){
            $('#change_address').modal('hide');
        });

        $('.btn_cancle_address').on('click',function(){
            $('#change_address').modal('show');
        });

        var total_all = 0;
        var shipping_default = 3;

        var weight_jquery = <?php echo json_encode($weight) ?>;
        //console.log(weight_jquery);
        $('.shipping_btn').on('click', function () {
            var text_shipping = $(this).find('h5').text();
            var value_shipping = $(this).val();

            if(shipping_default == value_shipping){
                value_shipping = shipping_default;
                // console.log(value_shipping);
                // console.log('pass');
            }
            else{
                console.log('No pass');
            }
            var id = $(this).parents('.modal').attr('attr-id');
            var ship_detail = '{{ $ship_detail }}';
            // console.log(id);
            // console.log(weight_jquery[id]);
            // console.log(id);
            // return false;


            var total_all_product = '{{ $total_price }}';


            $('input[attr-id="'+id+'"]').val(value_shipping);

            $.ajax({
                url:'/product-payment/getshipping',
                type: 'GET',
                data:{
                    id: id,
                    inv_ref: '{{ $inv_ref }}',
                    weight: weight_jquery[id],
                    type_shipping : value_shipping,
                },
                success:function(data){
                     // console.log(data['shipde_price']);
                    $('.modal').modal('hide');
                    if(data != null){
                        $('.detention[attr-id="'+id+'"]').css('display','none');
                    }
                    $('.modal').modal('hide');

                    $(('.shipping_font[attr-id="'+id+'"]')).html(text_shipping);
                    $('.cal_shipping[attr-id="'+id+'"]').html(data['shipde_price']+"฿ ");
                    $('.shipping_id[attr-id="'+id+'"]').val(data['shipde_id']);



                    sum_shipping = 0;
                    var total_all = 0;
                    $('.cal_shipping').each(function (){
                        price_shipping = 0;
                        if(parseFloat($(this).text()) >= 0){
                            price_shipping = parseFloat($(this).text());
                        }
                        sum_shipping = sum_shipping+(+price_shipping);
                    });
                    $('.sum_shipping').html("฿ <span>" + sum_shipping + "</span>");
                    total_all = parseInt(total_all_product)+parseInt(sum_shipping);
                    // console.log(total_all);
                    $('.total_price').html("฿ <span>" + total_all + "</span>").css('color','#ca63a6').css('font-weight','bold');
                    $('input[name="total_price"]').val(total_all);

                    var typePay = $('input[name="bank"]:checked').val();
                    if(typePay){
                        vat3percent(typePay);
                    }
                }
            });
        });

        $('.detention').css('display', 'none');
        $('.address_detention').css('display','none');

        // onclick for Checking success process \\
        $('.btn_product').on('click', function () {
            $.each($("input[name='bank']:checked"), function(){
                bank = $(this).val();
            });

            if($('#check_mpay').text() != 'appect' && bank == 'wallet'){
                $('#confirmwallet').modal('show');
                return false;
            }

            var status = true;
            var id_shop_array = [];
            var name = $('#shipping_name').text().trim();
            // console.log(name);
            $('.cal_shipping').each(function (index) {
                var text = parseFloat($(this).text());
                var id_ship = $(this).attr('attr-id');

                if (!text && text != 0) {
                    id_shop_array.push(id_ship);
                    $('.detention[attr-id="' + id_ship + '"]').css('display', 'block');
                    // $('.address_detention').css('display', 'block');
                    status = false;
                    // return false;
                }
            });

            if(name == ''){
                $('.address_detention').css('display', 'block');
            }else{
                $('.address_detention').css('display', 'none');
            }
            if (!status) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $('.detention[attr-id="' + id_shop_array[0] + '"]').offset().top - 200
                }, 300);
                return false;
            }

            //When don't have address
            if (!$('#shipping_name').text().trim()) {
                $('.address_detention').css('display', 'block');
                $([document.documentElement, document.body]).animate({
                    scrollTop: $('.no_address').offset().top - 200
                }, 300);
                // $('#change_address').modal('show');
                status = false;
                return false;
            }
            //When don't have address
            if (status) {
                $('#SendVisa').modal('show');
            }
        });

        $('.btn_submit').on('click', function () {
            $('.form_pay').submit();
        });

        var chk_max = $('.chkmodal').length;
        for ($i = 1; $i <= chk_max; $i++) {
            var disname = '#district_shop' + $i;
            var amphoename = '#county_shop' + $i;
            var province = '#province_shop' + $i;
            // var zipcode = '#zipcode_shop' + $i;
            $.Thailand({
                database: '/js/jquery.Thailand.js/database/db.json', // path หรือ url ไปยัง database
                $district: $(disname), // input ของตำบล
                $amphoe: $(amphoename), // input ของอำเภอ
                $province: $(province), // input ของจังหวัด
                // $zipcode: $(zipcode), // input ของรหัสไปรษณีย์
            });
        }
        $.Thailand({
            database: '/js/jquery.Thailand.js/database/db.json', // path หรือ url ไปยัง database

            $district: $('#district'), // input ของตำบล
            $amphoe: $('#county'), // input ของอำเภอ
            $province: $('#city'), // input ของจังหวัด
            // $zipcode: $('#zipcode'), // input ของรหัสไปรษณีย์
        });
        var type_product = $('.media').find('.flash_sale').attr('type_product');
        
        if (type_product != 'flashsale') {
            $('#list-4-tab').on('click', function(){
                $("input[value='bank']").prop("checked", true);
                $("input[value='mobilebanking']").prop("checked", false);
                $("input[value='credit']").prop("checked", false);
                $("input[value='wallet']").prop("checked", false);
                vat3percent('bank');
            });

            $('#list-3-tab').on('click', function(){
                $("input[value='bank']").prop("checked", false);
                $("input[value='mobilebanking']").prop("checked", true);
                $("input[value='credit']").prop("checked", false);
                $("input[value='wallet']").prop("checked", false);
                vat3percent('mobilebanking');
            });

            $('#list-2-tab').on('click', function(){
                $("input[value='bank']").prop("checked", false);
                $("input[value='mobilebanking']").prop("checked", false);
                $("input[value='credit']").prop("checked", true);
                $("input[value='wallet']").prop("checked", false);
                vat3percent('credit');
            });

            $('#list-1-tab').on('click', function(){
               $("input[value='bank']").prop("checked", false);
               $("input[value='credit']").prop("checked", false);
               $("input[value='mobilebanking']").prop("checked", false);
               $("input[value='wallet']").prop("checked", true);
               vat3percent('wallet');
            });
        } else {
             $('#list-1-tab').on('click', function () {
                 $("input[value='bank']").prop("checked", false);
                 $("input[value='credit']").prop("checked", false);
                 $("input[value='mobilebanking']").prop("checked", false);
                 $("input[value='wallet']").prop("checked", true);
                 vat3percent('wallet');
             });
        }
        var inv_ref = '{{ $invs[0]->inv_ref }}';
        var inv_no = [];
        var address = $('input[name="id_address"]').val();
        var shipping_id = [];
        var shop = [];
        var type = $('input[name="type"]').val();

        $("#comfirm_buy").click(function(){
            var address = $('input[name="id_address"]').val();
            $.each($('.shop_id'),function(){
                shop.push($(this).val());
            });
            // console.log(shop);
            // return false;

            $.each($('input[class="inv_no"]'), function (key) {
                var id_inv_no = $(this).attr('attr-id');

                inv_no.push(($(this).val()));
            });
            $.each($('input[class="shipping_id"]'), function (key) {
                var id_shop = $(this).attr('attr-id');

                shipping_id.push(($(this).val()));
            });
            // return false;

            var total = $('input[name="total_price"]').val();
            $.each($("input[name='bank']:checked"), function(){
                bank = $(this).val();
                var s_products = $("input[name=hdProducts").map(function() {
                    return this.value;
                }).get();
                
                if (bank === 'mobilebanking'){
                    $("#comfirm_buy").attr("href", "/checkout/bank/mobilebanking/"+inv_ref+"/?inv_ref="+inv_ref+"&inv_no="+inv_no+"&address="+address+"&total="+total+"&shipping="+shipping_id+"&type="+type+"&products="+s_products+"&coupon_code="+$('#txtCoupon').val()+"&total_discount="+$('#total_discount').val()+"&ori_total_product="+$('#ori_total_product').val()+"&ori_total_ship="+$('#ori_total_ship').val());
                }else if (bank === 'bank'){
                    $("#comfirm_buy").attr("href", "/checkout/bank/?inv_ref="+inv_ref+"&inv_no="+inv_no+"&bank_id="+bank+"&shop="+shop+"&address="+address+"&total="+total+"&shipping="+shipping_id+"&type="+type+"&products="+s_products+"&coupon_code="+$('#txtCoupon').val()+"&total_discount="+$('#total_discount').val()+"&ori_total_product="+$('#ori_total_product').val()+"&ori_total_ship="+$('#ori_total_ship').val());
                }else if (bank === 'wallet'){
                    $("#comfirm_buy").attr("href", "/checkout/bank/wallet/"+inv_ref+"/?inv_ref="+inv_ref+"&address="+address+"&total="+total+"&shipping="+shipping_id+"&type="+type+"&products="+s_products);
                }else if(bank === 'credit'){
                    $("#comfirm_buy").attr("href", "/checkout/bank/2c2pcredit/"+inv_ref+"/?inv_ref="+inv_ref+"&inv_no="+inv_no+"&address="+address+"&total="+total+"&shipping="+shipping_id+"&type="+type+"&products="+s_products+"&coupon_code="+$('#txtCoupon').val()+"&total_discount="+$('#total_discount').val()+"&ori_total_product="+$('#ori_total_product').val()+"&ori_total_ship="+$('#ori_total_ship').val());
                }


            });
        });

        $('.submit_address').on('click', function () {
            var user_id = $('input[name="user_id"]').val();
            var name = $('input#name').val();
            var surname = $('input#surname').val();
            var tel = $('input[name="tel"]').val();
            var address1 = $('input[name="address1"]').val();
            var district = $('input[name="district"]').val();
            var county = $('input[name="county"]').val();
            var city = $('input[name="city"]').val();
            var zipcode = $('input[name="zipcode"]').val();
            var status = $('input[name="checkbox"]').prop('checked');
            var textsum = address1+" "+district+" "+county+" "+city+" "+zipcode;
            status = (status == true) ?  1 : 0;

            $('input').removeClass('border-danger');
            $.ajax({
                url: 'address/add',
                type: 'POST',
                data: {
                    user_id: user_id,
                    name: name,
                    surname: surname,
                    tel: tel,
                    address1: address1,
                    district: district,
                    county: county,
                    city: city,
                    zipcode: zipcode,
                    status: status,
                    _token: '{{ csrf_token() }}',
                },
                success: function (data) {
                    // console.log(data.id);
                    $('.address_add_modal').append('<div class="col-lg-12 col-12 px-2 chkmodal">'+
                        '<div class="col-lg-12 col-md-12 col-12 px-0 mt-0 o-bg-box">'+
                            '<div>'+
                                '<div class="col-lg-12 col-md-12 col-sm-12 pb-0">'+
                                    '<div class="row">'+
                                        '<div class="col-lg-12 address_pay">'+
                                            '<div class="form-row">'+
                                                '<input class="form-check-input change_addtess" type="radio"'+
                                                    'name="address" id="'+data.id+'" value="'+data.id+'" '+
                                                    'data-id="'+data.id+'" '+
                                                    'data-name="'+name+' '+surname+' "'+
                                                    'data-tel="'+tel+'" '+
                                                    'data-status="'+status+'" '+
                                                    'data-address="'+textsum+'" checked>'+
                                                '<div class=" col-lg-3 col-md-3 col-8 text-md-right text-lg-left order-1 order-md-1 order-lg-1">'+
                                                    '<strong>ชื่อ - นามสกุล : </strong>'+
                                                '</div>'+
                                                '<div class="col-lg-6 col-md-6 col-7  pr-lg-0 pr-md-0 order-3 order-md-2 order-lg-2">'+
                                                    '<input readonly type="text" value="'+name+' '+surname+' " '+
                                                        'class="rounded8px" id="exampleInputEmail1" aria-describedby="emailHelp" '+
                                                        'placeholder="ชื่อ - นามสกุล" style="background-color: white; border: none;"> '+
                                                '</div>'+
                                                // '<div class="col-lg-3 col-md-2 col-5 order-4 order-md-3 order-lg-3">'+
                                                //     '<a style="color:#346751"><b>(ที่อยู่หลัก)</b></a>'+
                                                // '</div>'+
                                            '</div>'+
                                            '<div class="form-row">'+
                                                '<div class=" col-lg-3 col-md-3 col-12 text-md-right text-lg-left">'+
                                                    '<strong>เบอร์โทรศัพท์ : </strong>'+
                                                '</div>'+
                                                '<div class="col-lg-9 col-md-9 col-12">'+
                                                    '<input readonly type="text" value="'+tel+'" class="rounded8px py-0" '+
                                                        'id="exampleInputEmail1" aria-describedby="emailHelp" '+
                                                        'style="background-color: white; border: none;">'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="form-row">'+
                                                '<div class="col-lg-3 col-md-3 col-12 text-md-right text-lg-right" '+
                                                    'style="padding-right: 17px;">'+
                                                    '<strong>ที่อยู่ : </strong>'+
                                                '</div>'+
                                                '<div class="col-lg-9 col-md-9 col-12">'+
                                                    '<textarea readonly class="" rows="2" '+
                                                        'style="background-color: white; border: none;width:100%;resize: none">'+textsum+'</textarea>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                    );
                    Swal.fire({
                        text: "{{ trans('message.search') }}",
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "{{ trans('message.close_window') }}!"
                    });

                    $('input[name="id_address"]').val(data.id);
                    $('#shipping_name').text(name+' '+surname);
                    $('#shipping_tel').text(tel);
                    $('#shipping_address').text(textsum);



                    $('.modal').modal('hide');

                },
                error: function (data) {
                    json = JSON.parse(data.responseText);
                    // console.log(json['error']);
                    var loop = 0;
                    $.each(json['error'], function (index, value) {
                        // focus เฉพาะ Input แรก เท่านั้น
                        if (loop == 0) {
                            $('input#' + index).focus();
                            loop++;
                        }
                        $('input#' + index).attr('placeholder', value).addClass('border').addClass('border-danger').val('');

                    });
                }

            });
        });
        $('#spChkCoupon').click(function() {
            $.ajax({
                url: 'coupon/check',
                type: 'POST',
                data: {
                    code: $('#txtCoupon').val(),
                    buy_amt: $('#ori_total_product').val(),
                    _token: '{{ csrf_token() }}',
                },
                success: function (data) {
                    if( data.status == '1' ) {
                        $('#txtCoupon').removeClass('error').addClass('success');
                        $('#stShowCouponError').html('ใช้งานได้').removeClass('error').addClass('success');

                        var i_total_product = parseFloat( $('#ori_total_product').val() );
                        var i_total_ship = parseFloat( $('#ori_total_ship').val() );
                        var i_total_price = parseFloat( $('#ori_total_price').val() );
                        var i_disc_product = 0;
                        var i_disc_ship = 0;
                        var i_total_disc = 0;

                        if( data.disc_to == 'PRODUCT' ) {
                            if( data.disc_type == 'PERCENT' ) {
                                i_disc_product = ( i_total_product * parseFloat( data.disc_percent ) ) / 100;
                                if( i_disc_product > data.disc_amt ) {
                                    i_disc_product = data.disc_amt;
                                }
                                i_total_product = i_total_product - i_disc_product;
                            } else {
                                i_disc_product = parseFloat( data.disc_amt );
                                if( ( i_total_product - i_disc_product ) > 0 ) {
                                    i_total_product = i_total_product - i_disc_product;
                                } else {
                                    i_total_product = 0;
                                }
                            }
                        } else if( data.disc_to == 'SHIP' ) {
                            i_disc_ship = parseFloat( data.disc_amt );
                            if( ( i_total_ship - i_disc_ship ) > 0 ) {
                                i_total_ship = i_total_ship - i_disc_ship;
                            } else {
                                i_total_ship = 0;
                            }
                        }
                        i_total_disc = i_disc_product + i_disc_ship;
                        i_total_price = i_total_product + i_total_ship;

                        // console.log( 'i_disc_product= '+i_disc_product+' i_disc_ship= '+i_disc_ship+' i_total_disc= '+i_total_disc+' i_total_product= '+i_total_product+' i_total_ship= '+i_total_ship+' i_total_price= '+i_total_price);

                        $('#total_product').val( i_total_product );
                        $('#total_ship').val( i_total_ship );
                        $('#total_discount').val( i_total_disc );
                        $('#total_price').val( i_total_price );

                        if( i_disc_product > 0 ) {
                            $('#spDiscProduct').html( i_disc_product ).css('color','red');
                        }
                        if( i_disc_ship > 0 ) {
                            $('#spDiscShip').html( i_disc_ship ).css('color','red');
                        }

                        $('#spTotalShip').html( i_total_ship );
                        $('#spTotalPrice').html( i_total_price );
                        $('#spConfirmTotalPrice').html( i_total_price );
                    } else {
                        $('#txtCoupon').removeClass('success').addClass('error');
                        $('#stShowCouponError').html("{{ trans('message.warn_coupon_fail') }}").removeClass('success').addClass('error');

                        $('#total_product').val( $('#ori_total_product').val() );
                        $('#total_ship').val( $('#ori_total_ship').val() );
                        $('#total_discount').val( 0 );
                        $('#total_price').val( $('#ori_total_product').val() );

                        $('#spDiscProduct').html( 0 ).css('color', 'grey');
                        $('#spDiscShip').html( 0 ).css('color', 'grey');
                        $('#spTotalShip').html( $('#ori_total_ship').val() );
                        $('#spTotalPrice').html( $('#ori_total_price').val() );
                        $('#spConfirmTotalPrice').html( $('#ori_total_price').val() );
                    }
                },
                error: function (data) {
                }
            });
            $('#txtCoupon').keyup(function() {
                $('#txtCoupon').removeClass('success').addClass('error');

                $('#total_product').val( $('#ori_total_product').val() );
                $('#total_ship').val( $('#ori_total_ship').val() );
                $('#total_discount').val( 0 );
                $('#total_price').val( $('#ori_total_product').val() );

                $('#spDiscProduct').html( 0 ).css('color', 'grey');
                $('#spDiscShip').html( 0 ).css('color', 'grey');
                $('#spTotalShip').html( $('#ori_total_ship').val() );
                $('#spTotalPrice').html( $('#ori_total_price').val() );
                $('#spConfirmTotalPrice').html( $('#ori_total_price').val() );
            });

            var type_product = $('.media').find('.flash_sale').attr('type_product');
            if (type_product == 'flashsale') {
                var select = $('#select-submenu').text();
                $('#select_pay_bank').css('filter', 'grayscale(100%)');
                $('#select_pay_mobile').css('filter', 'grayscale(100%)');
                $('#select_pay_credit').css('filter', 'grayscale(100%)');
                $('input[name="bank"]').prop('checked', false);
                {{-- $('#list-4').removeClass('show active'); --}}
                // //$('#list-3').
                // //$('#list-2').
                {{-- $('#list-1').addClass('show active'); --}}

                $('#list-4-tab').prop('disabled', true);
                $('#list-3-tab').prop('disabled', true);
                $('#list-2-tab').prop('disabled', true);
                {{-- $('#list-1-tab').addClass('active');
                $('#list-1-tab ').prop('active'); --}}

                $('#list-1-tab').click();
            }
        });
        // LALAMOVE
        <?php
            if( $request->test == 'test' ) {
        ?>
            const time = new Date().getTime().toString(); // => `1545880607433`
            const path = 'https://rest.sandbox.lalamove.com/v3/quotations';

            const API_KEY = "{{env('LALAMOVE_API_KEY')}}";
            const SECRET = "{{env('LALAMOVE_API_SECRET')}}";
            
            const method = 'POST';
            const body_quote2 = JSON.stringify({
                "data": {
                    "serviceType": "MOTORCYCLE",
                    "language": "th_TH",
                    "stops": [{
                        "coordinates": {
                            "lat": "13.774651",
                            "lng": "100.4695983"
                        },
                        "address": "57 บางพลัด บางพลัด กรุงเทพมหานคร 10700"
                        },{
                        "coordinates": {
                            "lat": "13.7477923",
                            "lng": "100.5621093"
                        },
                        "address": "1768 เพชรบุรี ห้วยขวาง กรุงเทพมหานคร 10310"
                    }],
                    "item": { // Recommended
                      "quantity": "1",
                      "weight": "LESS_THAN_3KG",
                      "categories": ["OFFICE_ITEM"],
                      "handlingInstructions": ["KEEP_UPRIGHT"] 
                    },
                    "isRouteOptimized": true // optional
                }
            });
            const body_quote = JSON.stringify({
                "data": {
                    "serviceType": "MOTORCYCLE",
                    "language": "en_HK",
                    "stops": [{
                        "coordinates": {
                            "lat": "22.33547351186244",
                            "lng": "114.17615807116502"
                        },
                        "address": "Innocentre, 72 Tat Chee Ave, Kowloon Tong"
                        },{
                        "coordinates": {
                            "lat": "22.28129462633954",
                            "lng": "114.15986100706951"
                        },
                        "address": "Statue Square, Des Voeux Rd Central, Central"
                    }],
                    "item": { // Recommended
                      "quantity": "1",
                      "weight": "LESS_THAN_3KG",
                      "categories": ["FOOD_DELIVERY","OFFICE_ITEM"],
                      "handlingInstructions": ["KEEP_UPRIGHT"] 
                    },
                    "isRouteOptimized": false, // optional
                }
            });

            const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body_quote}`;
            const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();

            // const SIGNATURE = '7d80ca70a9312948a4e0dce60e98b29cf08ada060bafe20d6fe5c004e3c81bde'
            const TOKEN = `${API_KEY}:${time}:${SIGNATURE}`
            // const TOKEN = `pk_test_3d7e6260ea64487a55af4cdc8c788248:1651204814204:4c717af89400e1c3721b23e8668eb36987476c86e4fb75e63a69e543aca1ec6d`
            // const AUTH = `Authorization: hmac ${TOKEN},Market:TH,Request-ID:{{$inv_ref}}`

            $.ajax({
                cache: false,
                dataType : "json",
                async: true,
                crossDomain: true,
                type : 'POST',
                url : path,
                // headers: { "Authorization": "hmac "+TOKEN, "MARKET": "TH", "Request-ID": "{{$inv_ref}}" },
                headers: {
                    // "Access-Control-Allow-Origin":"*",
                    "accept": "application/json",
                    "Authorization": "hmac "+TOKEN,
                    "Market": "HK",
                    "Request-ID": "{{$inv_ref}}"
                },
                contentType: 'application/json; charset=utf-8',
                data : body_quote,
                // beforeSend : function( xhr ) {
                //     xhr.setRequestHeader( "Authorization", "hmac " + TOKEN +"");
                //     xhr.setRequestHeader( "Market", "TH_BKK" );
                //     xhr.setRequestHeader( "Request-ID", "{{$inv_ref}}"  );
                // },
                success : function (data) {
                    console.log('LALAMOVE = '+data);
                },
                error : function (data, errorThrown) {
                    console.log('LALAMOVE = '+JSON.stringify(data)+' - '+JSON.stringify(errorThrown));
                }
            });

            // $.post( path, body_quote, function( data ) {
            //     console.log("Response "+ data);
            // });
            return;

            // const body = JSON.stringify({
            //     "coordinates": {
            //         "lat": "13.7477923",
            //         "lng": "100.5621093,15.85"
            //     },
            //     "address": "1768 เพชรบุรี ห้วยขวาง กรุงเทพมหานคร 10310"
            // }); // => the whole body for '/v3/quotations'
            // const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
            
            // const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n`; if the method is GET
            // => '1546222219293\r\nPOST\r\n/v3/quotations\r\n\r\n{\n"data":{...}'


            // const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();
            // console.log("SIGNATURE "+ SIGNATURE);
            // => '7d80ca70a9312948a4e0dce60e98b29cf08ada060bafe20d6fe5c004e3c81bde'
        <?php
            }
        ?>
    });
</script>
@endsection
