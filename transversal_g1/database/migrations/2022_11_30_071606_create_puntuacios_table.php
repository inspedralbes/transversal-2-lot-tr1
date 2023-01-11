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
        Schema::create('puntuacions', function (Blueprint $table) {
            $table->biginteger('idUser')->unsigned();
            $table->biginteger('idGame')->unsigned()->index();
            $table->integer('puntuacio');
            $table->primary(['idGame','idUser']);
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idGame')->references('id')->on('games')->onDelete('cascade')->nullable();
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
        Schema::dropIfExists('puntuacions');
    }
};
