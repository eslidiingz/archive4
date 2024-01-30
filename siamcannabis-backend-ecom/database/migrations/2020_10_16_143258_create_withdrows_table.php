<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWithdrowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('withdrows', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('shop_id');
            $table->integer('inv_id');
            $table->double('amount', 12, 4)->default(0);
            $table->string('type');
            $table->integer('status');
            $table->string('bank_code')->nullable();
            $table->string('bank_name',100)->nullable();
            $table->string('bank_category',100)->nullable();
            $table->string('bank_number')->nullable();
            $table->string('note',255)->nullable();
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
        Schema::dropIfExists('withdrows');
    }
}
