<?php

namespace App\Http\Controllers;

use App\Repositories\PessoaRepository;
use Illuminate\Http\Request;
use App\Http\Requests;

class MembroController extends Controller
{
    protected $pessoaRepository;
    public function __construct(PessoaRepository $pessoaRepository)
    {
        $this->pessoaRepository = $pessoaRepository;
    }
    //
    public function index()
    {
        $membros = $this->pessoaRepository->paginate();
        return view('membro.index', compact('membros'));
    }
}
