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

class RepositoryServiceProvider extends ServiceProvider
{
    //protected $defer = true;
    protected $models = [
        'Pessoa',
    ];

    protected $arrayToBind = [];

    /**
     * Create a new service provider instance.
     *
     * @param  \Illuminate\Contracts\Foundation\Application  $app
     * @return void
     */
    public function __construct($app)
    {
        $this->app = $app;
        $this->setupBinds();
    }

    protected function setupBinds()
    {
        foreach ($this->models as $model) {
            $this->arrayToBind["\\App\\Repositories\\{$model}Repository"] = "\\App\\Repositories\\{$model}RepositoryEloquent";
        }
    }

    public function boot()
    {
        //exit('boot - RepositoryServiceProvider');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
       // dd('register - RepositoryServiceProvider');

        /*$models = array(
            'Pessoa',
        );*/


        foreach ($this->arrayToBind as $interface=>$implementation) {
            $this->app->bind($interface, $implementation);
        }



        //$this->app->bind('App\Repositories\PessoaRepository', 'App\Repositories\PessoaRepositoryEloquent');


       // $model = 'Pessoa';

        ///$this->app->bind("App\\Repository\\{$model}RepositoryInterface", "App\\Repository\\{$model}Repository");

    }

    public function provides()
    {
        return array_keys($this->arrayToBind);
    }
}