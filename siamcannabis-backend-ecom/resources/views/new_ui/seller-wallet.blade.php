
@extends('new_ui.layouts.front-end-seller')
@section('content')
<div class="row">
	<div class="col-xl-9 col-lg-12 col-md-12 col-12 px-4 px-lg-4 px-md-4 px-2 mb-4" >
		<div class="row">
			<div class="col-lg-12 col-md-6 col-12 px-4 pt-4 pb-0">
				<h3><strong>Wallet</strong></h3>
			</div>
		</div>
		<div class="row p-4 mx-0 rounded8px" style="background-color: #f8eaf3;">
			<div class="col-lg-6 col-md-6 col-12">
				<h5><img src="/new_ui/img/seller/icon_menu/icon_menu_3.svg" style="width: 25px;" class="mr-2" alt="">ยอดเงินในวอลเล็ท</h5>
				<h3 style="color: #c75ba1;"><strong>฿ 120,000</strong></h3>
			</div>
			<div class="col-lg-3 col-md-3 col-12 d-flex align-items-center justify-content-end ml-auto">
				<button class="btn btn-primary form-control"  data-toggle="modal" data-target="#Bank-Modal"><img src="/new_ui/img/money.svg" style="width: 20px;" class="mr-2" alt="">ถอนเงิน</button>
			</div>
		</div>
		<div class="row mb-2 mx-0 mt-4" >
			<div class="col-12 px-0" >
			<div class="d-lg-block d-md-block d-none">
				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item" role="presentation">
						<a class="nav-link active" id="list-1-tab" data-toggle="tab" href="#list-1" role="tab" aria-controls="list-1" aria-selected="true">ทั้งหมด (200)</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link" id="list-2-tab" data-toggle="tab" href="#list-2" role="tab" aria-controls="list-2" aria-selected="false">รายรับ (180)</a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link" id="list-3-tab" data-toggle="tab" href="#list-3" role="tab" aria-controls="list-3" aria-selected="false">ถอนเงิน (20)</a>
					</li>
				</ul>
			</div>
			<div class="form-group d-lg-none d-md-none d-block">
				<select class="form-control" id="select-submenu">
					<option value="1">ทั้งหมด (200)</option>
					<option value="2">รายรับ (180)</option>
					<option value="3">ถอนเงิน (20)</option>
				</select>
			</div>
			<div class="tab-content" id="myTabContent">
				<div class="tab-pane fade show active" id="list-1" role="tabpanel" aria-labelledby="list-1-tab">
					@include('new_ui.mylist-seller.my-wallet-all')
				</div>
				<div class="tab-pane fade" id="list-2" role="tabpanel" aria-labelledby="list-2-tab">
					@include('new_ui.mylist-seller.my-wallet-all')
				</div>
				<div class="tab-pane fade" id="list-3" role="tabpanel" aria-labelledby="list-3-tab">
					@include('new_ui.mylist-seller.my-wallet-all')
				</div>
			</div>
		</div>
		</div>
	</div>
	<div class="col-3 mb-4 d-xl-block d-lg-none d-md-none d-none  " style="background-color: #fff; height: 100vh;position: fixed; right: 0;max-width: 21%;">
		<div class="row p-lg-4 p-md-2 p-2" >
			<div class="col-12">
				<h4><strong>ตัวกรอง</strong></h4>
			</div>
			<div class="col-12">
				<div class="form-check mb-3">
				  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
				  <label class="form-check-label" for="exampleRadios1">
				    <strong>วันนี้</strong>
				  </label>
				</div>
				<div class="form-check mb-3">
				  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
				  <label class="form-check-label" for="exampleRadios2">
				    <strong>เดือนนี้</strong>
				  </label>
				</div>
				<div class="form-check mb-3">
				  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3">
				  <label class="form-check-label" for="exampleRadios3">
				    <strong>ปีนี้</strong>
				  </label>
				</div>
				<div class="form-check mb-3">
				  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4">
				  <label class="form-check-label" for="exampleRadios4">
				    <strong>กำหนดเอง</strong>
				  </label>
				</div>
				<div class="col-12 mb-2">
					<input type="date" class="form-control" style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;" placeholder="date-start" aria-label="date-start" aria-describedby="addon-wrapping">
				</div>
				<div class="col-12">
					<input type="date" class="form-control" style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;" placeholder="date-end" aria-label="date-end" aria-describedby="addon-wrapping">
				</div>

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
	.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{
		color: #fff;
		background-color: #c75ba1;
		border-color: #c75ba1;
		border: none;

	}
	.nav-tabs .nav-link:hover{
		border: none;
		color: #fff;
		background-color: #c75ba1;
	}
	.nav-tabs .nav-link{
		border: none;
	}
	.nav-tabs{
		border-bottom: 4px solid #c75ba1;
	}
	.btn-color {
	    background-color: #ededed;
	    color: #495057;
	    border-radius: 8px;
	}

