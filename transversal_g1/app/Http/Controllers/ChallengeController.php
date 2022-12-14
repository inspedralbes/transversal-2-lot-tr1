<?php

namespace App\Http\Controllers;
use App\models\challenge;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    public function store(Request $request)
    {


        $challenge=new challenge();
        $challenge->idChallenger->$request->idChallenger;
        $challenge->idChallenged->$request->idChallenged;
        $challenge->idGame->$request->idGame;
        $challenge->seem->$request->seen; 
        $challenge->save();

        //
    }
}
