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
        $puntuacions->idGame=DB::select("SELECT games.id FROM games JOIN users ON users.id= '.$request->idUser.' WHERE games.id = (SELECT MAX(games.id) FROM games");
        $puntuacions->puntuacio=$request->puntuacio;
        $puntuacions->save();

        //
    }
}
