<?php

namespace App\Http\Controllers;
use App\Models\game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class GameController extends Controller
{
    public function store(Request $request)
    {


        $game=new game;

        $game->id;
        $game->type=$request->type;
        $game->difficulty=$request->difficulty;
        $game->categoria=$request->category;
        $game->json=json_encode($request->json);
        $game->iduser=1;
        $game->save();

        //
    }
    public function sendDailyGame(){
        $game=new game();
        $game= DB::table('games')->where('id',0);
        $partida=$game->json;
        return response()->json($partida);

    }
}
