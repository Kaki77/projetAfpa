<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;


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
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',[AuthController::class,'logout'])->name('logout');

    Route::resource('user',UserController::class);
    Route::post('/user/{user}/editDescription',[UserController::class,'changeDescription'])->name('changeDescription');
    Route::post('/user/{user}/editAvatar',[UserController::class,'changeAvatar'])->name('changeAvatar');


    Route::resource('post',PostController::class);
});