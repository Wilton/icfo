<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Model\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Model\Pessoa::class, function (Faker\Generator $faker) {
    return [
        'nome' => $faker->name,
        'sexo' => $faker->randomElement(['M', 'F']),
        'endereco' => $faker->address,
        'cep' => $faker->postcode,
        'telefone' => $faker->phoneNumber,
        'celular' => $faker->phoneNumber,
        'dtNascimento' => $faker->date('Y-m-d'),
        'dtBatismo' => $faker->date('Y-m-d'),
        'dtCasamento' => $faker->date('Y-m-d'),
        'profissao' => $faker->word,
        'estado_civil' => $faker->randomElement(array_keys(\App\Model\Pessoa::getEstadosCivis())),
    ];
});
