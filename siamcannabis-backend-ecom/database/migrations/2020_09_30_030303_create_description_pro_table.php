<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDescriptionProTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('description_pro', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id');
            $table->string('desc_option1')->nullable();
            $table->string('desc_option2')->nullable();
            $table->integer('price')->nullable();
            $table->integer('stock')->nullable();
            $table->json('dimension');
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
        Schema::dropIfExists('description_pro');
    }
}
