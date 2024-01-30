<?php

namespace App\Http\Controllers\Dashboard;

use App\branch_income;
use App\Http\Controllers\Controller;
use App\Shops as shops;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IncomeController extends Controller
{
    public function income(Request $request)
    {
        if (isset($request->search)) {
            // dd($request);
            $income = branch_income::leftJoin('invs', 'branch_income.inv_id', '=', 'invs.id')
                ->leftJoin('shops', 'invs.shop_id', '=', 'shops.id')
                ->select('branch_income.*', 'invs.inv_ref', 'invs.shipping_cost', 'shops.shop_name', 'invs.inv_no as inv_no')
                ->orderBy('branch_income.created_at', 'desc');
            // $income = $income->whereIn('branch_income.status', [2, 99]);
            foreach ($_GET as $key => $val) {
                if ($key == 'date_start' and $val != '') {
                    $income = $income->where('branch_income.created_at', '>=', $val . ' 00:00:00');
                } elseif ($key == 'date_end' and $val != '') {
                    $income = $income->where('branch_income.created_at', '<=', $val . ' 23:59:59');
                } elseif ($key == 'inv_ref' and $val != '') {
                    $income = $income->where('inv_ref', 'like', '%' . $val . '%');
                } elseif ($key == 'amount_start' and $val != '') {
                    $income = $income->where('branch_income.total', '>=', $val);
                } elseif ($key == 'amount_end' and $val != '') {
                    $income = $income->where('branch_income.total', '<=', $val);
                }
            }
            $income = $income->paginate(50)->appends(request()->query());
        } else {
            $income = branch_income::leftJoin('invs', 'branch_income.inv_id', '=', 'invs.id')
                ->leftJoin('shops', 'invs.shop_id', '=', 'shops.id')
                ->select('branch_income.*', 'invs.inv_ref', 'invs.shipping_cost', 'shops.shop_name', 'invs.inv_no as inv_no')
                ->orderBy('branch_income.created_at', 'desc')
                ->paginate(50);
        }
        foreach($income as $value){
            $branch = shops::where('user_id', $value->branch_id)->first();
            if($branch){
                $value->branch_name = $branch->shop_name;
            }
        }
        return view('dashboard.income', compact('income'));
    }
}
