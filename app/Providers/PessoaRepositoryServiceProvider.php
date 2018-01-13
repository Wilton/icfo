<?php
/**
 * Created by PhpStorm.
 * User: junior
 * Date: 23/05/2016
 * Time: 22:09
 */

namespace App\Providers;


//use PessoaRepository;
use Illuminate\Support\ServiceProvider;

class PessoaRepositoryServiceProvider extends ServiceProvider
{
   // protected $defer = true;

    public function boot()
    {
        //exit('boot');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
//        exit('register');
        $models = array(
            'Pessoa',
        );

        /*
        foreach ($models as $model) {
            $this->app->bind("\\App\\Repositories\\{$model}Repository", "\\App\\Repositories\\{$model}RepositoryEloquent");
        }
        */


        $this->app->bind('App\Repositories\PessoaRepository', 'App\Repositories\PessoaRepositoryEloquent');
        /*$this->app->bind('App\Repositories\PessoaRepository', function ($app) {
            new \App\Repositories\PessoaRepositoryEloquent();
        });*/


       // $model = 'Pessoa';

        ///$this->app->bind("App\\Repository\\{$model}RepositoryInterface", "App\\Repository\\{$model}Repository");

    }

   /* public function provides()
    {
        return ['App\Repositories\PessoaRepositoryEloquent'];
    }*/
}