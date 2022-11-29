<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('challenge', function (Blueprint $table) {
            $table->integer('idChallenger')->unsigned();
            $table->integer('idChallenged')->unsigned();
            $table->integer('idGame')->unsigned();

            $table->primary(['idChallenger','idChallenged','idGame']);
            $table->enum('seen',['0','1']);
            $table->integer('winner');
            $table->foreign('idChallenger')->references('id')->on('user')->onDelete('cascade');
            $table->foreign('idChallenged')->references('id')->on('user')->onDelete('cascade');
            $table->foreign('idGame')->references('id')->on('game')->onDelete('cascade');
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
        //
    }
};