</style>
<!-- Modal -->
	<div class="modal fade" id="Bank-Modal" role="dialog">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header" style='text-align : center'>
					<h4>เพิ่มบัญชีธนาคาร</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body">
					<div class="col-12">
						<select title="เลือกธนาคาร" class="selectpicker btn-color">
							<option>เลือกบัญชีธนาคาร</option>
							<option data-thumbnail="new_ui/img/bank/bank01.png">ธนาคารกสิกรไทย</option>
							<option data-thumbnail="new_ui/img/bank/bank02.png">ธนาคารไทยพาณิชย์</option>
							<option data-thumbnail="new_ui/img/bank/bank03.png">ธนาคารกรุงเทพ</option>
							<option data-thumbnail="new_ui/img/bank/bank04.png">ธนาคารกรุงไทย</option>
						</select>
					</div>
					<div class="col-12 mb-3 mt-4 ">
						<input type="text" class="form-control rounded8px" id="money" aria-describedby="emailHelp" placeholder="จำนวนเงินที่ต้องการถอน" style="background-color: #ededed; border: none;">
					</div>
					<div class="col-12 mb-3 mt-4 ">
						<div class='row'>
							<div class="col-6 mb-3 text-center">
								<button class="btn form-control text-white rounded8px" data-dismiss="modal" style="background-color: #b2b2b2;">ยกเลิก</button>
							</div>
							<div class="col-6 mb-3 text-center">
								<button class="btn btn-c75ba1 form-control text-white rounded8px" data-toggle="modal" data-target="#Send-1" data-dismiss="modal">ส่งข้อความ</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


<!-- Modal -->
<div class="modal fade" id="Send-1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered ">
    <div class="modal-content">
      <div class="modal-header pb-0" style="border-bottom: unset;">
      		<div class="col-12 position-relative">

      			<h5 class="modal-title text-center " id="exampleModalLabel"><strong>กรุณายืนยัน</strong></h5>
        		<button type="button" class="close position-absolute" style="right: 5px; top: 0px;" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
      		</div>
      </div>
      <div class="modal-body">
	      <h6 class="text-center">คุณต้องการถอนเงินจำนวน <span style="color: #c75ba1;">฿ 10,000 </span> ใช่หรือไม่</h6>
      </div>
      <div class="modal-footer pt-0" style="border-top: unset;">
      	<div class="form-row w-100">
      		<div class="col-6">
      			<button type="button" class="btn btn-secondary form-control" data-dismiss="modal">ยกเลิก</button>
      		</div>
      		<div class="col-6">
      			<button type="button" class="btn btn-c75ba1 form-control " data-toggle="modal" data-target="#Send-2" data-dismiss="modal">ยืนยัน</button>
      		</div>
      	</div>
      </div>
    </div>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="Send-2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered ">
    <div class="modal-content">
      <div class="modal-header pb-0" style="border-bottom: unset;">
      		<div class="col-12 position-relative">

      			<h5 class="modal-title text-center " id="exampleModalLabel">
      				<img src="new_ui/img/seller/purchase-history-4.svg" style="width: 20px; height: 20px;" alt=""> <strong style="color: #26c298;">ถอนเงินสำเร็จ</strong></h5>
        		<button type="button" class="close position-absolute" style="right: 5px; top: 0px;" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
      		</div>
      </div>
      <div class="modal-body">
	      <h6 class="text-center">คุณได้ทำการถอนเงินเรียบร้อยแล้ว<br>ขอบคุณค่ะ</h6>
      </div>
      <div class="modal-footer pt-0" style="border-top: unset;">
      	<div class="form-row w-100">
      		<div class="col-12 d-flex justify-content-center">
      			<button type="button" class="btn btn-c75ba1 form-control w-25">ตกลง</button>
      		</div>
      	</div>
      </div>
    </div>
  </div>
</div>
@endsection


