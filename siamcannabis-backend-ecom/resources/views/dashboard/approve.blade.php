@extends('layouts.dashboard')
@section('content')




    <div class="container-fluid px-0" style='background:#fdf7fb'>
        <div class="row">
            <div class="col-xl-12 col-12 ml-xl-auto">
                <h5 class="mt-4"><b>ระบบจัดการผู้ใช้งาน </b>
                </h5>
                <div class=" text-center">
                    <div class="d-lg-block d-md-block d-none" style='font-size:unset'>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active nav-manage" id="list-1-tab" data-toggle="tab" href="#list-1" role="tab"
                                    aria-controls="list-1" aria-selected="true">ทั้งหมด
                                    ({{ $user->total() }})</a>
                            </li>
                            {{-- <li class="nav-item" role="presentation">
                            <a class="nav-link" id="list-3-tab" data-toggle="tab" href="#list-3" role="tab"
                                aria-controls="list-3" aria-selected="false">ระงับผู้ใช้งาน
                                ({{ count($ban) }})</a>
                        </li> --}}
                        </ul>
                    </div>
                    <div class="form-group d-lg-none d-md-none d-block">
                        <select class="form-control" id="select-submenu">
                            <option value="1">ทั้งหมด ({{ $user->total() }})</option>
                            {{-- <option value="2">ยืนยันตัวตน ({{ count($approve) }})</option> --}}
                            {{-- <option value="3">ระงับผู้ใช้งาน ({{ count($ban) }})</option> --}}
                        </select>
                    </div>

                    {{-- SEARCH --}}
                    <div class="col-lg-12 col-md-12 col-12 pt-4">
                        <form role="search" action="/dashboard/manageUser" method="GET">
                            {{-- @csrf --}}
                            <div class="input-group flex-wrap">
                                <input hidden type="search" name="search" class="form-control"
                                    style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                    value="search" placeholder="ค้นหาสินค้า" aria-label="search"
                                    aria-describedby="addon-wrapping">
                            </div>
                            <div class="input-group flex-wrap pt-2">
                                <div
                                    class="d-flex align-items-center col-lg-auto col-md-12 col-12 text-md-left text-left mt-lg-0 mt-md-4 mt-4">
                                    <h6 class="mb-0">ชื่อ</h6>
                                </div>
                                @if (isset($_REQUEST['u_name']))
                                    <input type="text" name="u_name" class="form-control col-lg-2"
                                        style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                        value="{{ $_REQUEST['u_name'] }}" placeholder="ชื่อ" aria-label="u_name"
                                        aria-describedby="addon-wrapping">
                                @else
                                    <input type="text" name="u_name" class="form-control col-lg-2"
                                        style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                        value="" placeholder="ชื่อ" aria-label="u_name" aria-describedby="addon-wrapping">
                                @endif
                                <div
                                    class="d-flex align-items-center col-lg-auto col-md-12 col-12 text-md-left text-left mt-lg-0 mt-md-4 mt-4">
                                    <h6 class="mb-0">อีเมล</h6>
                                </div>
                                @if (isset($_REQUEST['email']))
                                    <input type="text" name="email" class="form-control col-lg-2"
                                        style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                        value="{{ $_REQUEST['email'] }}" placeholder="อีเมล" aria-label="email"
                                        aria-describedby="addon-wrapping">
                                @else
                                    <input type="text" name="email" class="form-control col-lg-2"
                                        style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                        value="" placeholder="อีเมล" aria-label="email" aria-describedby="addon-wrapping">
                                @endif
                                <div
                                    class="d-flex align-items-center col-lg-auto col-md-12 col-12 text-md-left text-left mt-lg-0 mt-md-4 mt-4">
                                    <h6 class="mb-0">เบอร์โทรศัพท์</h6>
                                </div>
                                @if (isset($_REQUEST['phone']))
                                    <input type="number" name="phone" class="form-control col-lg-2"
                                        style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                        value="{{ $_REQUEST['phone'] }}" placeholder="เบอร์โทรศัพท์" aria-label="phone"
                                        aria-describedby="addon-wrapping">
                                @else
                                    <input type="number" name="phone" class="form-control col-lg-2"
                                        style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                        value="" placeholder="เบอร์โทรศัพท์" aria-label="phone"
                                        aria-describedby="addon-wrapping">
                                @endif
                                <div
                                    class="d-flex align-items-center col-lg-auto col-md-12 col-12 text-md-left text-left mt-lg-0 mt-md-4 mt-4">
                                    <h6 class="mb-0">สถานะ KYC</h6>
                                </div>
                                <select class="form-control col-lg-2" id="kyc_select" name='kyc_select'>
                                    <option id='kyc_select_chk' value='0'>ทั้งหมด</option>
                                    <option id='kyc_select_chk' value='1'>ยืนยันตัวตนเรียบร้อย</option>
                                    <option id='kyc_select_chk' value='2'>เอกสารไม่ครบ</option>
                                    <option id='kyc_select_chk' value='3'>รอการตรวจสอบ</option>
                                </select>
                            </div>
                            <div class="input-group flex-wrap pt-2">
                                <div class="col-lg-auto d-flex align-items-center col-md-12 col-12 text-md-left text-left mt-lg-0 mt-md-4 mt-4">
                                    <h6 class="mb-0">วันที่สมัคร</h6>
                                </div>
                                <div class="col-lg-2 col-md-6 col-6">
                                    @if (isset($_REQUEST['date_start']))
                                        <input type="date" name="date_start" value="{{ $_REQUEST['date_start'] }}"
                                            class="form-control"
                                            style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                            placeholder="date-start" aria-label="date-start"
                                            aria-describedby="addon-wrapping">
                                    @else
                                        <input type="date" name="date_start" class="form-control"
                                            style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                            placeholder="date-start" aria-label="date-start"
                                            aria-describedby="addon-wrapping">
                                    @endif
                                </div>
                                <div class="col-lg-auto d-flex align-items-center col-md-12 col-12 text-md-left text-left mt-lg-0 mt-md-ๅ mt-ๅ">
                                    <h6 class="mb-0">-</h6>
                                </div>
                                <div class="col-lg-2 col-md-6 col-6">
                                    @if (isset($_REQUEST['date_end']))
                                        <input type="date" name="date_end" value="{{ $_REQUEST['date_end'] }}"
                                            class="form-control"
                                            style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                            placeholder="date-end" aria-label="date-end" aria-describedby="addon-wrapping">
                                    @else
                                        <input type="date" name="date_end" class="form-control"
                                            style="border: none; border-bottom: 1px solid #ced4da; border-radius: unset;"
                                            placeholder="date-end" aria-label="date-end" aria-describedby="addon-wrapping">
                                    @endif
                                </div>

                                <div class="d-flex align-items-center col-lg-auto col-md-12 col-12 text-md-left text-left mt-lg-0 mt-md-4 mt-4">
                                    @if (isset($_REQUEST['chkISShop']) && $_REQUEST['chkISShop'] == 'Y')
                                    <input type="checkbox" id="chkISShop" name="chkISShop" value="Y" checked="checked" >&nbsp;&nbsp;
                                    @else
                                    <input type="checkbox" id="chkISShop" name="chkISShop" value="Y" >&nbsp;&nbsp;
                                    @endif
                                    <h6 class="mb-0">เฉพาะร้านค้า</h6>
                                </div>

                                <div class="col-lg-2 col-md-2 col-12 mb-2 ml-auto">
                                    <input type="submit" value="ค้นหา" name="filter" id="filter" class="form-control btn btn-main-set">
                                </div>
                                <div class="col-lg-2 col-md-2 col-12 mb-2">
                                    <a href="/dashboard/manageUser"><input type="button" value="ล้างค่า" class="form-control btn " style="background-color: #346751"></a>
                                </div>
                            </div>



                        </form>
                    </div>

                    {{-- SEARCH --}}

                    <div class="w-100">
                        <div class="tab-content" id="myTabContent">
                            {{-- 1taphome --}}
                            <div class="row justify-content-center tab-pane fade show active " id="list-1">
                                <div class="container-fluid table-responsive">
                                    <div class="card" style="border: none;">
                                        <div class="card-body m-2 p-0 ">
                                            <table class="table table-striped" id="main_table">
                                                <thead class="thead-blue">
                                                    <tr>
                                                        <th scope="col">อันดับ</th>
                                                        <th style="width:150px">รหัสผู้ใช้งาน</th>
                                                        <th scope="col">ชื่อ- นามสกุล</th>
                                                        <th scope="col">ชื่อร้านค้า</th>
                                                        <th scope="col">อีเมล</th>
                                                        <th style="width:150px" scope="col">เบอร์โทรศัพท์</th>
                                                        <th scope="col">เพศ</th>
                                                        <th style="width:160px" scope="col">วันที่สมัคร</th>
                                                        <!--th style="width:160px" scope="col">สถานะ KYC</th>
                                                        <th scope="col"></th-->
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    @foreach ($user as $key => $userdata)
                                                        <tr style="text-align: center; align-items: center;">
                                                            <td data-label="#">
                                                                {{ ($user->currentPage() - 1) * $user->perPage() + $key + 1 }}
                                                            </td>

                                                            @if ($userdata->type == 1)
                                                                <td data-label="รหัสผู้ใช้งาน"
                                                                    style="font-weight:bold;color:blue">
                                                                    {{ $userdata->id }}
                                                                </td>
                                                            @endif
                                                            @if ($userdata->type != 1)
                                                                <td>
                                                                    {{ $userdata->id }}
                                                                </td>
                                                            @endif



                                                            @if ($userdata->type == 99)
                                                                <td data-label="ชื่อ-นามสกุล"
                                                                    style="font-weight:bold;color:red">
                                                                    {{ $userdata->name }}
                                                                    {{ $userdata->surname }}
                                                                </td>
                                                            @endif
                                                            @if ($userdata->type != 99)
                                                                <td>
                                                                    {{ $userdata->name }}
                                                                    {{ $userdata->surname }}
                                                                </td>
                                                            @endif
                                                            <td data-label="ชื่อร้านค้า" style="color: #000;">
                                                                @if ($userdata->shop_name != null && $userdata->shop_name != '')
                                                                    <a href="javascript:void(0);" data-toggle="modal"
                                                                    data-target="#view_addr{{ $userdata->id }}"
                                                                    >{{ $userdata->shop_name }}</a>
                                                                @else
                                                                    -
                                                                @endif
                                                            </td>
                                                            <td data-label="Email">{{ $userdata->email }}</td>
                                                            <td data-label="เบอร์โทรศัพท์">{{ $userdata->phone }}</td>
                                                            <td data-label="เพศ">
                                                                @if ($userdata->sex != '')
                                                                    {{ $userdata->sex }}
                                                                @else
                                                                    -
                                                                @endif
                                                            </td>
                                                            <td data-label="วัน-เดือน-ปี (เกิด)">
                                                                @if ($userdata->created_at != '')
                                                                    {{ $userdata->created_at }}
                                                                @else
                                                                    -
                                                                @endif
                                                            </td>

                                                            <!--td data-label="kyc pic">
                                                                @if ($userdata->kyc_status == '3')
                                                                    <b class="color-sky">รอการตรวจสอบ</b>
                                                                @elseif($userdata->kyc_status == '2')
                                                                    <b class="color-price">หลักฐานไม่ถูกต้อง</b>
                                                                @elseif($userdata->kyc_status == '1')
                                                                    <b class="color-green">ยืนยันตัวตนเรียบร้อย</b>
                                                                @else
                                                                    <b class="color-grey">ยังไม่ได้ทำการพิสูจน์ตัวตน</b>
                                                                @endif
                                                            </td>

                                                            <td data-label="Ban User">
                                                                <button data-toggle="modal"
                                                                    data-target="#chk_kyc{{ $userdata->id }}"
                                                                    class="btn w-100 btn-verify"
                                                                   >ตรวจสอบ</button>

                                                                <div class="modal fade"
                                                                    id="chk_kyc{{ $userdata->id }}" role="dialog">
                                                                    <div class="modal-dialog modal-lg" role="document">
                                                                        <div class="modal-content">
                                                                            <div class="modal-header">
                                                                                <button type="button" class="close"
                                                                                    data-dismiss="modal"
                                                                                    aria-label="Close"><span
                                                                                        aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div class="modal-body">
                                                                                <div class="col-12">
                                                                                    <div class="row">
                                                                                        <div
                                                                                            class="col-lg-6 col-md-12 col-12 border-right">
                                                                                            <div class="col-12"
                                                                                                style='background:#dee2e6; border-radius:8px;'>
                                                                                                <div
                                                                                                    class="d-flex flex-wrap">
                                                                                                    <div
                                                                                                        class="col-4 px-0 py-3">
                                                                                                        <img style='border-radius: 50%;width: 60px;height: 55px;border: #333 3px solid;'
                                                                                                            src="{{ '/img/profile/kyc/' . $userdata->user_pic1 }}"
                                                                                                            alt="">
                                                                                                    </div>
                                                                                                    <div
                                                                                                        class="col-8 text-left py-3">
                                                                                                        <h6 class="font-weight-bold mb-1"
                                                                                                            style='color:#919191'>
                                                                                                            ไอดี :
                                                                                                            {{ $userdata->id }}
                                                                                                        </h6>
                                                                                                        <b>
                                                                                                            <h6
                                                                                                                class="font-weight-bold">
                                                                                                                {{ $userdata->name }}
                                                                                                                {{ $userdata->surname }}
                                                                                                            </h6>
                                                                                                        </b>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                class='col-12 border-bottom'>
                                                                                                <div
                                                                                                    class="col-12 text-left pt-3">
                                                                                                    <h6 class="font-weight-bold mb-1"
                                                                                                        style='color:#919191'>
                                                                                                        เพศ</h6>
                                                                                                    <b>
                                                                                                        <h6
                                                                                                            class="font-weight-bold">
                                                                                                            @if ($userdata->sex != '')
                                                                                                                {{ $userdata->sex }}
                                                                                                            @else
                                                                                                                -
                                                                                                            @endif
                                                                                                        </h6>
                                                                                                    </b>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                class='col-12 border-bottom'>
                                                                                                <div
                                                                                                    class="col-12 text-left pt-2">
                                                                                                    <h6 class="font-weight-bold mb-1"
                                                                                                        style='color:#919191'>
                                                                                                        อีเมล</h6>
                                                                                                    <b>
                                                                                                        <h6
                                                                                                            class="font-weight-bold">
                                                                                                            {{ $userdata->email }}
                                                                                                        </h6>
                                                                                                    </b>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                class='col-12 border-bottom'>
                                                                                                <div
                                                                                                    class="col-12 text-left pt-2">
                                                                                                    <h6 class="font-weight-bold mb-1"
                                                                                                        style='color:#919191'>
                                                                                                        เบอร์โทรศัพท์</h6>
                                                                                                    <b>
                                                                                                        <h6
                                                                                                            class="font-weight-bold">
                                                                                                            {{ $userdata->phone }}
                                                                                                        </h6>
                                                                                                    </b>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                class='col-12 border-bottom'>
                                                                                                <div
                                                                                                    class="col-12 text-left pt-2">
                                                                                                    <h6 class="font-weight-bold mb-1"
                                                                                                        style='color:#919191'>
                                                                                                        วัน เดือน ปี เกิด
                                                                                                    </h6>
                                                                                                    <b>
                                                                                                        <h6
                                                                                                            class="font-weight-bold">
                                                                                                            @if ($userdata->dateofbirth != '')
                                                                                                                {{ $userdata->dateofbirth }}
                                                                                                            @else
                                                                                                                -
                                                                                                            @endif
                                                                                                        </h6>
                                                                                                    </b></h6></b>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            class="col-lg-6 col-md-12 col-12">
                                                                                            <div
                                                                                                class="col-12 text-left pt-2 p-0">
                                                                                                <h6
                                                                                                    class="font-weight-bold">
                                                                                                    ตรวจสอบการยืนยันตัวตน
                                                                                                </h6>
                                                                                            </div>
                                                                                            <div
                                                                                                class="col-12 text-left pt-2 p-0">
                                                                                                <div class="galleryKYC">
                                                                                                    {{-- {{ $userdata->kyc_pic1 }} --}}
                                                                                                    <label for="">รูปถ่ายคู่กับบัตรประชาชน</label>
                                                                                                    @if(isset($userdata->kyc[0]))
                                                                                                    <img src="/{{ $userdata->kyc[0]->image_second }}" onerror="this.onerror=null;this.src='/img/no_image.png'" class="w-100 upload2ShowImage mb-3" alt="your image" />
                                                                                                    @else
                                                                                                    <img src="/img/no_image.png" onerror="this.onerror=null;this.src='/img/no_image.png'" class="w-100 upload2ShowImage mb-3" alt="your image" />
                                                                                                    @endif
                                                                                                    {{-- {{ $userdata->kyc_pic2 }} --}}

                                                                                                    {{-- <a class="big"
                                                                                                        data-dismiss="modal"
                                                                                                        href="{{ '/img/profile/kyc/' . $userdata->kyc_pic }}">
                                                                                                        <img style='width: 100%;height: 100%;'
                                                                                                            src="{{ '/img/profile/kyc/' . $userdata->kyc_pic }}"
                                                                                                            alt="">
                                                                                                    </a> --}}
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class='mt-1'>
                                                                                                <a
                                                                                                    href="/dashboard/manageUser/KYC/approve?id={{ $userdata->id }}">
                                                                                                    <button
                                                                                                        class='form-control'
                                                                                                        style='background:#346751;color:white;'
                                                                                                        name="id">ยืนยัน</button>
                                                                                                </a>
                                                                                            </div>
                                                                                            <div class='mt-2'
                                                                                                style='background:#f4f4f4'>
                                                                                                <button id="btnDecline"
                                                                                                    class='form-control mt-2'
                                                                                                    type="button"
                                                                                                    style='background:#919191;color:white;'
                                                                                                    data-id="{{ $userdata->id }}">หลักฐานไม่ถูกต้อง</button>
                                                                                            </div>
                                                                                            <div class="col-12 text-left pt-2 dvRemark_{{ $userdata->id }} p-0"
                                                                                                style="display: {{ $userdata->kyc_status == '2' ? '' : 'none' }};">
                                                                                                <h6
                                                                                                    class="font-weight-bold">
                                                                                                    หมายเหตุ
                                                                                                </h6>
                                                                                                <textarea
                                                                                                    id="kyc_remark{{ $userdata->id }}"
                                                                                                    name="kyc_remark"
                                                                                                    style="width: 100%;"
                                                                                                    rows="3"
                                                                                                    maxlength="511">{{ $userdata->kyc_remark }}</textarea>

                                                                                                <button
                                                                                                    class='form-control mt-2 btnConfirmDecline'
                                                                                                    type="submit"
                                                                                                    style='background:#919191;color:white;'
                                                                                                    data-id="{{ $userdata->id }}">บันทึก</button>

                                                                                            </div>

                                                                                            {{-- <div class="col-12 text-left pt-2 dvRemark_{{ $userdata->id }} p-0"
                                                                                                style="display: {{ $userdata->kyc_status == '2' ? '' : 'none' }};">
                                                                                                <h6
                                                                                                    class="font-weight-bold">
                                                                                                    หมายเหตุ
                                                                                                </h6>
                                                                                                <textarea
                                                                                                    id="txtRemark_{{ $userdata->id }}"
                                                                                                    name="txtRemark"
                                                                                                    style="width: 100%;"
                                                                                                    rows="6"
                                                                                                    maxlength="511">{{ $userdata->kyc_remark }}</textarea>
                                                                                                <a
                                                                                                    href="/dashboard/manageUser/KYC/delete?id={{ $userdata->id }}">
                                                                                                    <button
                                                                                                        class='form-control '
                                                                                                        style='background:#919191;color:white;'
                                                                                                        name="id">บันทึก</button>
                                                                                                </a>
                                                                                            </div> --}}
                                                                                        </div>
                                                                                    </div>
                                                                                    {{-- <img src="{{('/img/profile/kyc/'.$userdata->kyc_pic)}}"
                                                                            class="img-fluid img-thumbnail">
                                                                            <h1>love her{{$userdata->id}}</h1> --}}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div-->

                                                                <!-- Modal -->
                                                                <div class="modal fade" id="view_addr{{ $userdata->id }}" role="dialog">
                                                                    <div class="modal-dialog modal-lg" role="document">
                                                                        <div class="modal-content">
                                                                            <div class="modal-header">
                                                                                <button type="button" class="close"
                                                                                    data-dismiss="modal"
                                                                                    aria-label="Close"><span
                                                                                        aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div class="modal-body">
                                                                                <div class="col-12">
                                                                                    <div class="row">
                                                                                        <div class="col-lg-6 col-md-12 col-12">
                                                                                            <div class="col-12"
                                                                                                style='background:#dee2e6; border-radius:8px;'>
                                                                                                <div class="d-flex flex-wrap">
                                                                                                    <div class="col-4 px-0 py-3">
                                                                                                        <img style='border-radius: 50%;width: 60px; height: 55px;border: #333 3px solid;' src="{{ '/img/profile/kyc/' . $userdata->user_pic1 }}" alt="">
                                                                                                    </div>
                                                                                                    <div class="col-8 text-left py-3">
                                                                                                        <b>
                                                                                                            <h6
                                                                                                                class="font-weight-bold">
                                                                                                                {{ $userdata->name }}
                                                                                                                {{ $userdata->surname }}
                                                                                                            </h6>
                                                                                                        </b>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-lg-12 col-md-12 col-12 border-right">
                                                                                            <div class='col-12 border-bottom'>
                                                                                                <div class="col-12 text-left pt-3">
                                                                                                    <h6 class="font-weight-bold mb-1" style='color:#919191'>ที่อยู่ร้านค้า</h6>
                                                                                                    <b>
                                                                                                        <h6 class="font-weight-bold">
                                                                                                            @if ($userdata->origin_addr != '')
                                                                                                                {{ $userdata->origin_addr }}
                                                                                                            @else
                                                                                                                -
                                                                                                            @endif
                                                                                                        </h6>
                                                                                                    </b>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class='col-12 border-bottom'>
                                                                                                <div class="col-12 text-left pt-3">
                                                                                                    <h6 class="font-weight-bold mb-1" style='color:#919191'>ที่อยู่ของฉัน</h6>
                                                                                                    @if ($userdata->shop_addr != '')
                                                                                                        @foreach($userdata->shop_addr as $v_shop_addr)
                                                                                                            <b>
                                                                                                                <h6 class="font-weight-bold">
                                                                                                                    {{$v_shop_addr}}
                                                                                                                </h6>
                                                                                                            </b><hr>
                                                                                                        @endforeach
                                                                                                    @else
                                                                                                        -
                                                                                                    @endif
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>


                                                        </tr>
                                                    @endforeach
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 d-flex flex-wrap">
                                <div class="col-6 text-left">
                                    ลำดับที่ {{ ($user->currentPage() - 1) * $user->perPage() + 1 }} -
                                    {{ ($user->currentPage() - 1) * $user->perPage() + count($user) }} จาก
                                    {{ $user->total() }}

                                </div>
                                <div class="col-6">
                                    <div class="d-flex justify-content-end col-12">


                                        @if ($user->hasPages())
                                            <ul class="pagination">
                                                {{-- Previous Page Link --}}

                                                @if ($user->onFirstPage())
                                                    <li class="disabled align-self-center px-2 bg-pagination-white d-none">
                                                        <span class="mr-1"><i
                                                                class="fa fa-angle-double-left text-secondary"
                                                                aria-hidden="true"></i></span>
                                                    </li>
                                                    <li class="disabled align-self-center px-2 bg-pagination-white d-none">
                                                        <span class="mr-1"><i
                                                                class="fa fa-angle-left text-secondary"
                                                                aria-hidden="true"></i></span>
                                                    </li>
                                                @else <li class="align-self-center px-2 bg-pagination-white">
                                                        <a href="{{ $user->url(1) }}" rel="prev">
                                                            <i class="fa fa-angle-double-left text-secondary"
                                                                aria-hidden="true"></i>
                                                        </a>
                                                    <li class="align-self-center px-2 bg-pagination-white">
                                                        <a href="{{ $user->previousPageUrl() }}" rel="prev">
                                                            <i class="fa fa-angle-left text-secondary"
                                                                aria-hidden="true"></i>
                                                        </a>
                                                    </li>
                                                @endif

                                                {{-- show button first page --}}
                                                @if ($user->currentPage() > 5)
                                                    <li class="align-self-center px-2 bg-pagination-white">
                                                        <a href="{{ $user->url(1) }}"><span>1</span></a>
                                                    </li>
                                                @endif
                                                {{-- show button first page --}}


                                                {{-- condition stay in first page not show button --}}
                                                {{-- @if ($user->currentPage() == 1)
                                                        <li class="align-self-center mr-1">
                                                            <a class="d-none page-link" tabindex="-2">1</a>
                                                        </li>
                                                        @endif --}}


                                                @if ($user->currentPage() > 5)
                                                    <li class="align-self-center px-2 bg-pagination-white">
                                                        <span>...</span>
                                                    </li>
                                                @endif



                                                @foreach (range(1, $user->lastPage()) as $i)
                                                    @if ($i >= $user->currentPage() - 2 && $i <= $user->currentPage() + 2)

                                                        @if ($i == $user->currentPage())
                                                            <li class="active px-2 bg-pagination-42294f">
                                                                <span>{{ $i }}</span>
                                                            </li>
                                                        @else
                                                            <li class="px-2 bg-pagination-white"><a
                                                                    href="{{ $user->url($i) }}">{{ $i }}</a>
                                                            </li>
                                                        @endif
                                                    @endif
                                                @endforeach


                                                {{-- three dots between number near last pages --}}
                                                @if ($user->currentPage() < $user->lastPage() - 4)
                                                    <li class="align-self-center  px-2 bg-pagination-white">
                                                        <span>...</span>
                                                    </li>
                                                @endif
                                                {{-- three dots between number near last pages --}}


                                                {{-- Show Last Page --}}
                                                @if ($user->hasMorePages() == $user->lastPage() && $user->lastPage() > 5)
                                                    <li class="align-self-center px-2 bg-pagination-white">
                                                        <a href="{{ $user->url($user->lastPage()) }}"><span>{{ $user->lastPage() }}</span>
                                                        </a>
                                                    </li>
                                                @endif
                                                {{-- Show Last Page --}}



                                                @if ($user->hasMorePages())
                                                    <li class="align-self-center px-2 bg-pagination-white">
                                                        <a href="{{ $user->nextPageUrl() }}" rel="next">
                                                            <i class="fa fa-angle-right text-secondary"
                                                                aria-hidden="true"></i>
                                                        </a>
                                                    </li>
                                                    <li class="align-self-center px-2 bg-pagination-white">
                                                        <a href="{{ $user->url($user->lastPage()) }}" rel="next">
                                                            <i class="fa fa-angle-double-right text-secondary"
                                                                aria-hidden="true"></i>
                                                        </a>
                                                    </li>

                                                @else
                                                    <li class="disabled align-self-center px-2 bg-pagination-white d-none">
                                                        <span><i class="fa fa-angle-right text-secondary"
                                                                aria-hidden="true"></i></span>
                                                    </li>
                                                    <li class="disabled align-self-center px-2 bg-pagination-white d-none">
                                                        <i class="fa fa-angle-double-right text-secondary"
                                                            aria-hidden="true"></i></a>
                                                    </li>

                                                @endif
                                            </ul>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('style')
    <style>
        .box {
            height: calc(100vh - 250px);
            ;
        }

        .top {
            margin-top: 100px;
        }

        .btn a {
            color: #346751;
        }

        .btn a:hover {
            color: #333;
        }


        .ticket_left {
            background-color: #f8eaf3;
            border-radius: 6px;
        }

        .ticket_right {
            background-color: #42294f;
            border-radius: 6px;
            color: white;
        }

        .nav-tabs {
            border-bottom: 5px solid #346751 !important;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        .nav-tabs .nav-link {
            border-bottom: 1px solid #346751 !important;
            border-top-left-radius: 8px !important;
            border-top-right-radius: 8px !important;
            padding-bottom: 10px !important;
        }

        .nav-item {
            font-size: 16px !important;
            padding-right: 5px !important;
        }

        .nav-link {
            color: black !important;
            background: #efefef;
        }

        .table.dataTable.no-footer {
            border: unset;
        }

        .table.dataTable tbody tr {
            background-color: #ffffff;
        }

        .modal-backdrop {
            display: none;
        }

        .modal {
            background: rgba(0, 0, 0, 0.5);
        }

        .sl-prev,
        .sl-next,
        .sl-counter {
            display: none !important;
        }

    </style>
