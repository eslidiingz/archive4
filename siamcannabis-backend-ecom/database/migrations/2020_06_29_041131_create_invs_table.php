<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invs', function (Blueprint $table) {
            $table->integer('id');
            $table->string('inv_ref');
            $table->integer('user_id');
            $table->integer('shop_id');
            $table->longText('rating_peview')->nullable();
            $table->json('inv_products')->nullable();
            $table->decimal('shipping_cost', 11, 2)->default(0);
            $table->string('payment')->nullable();
            $table->integer('campaign_id')->nullable();
            $table->integer('shipping_id')->nullable();
            $table->longText('tracking_number')->nullable();
            $table->decimal('total', 11, 2)->default(0);
            $table->longText('note')->nullable();
            $table->integer('coupon_id')->nullable();
            $table->integer('status');
            $table->longText('shipping_note')->nullable();
            $table->json('address')->nullable();
            $table->string('transfer_img')->nullable();
            $table->longText('transfer_slip')->nullable();
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
        Schema::dropIfExists('invs');
    }
}
