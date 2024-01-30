<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvCancelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inv_cancels', function (Blueprint $table) {
            $table->id();
            $table->integer('inv_id');
            $table->string('type');
            $table->integer('user_id');
            $table->integer('shop_id');
            $table->integer('user_approve')->default(0);
            $table->integer('shop_approve')->default(0);
            $table->integer('admin_approve')->default(0);
            $table->integer('status')->default(0);
            $table->string('cancel_pic')->nullable();
            $table->longText('description')->nullable();
            $table->longText('admin_note')->nullable();
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
        Schema::dropIfExists('inv_cancels');
    }
}
