<?php

namespace App;

use App\Http\Controllers\shop\ShopController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kyc extends Model
{
    protected $table = 'kyc_m';
    use SoftDeletes;

    public function admin()
    {
        return $this->belongsTo(UsersAdmin::class, 'admin_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function shop()
    {
        return $this->belongsTo(shops::class, 'shop_id', 'id');
    }
}
