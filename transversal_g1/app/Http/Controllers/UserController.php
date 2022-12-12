<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function store(Request $request)
    {
        
        $user= new user();

        
        $user->nickname=$request->nickname;
        $user->email=$request->email;
        $user->password=Hash::make($request->password);
        $user->description="";


        $user->save();

        //
    }
    public function login(Request $request)
    {

        $request->validate([
            'name' =>'required|min:4|string|max:255',
            'email'=>'required|email|string|max:255',
            'password'=>'required',
            
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
    public function profileUpdate(Request $request){
        //validation rules

        $request->validate([
            'name' =>'required|min:4|string|max:255',
            'email'=>'required|email|string|max:255'
        ]);
        $user = user::find($request->id);
        $user->nickname=$request->nickname;
        $user->email=$request->email;
        $user->password=Hash::make($request->password);
        $user->description=$request->description;
        $user->save();
}
}