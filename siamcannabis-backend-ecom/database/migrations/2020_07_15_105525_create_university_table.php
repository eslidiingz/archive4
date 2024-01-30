<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUniversityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('university', function (Blueprint $table) {
            $table->id();
            $table->string('university_name');
            $table->string('fullname1');
            $table->string('studentid1');
            $table->string('position1');

            $table->string('fullname2');
            $table->string('studentid2');
            $table->string('position2');

            $table->string('fullname3');
            $table->string('studentid3');
            $table->string('position3');

            $table->string('fullname4');
            $table->string('studentid4');
            $table->string('position4');

            $table->string('fullname5');
            $table->string('studentid5');
            $table->string('position5');

            $table->string('vendor_id');
            $table->string('group_name');  
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('university');
    }
}