@endsection


@section('script')

    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
    {{-- <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script> --}}
    <script src="{{ '/js/jquery.dataTables.min.js' }}"></script>


    <script>
        $('#select-submenu').on('change', function() {
            value = $(this).val();
            $('a.nav-link[href="#list-' + value + '"]').click();
        });
    </script>

    <script>
        $(document).ready(function() {
            $("#sex option").each(function(index) {
                location.getParams = getParams;
                // console.log (location.getParams()["status"]);
                if ($(this).val() == location.getParams()["sex"]) {
                    $(this).attr('selected', 'true');
                    console.log($(this).val());
                }
            });
            $("#kyc_select option").each(function(index) {
                location.getParams = getParams;
                // console.log (location.getParams()["status"]);
                if ($(this).val() == location.getParams()["kyc_select"]) {
                    $(this).attr('selected', 'true');
                    console.log($(this).val());
                }
            });
            $('body').on('click', '#btnDecline', function() {
                $('.dvRemark_' + $(this).data('id')).show();
                // alert($("#dvRemark").html());
            });
            $(".btnConfirmDecline").click(function() {
                $.ajax({
                    type: 'POST',
                    data: {
                        "_token": "{{ csrf_token() }}",
                        "id": $(this).data('id'),
                        "remark": $('#kyc_remark' + $(this).data('id')).val()
                    },
                    url: "/dashboard/manageUser/KYC/delete",
                    success: function(json) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'บันทึกข้อมูลสำเร็จ'
                        })
                        location.reload();
                    }
                });
            });
        });

        function getParams() {
            var result = {};
            var tmp = [];

            location.search
                .substr(1)
                .split("&")
                .forEach(function(item) {
                    tmp = item.split("=");
                    result[tmp[0]] = decodeURIComponent(tmp[1]);
                });

            return result;
        }
    </script>




@endsection
