<?php

namespace App\Http\Controllers;
use App\Models\challenge;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    public function store(Request $request)
    {


        $challenge = new challenge;
        $challenge->idChallenger=$request->idChallenger;
        $challenge->idChallenged=$request->idChallenged;
        $challenge->idGame=$request->idGame;
        $challenge->save();

        //
    }
}
