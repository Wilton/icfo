<?php
/**
 * Created by PhpStorm.
 * User: junior
 * Date: 23/05/2016
 * Time: 21:38
 */

namespace App\Repository;

use App\Model\Pessoa;


class PessoaRepository implements PessoaRepositoryInterface
{
    protected $model;

    public function __construct(Pessoa $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function index()
    {
        // TODO: Implement index() method.
    }

    public function paginate()
    {
        return $this->model->paginate(10);
    }
}