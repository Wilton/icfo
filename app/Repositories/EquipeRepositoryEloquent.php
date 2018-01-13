<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\EquipeRepository;
use App\Models\Equipe;
use App\Validators\EquipeValidator;

/**
 * Class EquipeRepositoryEloquent
 * @package namespace App\Repositories;
 */
class EquipeRepositoryEloquent extends BaseRepository implements EquipeRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Equipe::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
