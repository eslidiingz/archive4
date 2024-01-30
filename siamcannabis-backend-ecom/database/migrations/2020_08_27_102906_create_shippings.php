<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShippings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shippings', function (Blueprint $table) {
            $table->bigInteger('ship_id')->unique();
            $table->bigInteger('shop_id')->nullable();
            $table->string('ship_default',255)->nullable();
            $table->decimal('ship_price',10,2)->nullable();
            $table->bigInteger('shipde_id')->nullable();
            $table->bigInteger('shipty_id')->nullable();
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
        Schema::dropIfExists('shippings');
    }
}