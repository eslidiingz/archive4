<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRatingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rating', function (Blueprint $table) {
            $table->id();
            $table->integer('invs_id');
            $table->integer('product_id');
            $table->integer('shop_id');
            $table->integer('user_id');
            $table->integer('rating');
            $table->longText('comment')->nullable();
            $table->longText('picture')->nullable();
            $table->date('datetime');
            $table->integer('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rating');
    }
}
