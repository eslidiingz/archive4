<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderdetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orderdetails', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id');
            $table->string('inv_ref');
            $table->integer('id');
            $table->integer('shop_id');
            $table->json('inv_products')->nullable();
            $table->decimal('shipping_cost', 11, 2)->default(0);
            $table->json('payment')->nullable();
            $table->integer('campaign_id')->nullable();
            $table->integer('shipping_id')->nullable();
            $table->decimal('total', 11, 2)->default(0);
            $table->longText('note');
            $table->integer('coupon_id')->nullable();
            $table->integer('status');
            $table->longText('shipping_note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orderdetails');
    }
}
