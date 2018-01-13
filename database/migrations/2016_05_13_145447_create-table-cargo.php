<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCargo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cargo', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome',200);
            $table->string('ativo',1)->default('S');
            $table->dateTime('data_fim');
            $table->timestamps();
        });

        Schema::create('cargo_pessoa', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cargo_id')->unsigned()->index();
            $table->foreign('cargo_id')->references('id')->on('cargo')->onDelete('cascade');
            $table->integer('pessoa_id')->unsigned()->index();
            $table->foreign('pessoa_id')->references('id')->on('pessoa')->onDelete('cascade');
            $table->string('ativo',1)->default('S');
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
        Schema::drop('cargo');
        Schema::drop('cargo_pessoa');
    }
}
