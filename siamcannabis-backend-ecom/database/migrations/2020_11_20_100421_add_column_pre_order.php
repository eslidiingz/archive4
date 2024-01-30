<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnPreOrder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pre_order', function (Blueprint $table) {
            $table->integer('status_goods')->default('0')->after('product_img');
            $table->integer('sales')->default('0')->after('status_goods');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pre_order', function (Blueprint $table) {
            //
        });
    }
}
