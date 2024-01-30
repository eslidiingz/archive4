@extends('layouts.shop')
@section('content')
	<div class="row">
		<div class="col-12 px-4 pt-4 pb-2">
			<h3><strong>รายการขายของฉัน</strong></h3>
		</div>
		<div class="col-12 px-4" >
			<div class="d-lg-block d-md-block d-none">
				<ul class="nav nav-tabss" id="myTab" role="tablist">
					<li class="nav-item" role="presentation">
						<a class="nav-link nav-links active" id="list-1-tab" data-toggle="tab" href="#list-1" role="tab" aria-controls="list-1" aria-selected="true">ทั้งหมด ({{count($basket_all->whereIn('status',[1,12,13,21,2,3,4,43,5,52,53,6,99]))}})</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link nav-links" id="list-2-tab" data-toggle="tab" href="#list-2" role="tab" aria-controls="list-2" aria-selected="false">ยังไม่ชำระ ({{count($basket_all->whereIn('status',[1,12,13]))}})</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link nav-links" id="list-3-tab" data-toggle="tab" href="#list-3" role="tab" aria-controls="list-3" aria-selected="false">ที่ต้องจัดส่ง ({{count($basket_all->where('status',2))}})</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link nav-links" id="list-4-tab" data-toggle="tab" href="#list-4" role="tab" aria-controls="list-4" aria-selected="false">จัดส่งแล้ว ({{count($basket_all->whereIn('status',[3,4,43]))}})</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link nav-links" id="list-5-tab" data-toggle="tab" href="#list-5" role="tab" aria-controls="list-5" aria-selected="false">ผู้ซื้อได้รับสินค้าแล้ว ({{count($basket_all->whereIn('status',[5,52,53]))}})</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link nav-links" id="list-6-tab" data-toggle="tab" href="#list-6" role="tab" aria-controls="list-6" aria-selected="false">ยกเลิก ({{count($basket_all->whereIn('status',[6,99]))}})</a>
					</li>
				</ul>
			</div> 
			<div class="form-group d-lg-none d-md-none d-block">
				<select class="form-control" id="select-submenu">
					<option value="1">ทั้งหมด ({{count($basket_all->whereIn('status',[1,12,13,21,2,3,4,43,5,52,53,6,99]))}})</option>
					<option value="2">ยังไม่ชำระ ({{count($basket_all->whereIn('status',[1,12,13,21]))}})</option>
					<option value="3">ที่ต้องจัดส่ง ({{count($basket_all->where('status',2))}})</option>
					<option value="4">จัดส่งแล้ว ({{count($basket_all->whereIn('status',[3,4,43]))}})</option>
					<option value="5">ผู้ซื้อได้รับสินค้าแล้ว ({{count($basket_all->whereIn('status',[5,52,53]))}})</option>
					<option value="6">ยกเลิก ({{count($basket_all->whereIn('status',[6,99]))}})</option>
				</select>
			</div>
			@if (count($basket_all) > 0)
			@include('new_ui.mylist-seller.my-list-search')
			@endif
			{{-- <div class="col-12 d-lg-block d-none" style="height: 50px">
                <div class="row pt-3">
                    <div class="col-5">
                        <h6 class="d-inline-block">สินค้าทั้งหมด</h6>
                    </div>
                    <div class="col-2">
                        <h6 class="d-inline-block">ยอดคำสั่งซื้อทั้งหมด</h6>
                    </div>
                    <div class="col-2">
                        <h6 class="d-inline-block">สถานะ</h6>
                    </div>
                    <div class="col-2">
                        <h6 class="d-inline-block">ช่องทางการจัดส่ง</h6>
                    </div>
                    <div class="col-1">
                        <h6 class="d-inline-block">ดำเนินการ</h6>
                    </div>
                </div>
			</div> --}}
			{{-- <table class="table-bordered">
				<thead>
					<tr>
						<th scope="col" class="p-4 text-left">สินค้าทั้งหมด</th>
						<th scope="col" class="width200 text-left">ยอดคำสั่งซื้อทั้งหมด</th>
						<th scope="col" class="width200 text-left">สถานะ</th>
						<th scope="col" class="width200 text-left">ช่องทางการจัดส่ง</th>
						<th scope="col" class="width100 text-left">ดำเนินการ</th>
					</tr>
				</thead>
			</table> --}}
			<div class="tab-content" id="myTabContent">
				<div class="tab-pane fade show active" id="list-1" role="tabpanel" aria-labelledby="list-1-tab">
					{{-- <?php require_once('mylist-seller/my-list-all.php') ?> --}}
                    @if (count($basket_all->whereIn('status',[1,12,13,21,2,3,4,43,5,52,53,6,99]))== 0)
                        @include('component.no-data')
                    @else
                        {{-- @foreach ($basket_all->whereIn('status',[1,12,13,21,2,3,4,43,5,52,53,6,99]) as $key=>$item) --}}
                            @include('component.sales-list-cart')
                        {{-- @endforeach --}}
                    @endif
				</div>
				<div class="tab-pane fade" id="list-2" role="tabpanel" aria-labelledby="list-2-tab">
					{{-- <?php require_once('mylist-seller/my-list-not.php') ?> --}}
					@if (count($basket_all->whereIn('status',[1,12,13,21]))== 0 )
					{{-- @include('new_ui.mylist-seller.my-list-search') --}}
						@include('component.no-data')
                    @else
						@include('component.seles-list-not')
					@endif
				</div>
				<div class="tab-pane fade" id="list-3" role="tabpanel" aria-labelledby="list-3-tab">
					{{-- <?php require_once('mylist-seller/my-list-send.php') ?> --}}
					@if (count($basket_all->where('status',2))== 0 )
					{{-- @include('new_ui.mylist-seller.my-list-search') --}}
						@include('component.no-data')
                    @else
						@include('component.seles-list-send')
					@endif
				</div>
				<div class="tab-pane fade" id="list-4" role="tabpanel" aria-labelledby="list-4-tab">
					{{-- <?php require_once('mylist-seller/my-list-send-success.php') ?> --}}
					@if (count($basket_all->whereIn('status',[3,4,43]))== 0 )
					{{-- @include('new_ui.mylist-seller.my-list-search') --}}
						@include('component.no-data')
                    @else
						@include('component.seles-list-send-success')
					@endif
				</div>
				<div class="tab-pane fade" id="list-5" role="tabpanel" aria-labelledby="list-5-tab">
					{{-- <?php require_once('mylist-seller/my-list-success.php') ?> --}}
					@if (count($basket_all->whereIn('status',[5,52,53]))== 0 )
					{{-- @include('new_ui.mylist-seller.my-list-search') --}}
						@include('component.no-data')
                    @else
						@include('component.seles-list-success')
					@endif
				</div>
				<div class="tab-pane fade" id="list-6" role="tabpanel" aria-labelledby="list-6-tab">
					{{-- <?php require_once('mylist-seller/my-list-cancel.php') ?> --}}
					@if (count($basket_all->whereIn('status',[6,99]))== 0 )
					{{-- @include('new_ui.mylist-seller.my-list-search') --}}
						@include('component.no-data')
                    @else
						@include('component.seles-list-cancel')
					@endif
				</div>
			</div>
		</div>
	</div>
@endsection

@section('script')

<script>
	$('#select-submenu').on('change',function(){
		value = $(this).val();
		$('a.nav-link[href="#list-'+value+'"]').click();
	});
</script>
@endsection



@section('style')
<style>
	.swiper-container {
		width: 100%;
		height: 300px;
		margin-left: auto;
		margin-right: auto;
	}
	.swiper-container-5 {
		width: 100%;
		height: 300px;
		margin-left: auto;
		margin-right: auto;
	}

	.swiper-slide {
		background-size: cover;
		background-position: center;
	}

	.gallery-top {
		height: 80%;
		width: 100%;
	}

	.gallery-thumbs {
		height: 20%;
		box-sizing: border-box;
		padding: 10px 0;
	}

	.gallery-thumbs .swiper-slide {
		height: 100%;
		opacity: 0.4;
	}

	.gallery-thumbs .swiper-slide-thumb-active {
		opacity: 1;
	}
	.table-bordered{
		border: unset !important;
	}
</style>
@endsection
