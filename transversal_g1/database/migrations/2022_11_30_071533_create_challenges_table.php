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
        Schema::create('challenges', function (Blueprint $table) {
            $table->biginteger('idChallenger')->unsigned()->index();
            $table->biginteger('idChallenged')->unsigned();
            $table->biginteger('idGame')->unsigned();
            $table->primary(['idChallenger','idChallenged','idGame']);
            $table->enum('seen',['0','1']);
            $table->integer('winner');
            $table->foreign('idChallenger')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idChallenged')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idGame')->references('id')->on('games')->onDelete('cascade');
            
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
