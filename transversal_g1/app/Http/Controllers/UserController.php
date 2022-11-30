<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    public function store(Request $request)
    {
        $user= new user;

        $user->id=$request->id;
        $user->nickname=$request->nickname;
        $user->email=$request->email;
        $user->password=$request->password;
        $user->description	=$request->description	;


        $user->store();

        //
    }
}
