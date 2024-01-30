<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTwoctwoppaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('twoctwoppayments', function (Blueprint $table) {
            $table->id();
            $table->string('version')->nullable();
            $table->dateTime('request_timestamp')->nullable();
            $table->string('merchant_id')->nullable();
            $table->string('currency')->nullable();
            $table->string('order_id')->nullable();
            $table->string('amount')->nullable();
            $table->string('invoice_no')->nullable();
            $table->string('transaction_ref')->nullable();
            $table->string('approval_code')->nullable();
            $table->string('eci')->nullable();
            $table->dateTime('transaction_datetime')->nullable();
            $table->string('payment_channel')->nullable();
            $table->string('payment_status')->nullable();
            $table->string('channel_response_code')->nullable();
            $table->string('channel_response_desc')->nullable();
            $table->string('masked_pan')->nullable();
            $table->string('stored_card_unique_id')->nullable();
            $table->string('backend_invoice')->nullable();
            $table->string('paid_channel')->nullable();
            $table->string('paid_agent')->nullable();
            $table->string('recurring_unique_id')->nullable();
            $table->string('ippPeriod')->nullable();
            $table->string('ippInterestType')->nullable();
            $table->string('ippInterestRate')->nullable();
            $table->string('ippMerchantAbsorbRate')->nullable();
            $table->string('payment_scheme')->nullable();
            $table->string('process_by')->nullable();
            $table->string('sub_merchant_list')->nullable();
            $table->string('issuer_country')->nullable();
            $table->string('issuer_bank')->nullable();
            $table->string('card_type')->nullable();
            $table->string('user_defined_1')->nullable();
            $table->string('user_defined_2')->nullable();
            $table->string('user_defined_3')->nullable();
            $table->string('user_defined_4')->nullable();
            $table->string('user_defined_5')->nullable();
            $table->string('browser_info')->nullable();
            $table->string('hash_value')->nullable();
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
        Schema::dropIfExists('twoctwoppayments');
    }
}
