<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//no conflict with spa
Route::get('{any_path?}/{any_subpath?}/{any_sub_subpath?}', function () {
    $dark_mode = Auth::id() ?  \App\Models\User::find(Auth::id())->dark_mode : '';
    return view('master',['dark_mode'=>$dark_mode]);
});


Route::post('/login',[AuthController::class,'login'])->name('login');
Route::post('/register',[AuthController::class,'register'])->name('register');
Route::post('/sessionCheck',[AuthController::class,'checkSession'])->name('chechSession');
Route::post('/mail-reset-password',[AuthController::class,'passwordResetMail'])->name('passwordResetMail');
Route::post('/password-reset',[AuthController::class,'passwordReset'])->name('passwordReset');