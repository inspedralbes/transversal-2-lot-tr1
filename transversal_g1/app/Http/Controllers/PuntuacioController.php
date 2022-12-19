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
        $sql  = "SELECT games.id FROM games JOIN users ON users.id= games.iduser WHERE users.id='$request->idUser' and games.id = (SELECT MAX(games.id) FROM games)";
        $idGame=DB::select($sql);

        //return response()->json();
        $puntuacions->idGame=$idGame[0]->id;
        $puntuacions->save();

        //
    }
}
