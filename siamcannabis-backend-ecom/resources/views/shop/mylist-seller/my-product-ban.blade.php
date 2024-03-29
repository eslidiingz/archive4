<style>
    .custom-control-input:checked~.custom-control-label::before {
        color: #fff;
        border-color: #333;
        background-color: #333;
    }
</style>
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
                <th scope="col" class="width100 text-left">หมายเหตุการแบนสินค้า</th>
            </tr>
        </thead>
        <tbody>
            @foreach($products->whereIn('status_goods',[99]) as $key=>$product)

            <tr>
                <td scope="row" data-label="ชื่อสินค้า">
                    <div class="row">
                        <div class="col-12 mb-4 text-left">
                            <div class="media">
                                <a href="/product/{{$product->id}}">
                                    <img src="{{'/img/product/'.$product->product_img[0] }}"
                                        style="width: 60px; height: 60px; object-fit: cover;" class="mr-3 rounded8px"
                                        alt="...">
                                </a>
                                <div class="media-body">
                                    <h6 class="mt-0"><strong>{{$product->name}}</strong></h6>
                                </div>
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
                        @foreach($product->product_option['stock'] as $pro_price)
                        <div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
                            @if($pro_price == 0)
                            <h6 class="mb-0 font_size_14px" style="color:red"><strong> {{$pro_price}}</strong></h6>
                            @else
                            <h6 class="mb-0 font_size_14px"><strong> {{$pro_price}}</strong></h6>
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
                <td data-label="แสดงสินค้า" class="text-lg-left text-md-right text-sm-right">
                    <h6 class="mb-0 font_size_14px" style="color:red"><strong> {{$product->note}}</strong></h6>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
<script>
    $(document).ready(function() {

        $.ajax({
            type: 'get',
            data: {
                "shop_id": "{{$products[0]->shop_id}}"
            },
            url: "{{route('get-status-goods')}}",
            success: function(value) {
                value.forEach(res_product => {
                    if (res_product.status_goods == 1) {
                        $("#switch_not" + res_product.id).prop("checked", true);
                    }
                });
            }
        });
    });


    function send_status_goods3(id) {
        var checkBox = document.getElementById("switch_not" + id);

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
                        text: 'เปิดใช้งานสินค้าสำเร็จ'
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
</script>
@else
<div class="col-12 px-0 text-center py-4" style='background:white'>
    <img class='pb-2 w-custom-nodata h-200px' src="/img/no_image.png" style="width: auto !important;" alt="">
    <p style='color:#919191'>ไม่พบสินค้า กรุณาเพิ่มสินค้าใหม่</p>
    <a href="{{ url('shop/myproduct/new') }}"><button class='btn-primary btn'
            style='background:#333;border-color: #333;'>เพิ่มสินค้าใหม่</button></a>
</div>

@endif
