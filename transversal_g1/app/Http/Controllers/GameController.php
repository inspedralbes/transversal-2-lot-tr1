<?php

namespace App\Http\Controllers;
use App\models\game;
use Illuminate\Http\Request;

class GameControlloer extends Controller
{
    public function store(Request $request)
    {
        $game= new game;

        $user->id;

        $user->difficulty=$request->difficulty;
        $user->category=$request->category;
        $user->json=$request->json;
        $user->iduser=1;
        $user->store();

        //
    }
}
