<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShippingDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipping_details', function (Blueprint $table) {
            $table->bigInteger('shipde_id')->unique();
            $table->decimal('shipde_price',10,2)->nullable();
            $table->double('shipde_wide',10,2)->nullable();
            $table->double('shipde_high',10,2)->nullable();
            $table->double('shipde_long',10,2)->nullable();
            $table->double('shipde_weight',10,2)->nullable();
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
        Schema::dropIfExists('shipping_details');
    }
}
