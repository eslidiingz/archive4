<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateT10walletsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('t10wallets', function (Blueprint $table) {
            $table->id();
            $table->char('invoice', 255)->nullable();
            $table->double('price', 15, 4)->default(0);
            $table->char('urlcallbacksuccess', 255)->nullable();
            $table->char('urlcallbackfail', 255)->nullable();
            $table->integer('status')->default(0);
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
        Schema::dropIfExists('t10wallets');
    }
}
