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
        $game->json=$request->json;
        $game->iduser= $request->iduser;




        switch($request->type){
            case 'challenge':
                $sql  = "SELECT games.id FROM games JOIN users ON users.id= '$request->iduser' WHERE games.id = (SELECT MAX(games.id) FROM games) ;";
                $idGame=DB::select($sql);
                $idgame2=$idGame[0]->id;

            $iduser=$game->iduser;
            return response()->json(['idGame'=>$idgame2, 'idChallenger'=>$iduser],200);
                break;
            case 'daily':
                return response()->json(200);
                break;
            case 'normal':

            $game->save();

            return response()->json([$game->id,$game->iduser],200);
                break;
        }

        //
    }
    public function sendDailyGame(){
        $game=DB::table('games')->where('id',0)->value('json');
        return response()->json($game,200);
    }
}
