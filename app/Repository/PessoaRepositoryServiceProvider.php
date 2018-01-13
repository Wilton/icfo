<?php
/**
 * Created by PhpStorm.
 * User: junior
 * Date: 23/05/2016
 * Time: 22:09
 */

namespace App\Repository;


use App\Model\Pessoa;
//use PessoaRepository;
use Illuminate\Support\ServiceProvider;

class PessoaRepositoryServiceProvider extends ServiceProvider
{
    protected $defer = true;

    public function boot()
    {
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {

        $models = array(
            'Pessoa',
        );

        foreach ($models as $model) {
            $this->app->bind("App\\Repository\\{$model}RepositoryInterface", "App\\Repository\\{$model}Repository");
        }

        /*
        $this->app->bind(PessoaRepositoryInterface::class, function($app){
            return new PessoaRepository();
        });


        $model = 'Pessoa';

        $this->app->bind("App\\Repository\\{$model}RepositoryInterface", "App\\Repository\\{$model}Repository");
        */
    }

    public function provides()
    {
        return [PessoaRepositoryInterface::class];
    }
}