<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Pessoa extends Model implements Transformable
{
    use TransformableTrait;
    
    protected $fillable = [
        'nome',
        'sexo',
        'endereco',
        'cep',
        'telefone',
        'celular',
        'dtNacimento',
        'dtBatismo',
        'dtCasamento',
        'profissao',
        'estaco_civil',
    ];

    const SEXO_MASCULINO = 'M';
    const SEXO_FEMININO = 'F';

    protected static $sexoTypes = [
        self::SEXO_MASCULINO => 'Masculino',
        self::SEXO_FEMININO  => 'Feminino',
    ];

    const ESTADO_CIVIL_SOLTEIRO = 1;
    const ESTADO_CIVIL_CASADO = 2;
    const ESTADO_CIVIL_SEPARADO = 3;
    const ESTADO_CIVIL_DIVORCIADO = 4;
    const ESTADO_CIVIL_VIUVO = 5;

    protected static $estadoCivilTypes = [
        self::ESTADO_CIVIL_SOLTEIRO   => 'Solteiro',
        self::ESTADO_CIVIL_CASADO     => 'Casado',
        self::ESTADO_CIVIL_SEPARADO   => 'Separado',
        self::ESTADO_CIVIL_DIVORCIADO => 'Divorciado',
        self::ESTADO_CIVIL_VIUVO      => 'Viúvo',
    ];

    //
    protected $table = 'pessoa';

    /**
     * @return array
     */
    public static function getEstadosCivis()
    {
        return self::$estadoCivilTypes;
    }

    /**
     * @return array
     */
    public static function getSexos()
    {
        return self::$sexoTypes;
    }

    /**
     * Retorna as equipes do pessoa
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function equipes()
    {
        return $this->belongsToMany(Equipe::class, 'equipe_pessoa', 'pessoa_id');
    }

    public function cargos()
    {
        return $this->belongsToMany(Cargo::class, 'cargo_pessoa', 'pessoa_id');
    }
}

