<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMobilebankingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('mobilebankings', function (Blueprint $table) {
            $table->integer('user_id')->after('id')->nullable();    
            $table->char('qrType', 255)->nullable();
            $table->double('amount', 15, 4)->default(0);
            $table->char('note', 255)->nullable();
            $table->dateTime('confirm_at')->nullable();
            $table->char('blockchain', 255)->nullable();
            $table->char('client_ip', 255)->nullable();
            $table->char('partner', 255)->nullable();
            $table->char('ppType', 255)->nullable();
            $table->char('ppId', 255)->nullable();
            $table->char('ref1', 255)->nullable();
            $table->char('ref2', 255)->nullable();
            $table->char('ref3', 255)->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mobilebankings', function (Blueprint $table) {
            //
        });
    }
}
