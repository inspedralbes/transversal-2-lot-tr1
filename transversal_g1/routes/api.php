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
//Challenges
Route::get('/checkChallenges',[ChallengeController::class, 'checkChallenge']);
Route::post('/challengeUser', [ChallengeController::class , 'store']);
Route::get('/sendChallengeGame',[ChallengeController::class, 'sendGame']);
Route::post('/setWinner',[ChallengeController::class,'checkWinner']);
//Users
Route::get('/user-check', [UserController::class , 'sendUser']);
Route::get('/sendAllUsers', [UserController::class , 'showAllUsers']);
Route::post('/register-user',[UserController::class, 'store']);
Route::post('/edit-profile',[UserController::class, 'profileUpdate']);
Route::post('/login',[UserController::class, 'login']);
//Puntuacions
Route::post('/store-points', [PuntuacioController::class , 'store']);
Route::get('getRanking',[PuntuacioController::class,'sendRanking']);
//Game
Route::post('/store-game', [GameController::class , 'store']);
Route::get('/daily', [GameController::class , 'sendDailyGame']);

