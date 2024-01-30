@extends('layouts.dashboard')

@section('content')
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-12">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    ยินดีต้อนรับ {{ Auth::guard('admin')->user()->name }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
