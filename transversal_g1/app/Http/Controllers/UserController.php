<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function store(Request $request)
    {
        
        $user= new user;

        $user->id=$request->id;
        $user->nickname=$request->nickname;
        $user->email=$request->email;
        $user->password=Hash::make($request->password);
        $user->description	=$request->description	;


        $user->store();

        //
    }
    public function login(Request $request)
    {
        $user=new user;
        
    }
}
