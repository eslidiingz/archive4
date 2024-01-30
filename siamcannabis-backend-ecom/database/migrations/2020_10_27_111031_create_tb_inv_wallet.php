<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbInvWallet extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invs_wallet', function (Blueprint $table) {
            $table->integer('id');
            $table->string('inv_ref');
            $table->integer('user_id');
            $table->string('payment')->nullable();
            $table->decimal('total', 11, 2)->default(0);
            $table->longText('note')->nullable();
            $table->integer('status');
            $table->string('transfer_img')->nullable();
            $table->longText('transfer_slip')->nullable();
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
        Schema::dropIfExists('invs_wallet');
    }
}
