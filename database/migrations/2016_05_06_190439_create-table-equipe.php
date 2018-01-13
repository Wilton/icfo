<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableEquipe extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipe', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome', 200);
            $table->string('ativo',1)->default('N');
            $table->timestamps();
        });

        Schema::create('equipe_pessoa', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('equipe_id')->unsigned()->index();
            $table->foreign('equipe_id')->references('id')->on('equipe')->onDelete('cascade');
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
        Schema::drop('equipe');
        Schema::drop('equipe_pessoa');
    }
}
