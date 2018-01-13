<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class EquipePessoa extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'equipe_id',
        'pessoa_id',
        'ativo',
    ];

    protected $table = 'equipe_pessoa';
}

