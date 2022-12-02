<?php

namespace App\Http\Controllers;
use App\Models\game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function store(Request $request)
    {
        $dadesFetch=$request;
        json_decode($dadesFetch);
        $game=new game;

        $game->id;
        $game->difficulty=$dadesFetch->difficulty;
        $game->categoria="Literatura";
        $game->json=json_encode($dadesFetch->json);
        $game->iduser=1;
        $game->save();

        //
    }
}
