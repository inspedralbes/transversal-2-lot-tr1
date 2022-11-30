<?php

namespace App\Http\Controllers;
use App\models\game;
use Illuminate\Http\Request;

class GameControlloer extends Controller
{
    public function store(Request $request)
    {
        $game= new game;

        $user->id=$request->id;
        $user->data=$request->data;
        $user->difficulty=$request->difficulty;
        $user->json=$request->json;
        $user->iduser=$request->iduser;
        $user->store();

        //
    }
}
