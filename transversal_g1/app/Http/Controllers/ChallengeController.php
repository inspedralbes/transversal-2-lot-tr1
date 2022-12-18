<?php

namespace App\Http\Controllers;
use App\Models\challenge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


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
    public function checkChallenge(Request $request){
        $challenged=DB::select('SELECT DISTINCT nickname AS challengedName, idChallenged FROM challenges JOIN users ON id=idChallenged WHERE id='.$request->idChallenged);
        $challenger=DB::select('SELECT nickname AS challengerName, idChallenger FROM challenges JOIN users ON id=idChallenger WHERE idChallenged='.$request->idChallenged);
        return response()->json(['challenger'=>$challenger, 'challenged'=>$challenged]);
        //uwu
    }
}
