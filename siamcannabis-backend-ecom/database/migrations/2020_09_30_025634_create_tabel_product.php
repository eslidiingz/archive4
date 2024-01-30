<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTabelProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tabel_product', function (Blueprint $table) {
            $table->id();
            $table->integer('shop_id');
            $table->string('name')->nullable();
            $table->longText('description')->nullable();
            $table->string('pro_option1')->nullable();
            $table->string('pro_option2')->nullable();
            $table->integer('category_id');
            $table->integer('sub_category_id');
            $table->string('product_img')->nullable();
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
        Schema::dropIfExists('tabel_product');
    }
}
