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
        $puntuacions->puntuacio=$request->puntuacio;
        if($request->challenge==true){
            $puntuacions->idGame=$request->idGame;
        }else{
            $sql  = "SELECT games.id FROM games JOIN users ON users.id= games.iduser WHERE users.id='$request->idUser' and games.id = (SELECT MAX(games.id) FROM games)";
            $idGame=DB::select($sql);
            $puntuacions->idGame=$idGame[0]->id;
        }


        //return response()->json();

        $puntuacions->save();

        //
    }
}
