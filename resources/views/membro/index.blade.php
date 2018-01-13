@extends('template')
@section('content')
    <h1>Membros</h1>
    @foreach($membros as $membro)
        <h2>{{ $membro->nome }}</h2>
        <p>{{ $membro->endereco }}</p>
    @endforeach
    {{ $membros->render()  }}
@endsection