@if(count($products) > 0)
<div class="col-12 px-0">
    <table class="table-bordered">
        <thead>
            <tr>
                <th scope="col" class="text-left p-4">ชื่อสินค้า</th>
                <th scope="col" class="width200 text-left">เลข SKU</th>
                <th scope="col" class="width200 text-left">ตัวเลือกสินค้า</th>
                <th scope="col" class="width200 text-left">ราคา</th>
                <th scope="col" class="width200 text-left">ราคาส่วนลด</th>
                <th scope="col" class="width200 text-left">คลัง</th>
                <th scope="col" class="width200 text-left">ยอดขาย</th>
                <th scope="col" class="width200 text-left">ประเภทสินค้า</th>
                <th scope="col" class="width100 text-left">รับสินค้า</th>
                <th scope="col" class="width100 text-left">แสดงสินค้า</th>
                <th scope="col" class="width100 text-left">ดำเนินการ</th>
            </tr>
            @php
            $array_id = [];
            @endphp
        </thead>
        <tbody>
            @foreach($products_all as $key=>$product)
            <tr>
                <td scope="row" data-label="ชื่อสินค้า">
                    <div class="row">
                        <div class="col-12 mb-4 text-left">
                            <div class="media">
                                @if($product->type == 'flashsale')
                                <a href="/flash-sale/{{$product->id}}">
                                    <img src="{{'/img/product/'.$product->product_img[0] }}"
                                        style="width: 60px; height: 60px; object-fit: cover;" class="mr-3 rounded8px"
                                        alt="...">
                                </a>
                                <div class="media-body">
                                    <h6 class="mt-0"><strong>{{$product->name}}</strong></h6>
                                </div>
                                @elseif($product->type == 'regular')
                                <a href="/product/{{$product->id}}">
                                    <img src="{{'/img/product/'.$product->product_img[0] }}"
                                        style="width: 60px; height: 60px; object-fit: cover;" class="mr-3 rounded8px"
                                        alt="...">
                                </a>
                                <div class="media-body">
                                    <h6 class="mt-0"><strong>{{$product->name}}</strong></h6>
                                </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </td>
                <td data-label="เลข SKU">
                    <div class="row">
                        @foreach($product->product_option['sku'] as $sku)
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                            <h6 class="mb-0 font_size_14px"><strong>{{$sku}}</strong></h6>
                        </div>
                        @endforeach
                    </div>
                </td>
                <td data-label="ตัวเลือกสินค้า" class="text-lg-left text-md-right text-sm-right">
                    <div class="row">
                        @foreach($product->product_option['dis1'] as $pro_dis1)
                        @foreach($product->product_option['dis2'] as $pro_dis2)
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                            <!-- ----------------------------------------------------------------------------------------------------------->
                            @if($pro_dis1 != null && $pro_dis2 != null)
                            <h6 class="mb-0 font_size_14px"><strong>{{$pro_dis1}}
                                    @if($pro_dis1 != null && $pro_dis2 != null)
                                    ,
                                    @endif
                                    {{ $pro_dis2 }}</strong></h6>
                            @endif
                            <!-- ----------------------------------------------------------------------------------------------------------->
                            @if($pro_dis1 != null && $pro_dis2 == null)
                            <h6 class="mb-0 font_size_14px"><strong>{{$pro_dis1}}
                                    @endif
                                    <!-- ----------------------------------------------------------------------------------------------------------->
                                    @if($pro_dis1 == null && $pro_dis2 != null)
                                    <h6 class="mb-0 font_size_14px"><strong>{{$pro_dis2}}
                                            @endif
                                            <!-- ----------------------------------------------------------------------------------------------------------->
                                            @if($pro_dis1 == null && $pro_dis2 == null)
                                            <h6 class="mb-0 font_size_14px" style="color:grey"><strong>ไม่มี</strong>
                                            </h6>
                                            @endif
                                            <!-- ----------------------------------------------------------------------------------------------------------->

                        </div>
                        @endforeach
                        @endforeach
                    </div>
                </td>
                <td data-label="ราคา" class="text-lg-left text-md-right text-sm-right">
                    <div class="row">
                        @foreach($product->product_option['price'] as $pro)
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                            @if($pro == 0)
                            <h6 class="mb-0 font_size_14px" style="color:red"><strong>฿ {{$pro}}</strong></h6>
                            @else
                            <h6 class="mb-0 font_size_14px"><strong>฿ {{$pro}}</strong></h6>
                            @endif
                        </div>
                        @endforeach

                    </div>
                </td>
                <td data-label="ราคาส่วนลด" class="text-lg-left text-md-right text-sm-right">
                    <div class="row">
                        @if (isset($product->product_option['margin']))
                        @foreach($product->product_option['margin'] as $margin)
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                            @if($margin == 0)
                            <h6 class="mb-0 font_size_14px" style="color:red"><strong>฿ {{$margin}}</strong></h6>
                            @else
                            <h6 class="mb-0 font_size_14px"><strong>฿ {{$margin}}</strong></h6>
                            @endif
                        </div>
                        @endforeach
                        @endif
                    </div>
                </td>
                <td data-label="คลัง" class="text-lg-left text-md-right text-sm-right">
                    <div class="row">
                        @foreach($product->product_option['stock'] as $stock)
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                            @if($stock == 0)
                            <h6 class="mb-0 font_size_14px" style="color:red"><strong>{{$stock}}</strong></h6>
                            @else
                            <h6 class="mb-0 font_size_14px"><strong>{{$stock}}</strong></h6>
                            @endif
                        </div>
                        @endforeach

                    </div>
                </td>
                <td data-label="ยอดขาย" class="text-lg-left text-md-right text-sm-right">
                    <div class="row">
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                            <h6 class="mb-0 font_size_14px"><strong>-</strong></h6>
                        </div>
                </td>
                <td data-label="ประเภทสินค้า" class="text-lg-left text-md-right text-sm-right">
                    <div class="row">
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                            @if($product->type == 'flashsale')
                            <h6 class="mb-0 font_size_14px"><strong>Flash Sale</strong></h6>
                            @elseif($product->type == 'regular')
                            <h6 class="mb-0 font_size_14px"><strong>สินค้าปกติ</strong></h6>
                            @endif
                        </div>
                    </div>
                </td>
                <td data-label="รับสินค้า" class="text-lg-left text-md-right text-sm-right">
                    <div class="row">
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                            @if($product->type == 'flashsale')
                            <div
                                class="col-lg-1 col-md-1 col-2 custom-control custom-control custom-switch d-flex justify-content-end">
                                <input type="checkbox" class="custom-control-input"
                                    id="switch_receive{{$product->product_old_id}}"
                                    onclick="send_receive_goods({{$product->product_old_id}})"
                                    style="background-color:#c75ba1;">
                                <label class="custom-control-label"
                                    for="switch_receive{{$product->product_old_id}}"></label>
                            </div>
                            @elseif($product->type == 'regular')
                            @endif
                        </div>
                </td>
                <td data-label="สถานะสินค้า" class="text-lg-left text-md-right text-sm-right">
                    @if($product->status_goods != '99')
                    <div class="row">
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                            @if($product->type == 'flashsale')
                            @elseif($product->type == 'regular')
                            @php
                            $chk_stock = 0;
                            $chk_price = false;
                            foreach($product->product_option['stock'] as $key => $value){
                            $chk_stock += $value;
                            }
                            foreach($product->product_option['price'] as $key => $value){
                            if($value <= 0){ $chk_price=true;}} @endphp @if($chk_stock> 0 && $chk_price == false)
                                <div
                                    class="col-lg-1 col-md-1 col-2 custom-control custom-control custom-switch d-flex justify-content-end">
                                    <input type="checkbox" class="custom-control-input" id="switch{{$product->id}}"
                                        onclick="send_status_goods({{$product->id}})" style="background-color:#333;">
                                    <label class="custom-control-label" for="switch{{$product->id}}"></label>
                                </div>
                                @endif
                                @endif
                        </div>
                        @endif
                </td>
                <td data-label="ดำเนินการ">
                    @if($product->status_goods != '99')
                    <div class="row">
                        @if($product->type == 'flashsale')
                        @elseif($product->type == 'regular')
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right dropup">
                            <button type="button" class="btn btn-outline-dark dropdown-toggle   px-1 py-0"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-bars" aria-hidden="true"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a href="/shop/myproduct/{{$product->id}}" class="dropdown-item"
                                    type="button">แก้ไขสินค้า</a>
                                <a onclick="if(confirm('คุณต้องการลบสินค้า ?')){$(this).next().submit()}"
                                    class="dropdown-item" href="#">ลบสินค้า</a>
                                <form method="POST" action="{{route('delete.myproduct' , ['id'=> $product->id ])}}">
                                    @csrf
                                    @method('DELETE')
                                </form>
                            </div>
                        </div>
                        @endif
                    </div>
                    @endif
                </td>
            </tr>
            @endforeach
            @php

            array_push($array_id,$product->id);
            @endphp
        </tbody>

    </table>
