<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\CargoRepository;
use App\Models\Cargo;
use App\Validators\CargoValidator;

/**
 * Class CargoRepositoryEloquent
 * @package namespace App\Repositories;
 */
class CargoRepositoryEloquent extends BaseRepository implements CargoRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Cargo::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
