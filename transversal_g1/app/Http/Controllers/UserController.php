<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($request->only('email', 'password'))){
            return response()->json(Auth::user(), 200);
        }
        throw ValidationException::withMessages([
            'email' =>['The provided credentials are incorect.']
        ]);
    }
    public function logout()
    {
        Auth::logout();
    }
}
