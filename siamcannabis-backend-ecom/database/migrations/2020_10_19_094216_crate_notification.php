<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrateNotification extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            // $table->enum('type',['finance','dealing','news','message']);
            $table->integer('detail_id');
            $table->json('text')->nullable();
            $table->enum('read',['read','unread'])->default('unread');
            $table->json('url')->nullable();
            $table->timestamps();
        });

        Schema::create('notification_detail', function (Blueprint $table) {
            $table->id();
            $table->enum('type',['finance','dealing','news','message']);
            $table->json('pattern');
            $table->json('url')->nullable();
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
        Schema::dropIfExists('notification');
        Schema::dropIfExists('notification_detail');
    }
}
