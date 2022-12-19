<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nickname' => 'required|min:4|string|max:255',
            'email' => 'required|email|string|max:255',
            'password' => 'required|min:8|',

        ]);
        $user = new user();


        $user->nickname = $request->nickname;
        $user->email = $request->email;
        $user->exp=0;
        $user->password = Hash::make($request->password);
        $user->description = "";


        $user->save();

        //
    }
    public function login(Request $request)
    {

        $request->validate([

            'email' => 'required|email|string|max:255',
            'password' => 'required'

        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('cookie_token', $token, 60 * 24);
            return response()->json(Auth::user(), 200);
        }
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorect.']
        ]);
    }
    public function sendUser()
    {
        return response()->json(Auth::user(), 200);
    }
    public function logout()
    {
        Auth::logout();
    }
    public function profileUpdate(Request $request)
    {
        //validation rules

        $request->validate([
            'name' => 'required|min:4|string|max:255',
            'email' => 'required|email|string|max:255'
        ]);
        $user  = user::find($request->id);
        $user->nickname = $request->nickname;
        $user->email = $request->email;
        $user->description = $request->description;
        $user->save();
    }
    public function showAllUsers(Request $request){
        $users=DB::select('SELECT id ,nickname FROM users WHERE NOT id='.$request->userId);
        return response()->json($users);
    }
}
