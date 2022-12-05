<?php

namespace App\Http\Controllers;
use App\Models\puntuacio;
use Illuminate\Http\Request;

class PuntuacioController extends Controller
{
    public function store(Request $request)
    {


        $puntuacions=new puntuacio;

        $puntuacions->idUser=$request->idUser;
        $puntuacions->idGame=$request->idGame;
        $puntuacions->puntuacio=$request->puntuacio;
        $puntuacions->save();

        //
    }
}
