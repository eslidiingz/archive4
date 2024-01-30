<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTotalWeightToInvs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invs', function (Blueprint $table) {
            $table->integer('shipty_id')->nullable();
            $table->decimal('total_weight', 11, 2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invs', function (Blueprint $table) {
            $table->dropColumn('shipty_id');
            $table->dropColumn('total_weight');
        });
    }
}
