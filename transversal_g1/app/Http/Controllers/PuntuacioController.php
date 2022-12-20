<?php

namespace App\Http\Controllers;
use App\Models\puntuacions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PuntuacioController extends Controller
{
    public function store(Request $request)
    {


        $puntuacions=new puntuacions;

        $puntuacions->idUser=$request->idUser;
        if($request->challenge==true){

        }
        $sql  = "SELECT games.id FROM games JOIN users ON users.id= '$request->idUser' WHERE games.id = (SELECT MAX(games.id) FROM games) ;";
        $idGame=DB::select($sql);

        //return response()->json();
        $puntuacions->idGame=$idGame[0]->id;
        $puntuacions->save();

        //
    }
    public function sendRanking( Request $request ){
         
        switch($request->tipus){
            case 'normal':
                    switch($request->dificultat){
                        case 1:
                            $ranking=DB::select('SELECT users.nickname,games.categoria, puntuacions.puntuacio FROM puntuacions JOIN users ON users.id=puntuacions.idUser JOIN games ON games.id=puntuacions.idGame WHERE games.difficulty=1 ORDER BY `puntuacions`.`puntuacio` DESC LIMIT 3');
                            return response()->json($ranking);
                            break;
                        case 2:
                            $ranking=DB::select('SELECT users.nickname,games.categoria, puntuacions.puntuacio FROM puntuacions JOIN users ON users.id=puntuacions.idUser JOIN games ON games.id=puntuacions.idGame WHERE games.difficulty=2 ORDER BY `puntuacions`.`puntuacio` DESC LIMIT 3');
                            return response()->json($ranking);
                            break;
                        case 3:
                            $ranking=DB::select('SELECT users.nickname,games.categoria, puntuacions.puntuacio FROM puntuacions JOIN users ON users.id=puntuacions.idUser JOIN games ON games.id=puntuacions.idGame WHERE games.difficulty=3 ORDER BY `puntuacions`.`puntuacio` DESC LIMIT 3');
                            return response()->json($ranking);
                            break;
                        default:
                        $ranking=null;
                        return response()->json($ranking);
                    }
                break;
            case 'diaria':
                break;
            default:
            break;
        }

    }
}
