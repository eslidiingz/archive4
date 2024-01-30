<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->integer('id');
            $table->string('inv_ref')->nullable();
            $table->integer('campaign_id')->default(0);
            $table->decimal('total', 10, 2)->default(0);
            $table->decimal('point', 11, 4)->default(0);
            $table->decimal('coin', 11, 4)->default(0);
            $table->integer('status')->default(0);
            $table->string('payment')->nullable();
            $table->json('inv_id')->nullable();
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
        Schema::dropIfExists('transactions');
    }
}
