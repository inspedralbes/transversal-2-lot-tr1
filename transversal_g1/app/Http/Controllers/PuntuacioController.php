<?php

namespace App\Http\Controllers;
use App\Models\puntuacions;
use Illuminate\Http\Request;

class PuntuacioController extends Controller
{
    public function store(Request $request)
    {


        $puntuacions=new puntuacions;

        $puntuacions->idUser=$request->idUser;
        if($request->challenge==true){
            
        }
        $puntuacions->puntuacio=$request->puntuacio;
        $puntuacions->save();

        //
    }
}
