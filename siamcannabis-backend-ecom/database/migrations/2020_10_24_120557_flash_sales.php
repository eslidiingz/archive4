<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FlashSales extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flash_sales', function (Blueprint $table) {
            $table->id();
            $table->integer('shop_id');
            $table->string('name')->nullable();
            $table->longText('description')->nullable();
            $table->integer('category_id');
            $table->integer('sub_category_id');
            $table->integer('brand_id')->nullable();
            $table->string('warranty_type')->nullable();
            $table->string('product_unit')->nullable();
            $table->integer('product_weight')->default(0);
            $table->integer('product_L')->default(0);
            $table->integer('product_W')->default(0);
            $table->integer('product_H')->default(0);
            $table->json('product_option')->nullable();
            $table->string('product_img')->nullable();
            $table->timestamps();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('product_old_id')->nullable();
            $table->integer('product_limit')->nullable();
            $table->integer('time_period')->default(0);
            $table->integer('product_pin')->default(0);
            $table->enum('type', ['flashsale', '9baht']);
            $table->enum('status', ['enabled', 'unenabled']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flash_sales');
    }
}