<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogmobilepaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logmobilepayments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('payeeProxyId')->nullable();
            $table->string('payeeProxyType')->nullable();
            $table->string('payeeAccountNumber')->nullable();
            $table->string('payeeName')->nullable();
            $table->string('payerProxyId')->nullable();
            $table->string('payerProxyType')->nullable();
            $table->string('payerAccountNumber')->nullable();
            $table->string('payerName')->nullable();
            $table->string('sendingBankCode')->nullable();
            $table->string('receivingBankCode')->nullable();
            $table->string('amount')->nullable();
            $table->string('channelCode')->nullable();
            $table->string('transactionId')->nullable();
            $table->string('transactionDateandTime')->nullable();
            $table->string('billPaymentRef1')->nullable();
            $table->string('billPaymentRef2')->nullable();
            $table->string('billPaymentRef3')->nullable();
            $table->string('currencyCode')->nullable();
            $table->string('transactionType')->nullable();
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
        Schema::dropIfExists('logmobilepayments');
    }
}
