
<div class="col-12 px-0"id="flash-sale">
	<table class="table-bordered">
		<thead>
			<tr>
				<th scope="col" class="p-4 text-left">สินค้าทั้งหมด</th>
				<th scope="col" class="width200 text-left">หมายเลขคำสั่งซื้อ</th>
				<th scope="col" class="width200 text-left">สถานะ</th>
				<th scope="col" class="width200 text-left ">shopteenii mp</th>
				<th scope="col" class="width200 text-left">ช่องทางการจัดส่ง</th>
				<th scope="col" class="width100 text-left">ดำเนินการ</th>
			</tr>
		</thead>
		<tbody>	
			@foreach ($basket_all->whereIn('status',[1,12,13]) as $key=>$item)
			{{-- @foreach ($item->inv_products as $key1=>$item1)			 --}}
			<tr>
				<td scope="row" data-label="สินค้าทั้งหมด">
					<div class="row">
						@foreach ($item->inv_products as $key1=>$item1)
							@if (isset($item1['type']))
								@if ($item1['type'] == 'flashsale')
									@foreach ($product_flash as $item2)
										@if ( $item2->id == $item1['product_id'])
											<div class="col-12 mb-4 text-lg-left text-md-right text-sm-right">
												<div class="media">
													<?php $front_image = $item2->product_img[0]?>
													@if ($front_image=='0'||$front_image==null)
													<img class="mr-3 rounded8px" style="width: 60px; height: 60px; object-fit: cover;" src="/img/no_image.png" alt="">
													@else
													<img style="width: 60px; height: 60px; object-fit: cover;" src="/img/product/{{$front_image}}" alt="">
													@endif
													<div class="media-body pl-2">
														<h6 class="mt-0"><strong>{{$item2->name}}</strong></h6>
														@if(!isset($item1['dis2']) && !isset($item1['dis1']))

														@elseif(isset($item1['dis2']) && !isset($item1['dis1']))
														{{$item1['dis2']}}
														@elseif(!isset($item1['dis2']) && isset($item1['dis1']))
														{{$item1['dis1']}}
														@else
														{{$item1['dis2']}} , {{$item1['dis1']}}
														@endif
													</div>
												</div>
											</div>
										@endif
									@endforeach
								@elseif ($item1['type'] == 'pre_order')
									@foreach ($product_pre as $item2)
										@if ( $item2->id == $item1['product_id'])
											<div class="col-12 mb-4 text-lg-left text-md-right text-sm-right">
												<div class="media">
													<?php $front_image = $item2->product_img[0]?>
													@if ($front_image=='0'||$front_image==null)
													<img class="mr-3 rounded8px" style="width: 60px; height: 60px; object-fit: cover;" src="/img/no_image.png" alt="">
													@else
													<img style="width: 60px; height: 60px; object-fit: cover;" src="/img/product/{{$front_image}}" alt="">
													@endif
													<div class="media-body pl-2">
														<h6 class="mt-0"><strong>{{$item2->name}}</strong></h6>
														@if(!isset($item1['dis2']) && !isset($item1['dis1']))

														@elseif(isset($item1['dis2']) && !isset($item1['dis1']))
														{{$item1['dis2']}}
														@elseif(!isset($item1['dis2']) && isset($item1['dis1']))
														{{$item1['dis1']}}
														@else
														{{$item1['dis2']}} , {{$item1['dis1']}}
														@endif
													</div>
												</div>
											</div>
										@endif
									@endforeach
								@endif
							@else
								@foreach ($product_all as $item2)
									@if ( $item2->id == $item1['product_id'])
										<div class="col-12 mb-4 text-lg-left text-md-right text-sm-right">
											<div class="media">
												<?php $front_image = $item2->product_img[0]?>
												@if ($front_image=='0'||$front_image==null)
												<img class="mr-3 rounded8px" style="width: 60px; height: 60px; object-fit: cover;" src="/img/no_image.png" alt="">
												@else
												<img style="width: 60px; height: 60px; object-fit: cover;" src="/img/product/{{$front_image}}" alt="">
												@endif
												<div class="media-body pl-2">
													<h6 class="mt-0"><strong>{{$item2->name}}</strong></h6>
													@if(!isset($item1['dis2']) && !isset($item1['dis1']))

													@elseif(isset($item1['dis2']) && !isset($item1['dis1']))
													{{$item1['dis2']}}
													@elseif(!isset($item1['dis2']) && isset($item1['dis1']))
													{{$item1['dis1']}}
													@else
													{{$item1['dis2']}} , {{$item1['dis1']}}
													@endif
												</div>
											</div>
										</div>
									@endif
								@endforeach
							@endif
						@endforeach
					</div>
				</td>
						<td data-label="หมายเลขคำสั่งซื้อ">
							<div class="row">
								<div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
									<h6 class="mb-0 font_size_14px"><strong>{{$item->inv_ref}}</strong></h6>
								</div>
								<div class="col-12 text-lg-left text-md-right text-sm-right">
									{{-- <h6 class="mb-0" style="color: #919191;">โอนผ่าน</h6> --}}
								</div>
							</div>
						</td>
						<td data-label="สถานะ" class="text-lg-left text-md-right text-sm-right">
							<div class="row">
								<div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
									<h6 class="mb-0 font_size_14px">
										<?php
											$status_name = '';
											if ($item->status == 1) {
												if($item->note != 'test'){
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#E00A0A; font-size:14px;'>ชำระไม่สำเร็จ</a>";
												}else{
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#E00A0A; font-size:14px;'>ยังไม่ชำระ</a>";
												}
											}
											elseif ($item->status == 12) {
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#e26e20; font-size:14px;'>รอตรวจสอบ</a>";
											}
											elseif ($item->status == 13) {
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#e26e20; font-size:14px;'>รอตรวจสอบ</a>";
											}
											elseif ($item->status == 21) {
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#E00A0A; font-size:14px;'>ยังไม่ชำระ</a>";
											}
											elseif ($item->status == 2) {
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#e26e20; font-size:14px;'>ที่ต้องจัดส่ง</a>";
											}
											elseif ($item->status == 3 || $item->status == 4 ) {
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#23C197; font-size:14px;'>จัดส่งแล้ว</a>";
											}
											elseif ($item->status == 43) {
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#23C197; font-size:14px;'>รอรับสินค้าหน้างาน</a>";
											}
											elseif ($item->status == 5) {
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#23C197; font-size:14px;'>สำเร็จ</a>";
											}
											elseif ($item->status == 52) {
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#23C197; font-size:14px;'>สำเร็จ</a>";
											}
											elseif ($item->status == 53) {
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#23C197; font-size:14px;'>สำเร็จ</a>";
											}
											elseif ($item->status == 99) {
												$status_name = "<a href='#' class='badge w-100 text-lg-left text-md-right text-right px-0' style='color:#E00A0A; font-size:14px;'>ยกเลิก</a>";
											}
										?>
									<strong><?php echo $status_name; ?></strong></h6>
								</div>
							</div>
						</td>
						<td data-label="คนช่วยขาย">
							<div class="row">
								<div class="col-12 mb-2 text-lg-center text-md-right text-sm-right">
									@if ($item->uidmp != null || $item->uidmp != '')
										<i class="fa fa-check"></i>
									@endif
								</div>
							</div>
						</td>
						<td data-label="ช่องทางการจัดส่ง">
							<div class="row">
								<div class="col-12 mb-2 text-lg-left text-md-right text-sm-right">
								<h6 class="mb-0 font_size_14px"><strong>{{ $item->shipty_name }}</strong></h6>
								</div>
							</div>
						</td>
						<td data-label="ดำเนินการ">
							<div class="row">
								<div class="col-12 mb-2 text-lg-left text-md-right text-sm-right dropup">
									<button type="button" class="btn btn-outline-dark dropdown-toggle px-1 py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<i class="fa fa-bars" aria-hidden="true"></i>
									</button>
									<div class="dropdown-menu dropdown-menu-right">
										<a href="/shop/sales-list/detail/{{$item->inv_ref}}-{{$item->inv_no}}" class="dropdown-item" type="button">ดูรายละเอียด</a>
										{{-- @if ($item->status == 2)
										<button type="button" class="dropdown-item" data-target="#cancelmodal1" data-toggle="modal">ยกเลิกสินค้า</button>
										@endif --}}
									</div>
								</div>
							</div>
						</td>	
			</tr>
			{{-- @endforeach	 --}}
			@endforeach	
		</tbody>
	</table>
</div>