<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Pessoa;

class CreateTablePessoa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pessoa', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome',255);
            $table->enum('sexo', ['M','F'])->default('M');
            $table->string('endereco', 255);
            $table->string('cep', 10)->default('72000000');
            $table->string('telefone', 11);
            $table->string('celular', 11);
            $table->date('dtNascimento');
            $table->date('dtBatismo');
            $table->date('dtCasamento');
            $table->string('profissao', 255);
            $table->enum('estado_civil', array_keys(Pessoa::getEstadosCivis()));
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
        Schema::drop('pessoa');
    }
}
