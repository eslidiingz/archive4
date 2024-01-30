<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesAmountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_amounts', function (Blueprint $table) {
            $table->id();
            $table->integer('shop_id');
            $table->integer('invs_id');
            $table->string('type');
            $table->double('amount', 12, 4)->default(0);
            $table->enum('status', ['Withdrawable','InProcess','TransferWallet', 'Withdrawed']);
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
        Schema::dropIfExists('sales_amounts');
    }
}
