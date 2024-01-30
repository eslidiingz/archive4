<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbUsersAdmin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_admin', function (Blueprint $table) {
            $table->id();
            $table->string('username',16);
            $table->string('password');
            $table->string('name');
            $table->string('surname')->nullable();
            $table->string('email')->nullable();;
            $table->enum('type',['admin','superadmin'])->default('admin');
            $table->string('user_pic')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users_admin');
    }
}
