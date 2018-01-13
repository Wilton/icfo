<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Equipe extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'nome', 'ativo'
    ];

    protected $table = 'equipe';

    /**
     * Retorna as pessoas da equipe
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function membros()
    {
        return $this->belongsToMany(Pessoa::class, 'equipe_pessoa', 'equipe_id');
    }
}
