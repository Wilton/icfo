<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\EquipePessoaRepository;
use App\Models\EquipePessoa;
use App\Validators\EquipePessoaValidator;

/**
 * Class EquipePessoaRepositoryEloquent
 * @package namespace App\Repositories;
 */
class EquipePessoaRepositoryEloquent extends BaseRepository implements EquipePessoaRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return EquipePessoa::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
