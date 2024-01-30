<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->integer('id');
            $table->string('shop_name')->nullable();
            $table->string('shop_pic')->nullable();
            $table->longText('description')->nullable();
            $table->json('payment')->nullable();
            $table->string('t10_payment_id')->nullable();
            $table->string('bank_code')->nullable();
            $table->string('bank_number')->nullable();
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
        Schema::dropIfExists('shops');
    }
}
