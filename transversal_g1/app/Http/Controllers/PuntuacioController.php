<?php

namespace App\Http\Controllers;
use App\Models\puntuacio;
use Illuminate\Http\Request;

class PuntuacioController extends Controller
{
    public function store(Request $request)
    {


        $puntuacio=new puntuacio;

        $puntuacio->idUser=$request->idUser;
        $puntuacio->idGame=$request->idGame;
        $puntuacio->puntuacio=$request->puntuacio;
        $puntuacio->save();

        //
    }
}
