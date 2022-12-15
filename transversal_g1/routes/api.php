<?php

use App\Http\Controllers\ChallengeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\PuntuacioController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user-check', [UserController::class , 'sendUser']);
Route::post('/store-game', [GameController::class , 'store']);
Route::post('/challengeUser', [ChallengeController::class , 'store']);
Route::post('/register-user',[UserController::class, 'store']);
Route::post('/edit-profile',[UserController::class, 'profileUpdate']);
Route::post('/login',[UserController::class, 'login']);
Route::post('/store-points', [PuntuacioController::class , 'store']);
Route::get('/daily', [GameController::class , 'sendDailyGame']);
