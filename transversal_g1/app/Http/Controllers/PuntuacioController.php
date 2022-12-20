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

        $sql  = "SELECT games.id FROM games JOIN users ON users.id= '$request->idUser' WHERE games.id = (SELECT MAX(games.id) FROM games) ;";
        $idGame=DB::select($sql);
        $puntuacions->puntuacio=$request->puntuacio;
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
                            $ranking=DB::select('SELECT users.nickname,games.categoria, puntuacions.puntuacio FROM puntuacions JOIN users ON users.id=puntuacions.idUser JOIN games ON games.id=puntuacions.idGame WHERE games.difficulty=1 and games.type="normal" ORDER BY `puntuacions`.`puntuacio` DESC LIMIT 3');
                            return response()->json($ranking);
                            break;
                        case 2:
                            $ranking=DB::select('SELECT users.nickname,games.categoria, puntuacions.puntuacio FROM puntuacions JOIN users ON users.id=puntuacions.idUser JOIN games ON games.id=puntuacions.idGame WHERE games.difficulty=2 and games.type="normal" ORDER BY `puntuacions`.`puntuacio` DESC LIMIT 3');
                            return response()->json($ranking);
                            break;
                        case 3:
                            $ranking=DB::select('SELECT users.nickname,games.categoria, puntuacions.puntuacio FROM puntuacions JOIN users ON users.id=puntuacions.idUser JOIN games ON games.id=puntuacions.idGame WHERE games.difficulty=3 and games.type="normal" ORDER BY `puntuacions`.`puntuacio` DESC LIMIT 3');
                            return response()->json($ranking);
                            break;
                        default:
                        $ranking=DB::select('SELECT users.nickname,games.categoria, puntuacions.puntuacio FROM puntuacions JOIN users ON users.id=puntuacions.idUser JOIN games ON games.id=puntuacions.idGame  ORDER BY `puntuacions`.`puntuacio` DESC LIMIT 3');
                        return response()->json($ranking);
                    }
                break;
            case 'diaria':
                $ranking=DB::select('SELECT users.nickname,games.categoria, puntuacions.puntuacio FROM puntuacions JOIN users ON users.id=puntuacions.idUser JOIN games ON games.id=puntuacions.idGame WHERE games.type="diaria" ORDER BY `puntuacions`.`puntuacio` DESC LIMIT 3');
                return response()->json($ranking);
                break;
            default:
            break;
        }

    }
}
