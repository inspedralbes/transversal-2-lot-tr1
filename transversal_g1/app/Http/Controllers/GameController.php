<?php

namespace App\Http\Controllers;
use App\models\game;
use Illuminate\Http\Request;

class GameControlloer extends Controller
{
    public function store(Request $request)
    {
        $dadesFetch=$request;
        json_decode($dadesFetch);
        $game= new game;

        $game->id;
        $game->difficulty=$dadesFetch->difficulty;
        $game->category=$dadesFetch->category;
        $game->json=$dadesFetch->json;
        $game->iduser=1;
        $game->store();

        //
    }
}