</div>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<script>
    $(document).ready(function() {
        $('td#approve_name').each(function(index, value) {
            var text = $(this).text().trim();
            console.log(text);
            if (text == 'รอตรวจสอบ') {
                $(this).css('color', '#e26e20');
                console.log(text);
            } else if (text == 'ตรวจสอบแล้ว') {
                $(this).css('color', '#33FF5B');
                console.log(text);
            } else if (text == 'รอตัดสินใจ') {
                $(this).css('color', '#ffc107');
                console.log(text);
            } else if (text == 'Ban') {
                $(this).css('color', 'red');
                console.log(text);
            }

        });

        $.ajax({
            type: 'get',
            data: {
                "shop_id": "{{$products[0]->shop_id}}"
            },
            url: "{{route('get-status-goods')}}",
            success: function(value) {
                value.forEach(res_product => {
                    if (res_product.status_goods == 1) {
                        $("#switch" + res_product.id).prop("checked", true);
                    }
                    if (res_product.receive_product == 'receive') {
                        $("#switch_receive" + res_product.id).prop("checked", true);
                    }
                });


            }
        });

    });



    function send_status_goods(id) {
        var checkBox = document.getElementById("switch" + id);

        if (checkBox.checked == true) {
            $.ajax({
                type: 'POST',
                data: {
                    "_token": "{{ csrf_token() }}",
                    "product_id": id,
                    "status_goods": 1
                },
                url: "{{route('status-goods')}}",
                success: function(json) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'บันทึกข้อมูลสำเร็จ'
                    })
                    location.reload();
                }

            });
        } else {

            $.ajax({
                type: 'POST',
                data: {
                    "_token": "{{ csrf_token() }}",
                    "product_id": id,
                    "status_goods": 2
                },
                url: "{{route('status-goods')}}",
                success: function(json) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'ปิดใช้งานสินค้าสำเร็จ'
                    })
                    location.reload();
                }

            });
        }
    }

    function send_receive_goods(id) {
        var checkBox = document.getElementById("switch_receive" + id);

        if (checkBox.checked == true) {
            $.ajax({
                type: 'POST',
                data: {
                    "_token": "{{ csrf_token() }}",
                    "product_id": id,
                    "receive_product": 'receive'
                },
                url: "{{route('receive-goods')}}",
                success: function(json) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'บันทึกข้อมูลสำเร็จ'
                    })
                    location.reload();
                }
            });
        } else {

            $.ajax({
                type: 'POST',
                data: {
                    "_token": "{{ csrf_token() }}",
                    "product_id": id,
                    "receive_product": 'unreceived'
                },
                url: "{{route('receive-goods')}}",
                success: function(json) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'ปิดการรับสินค้าสำเร็จ'
                    })
                    location.reload();
                }

            });
        }
    }
</script>
@else
<div class="col-12 px-0 text-center py-4" style='background:white'>
    <img class='pb-2 w-custom-nodata h-200px' src="/img/no_image.png" style="width: auto !important;" alt="">
    <p style='color:#919191'>ไม่พบสินค้า กรุณาเพิ่มสินค้าใหม่</p>
    <a href="{{ url('shop/myproduct/new') }}"><button class='btn-primary btn'
            style='background:#333;border-color: #333;'>เพิ่มสินค้าใหม่</button></a>
</div>

@endif
