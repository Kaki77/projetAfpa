<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class AuthController extends Controller
{
    public function login(Request $request){
        $credentials=$request->all();
        $validator=Validator::make($credentials,[
            'email'=>['required','email'],
            'password'=>['required']
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors(),[],'400');
        }
        if(Auth::attempt($credentials)){
            $request->session()->regenerate();
            return $this->handleResponse(Auth::id(),'User logged-in');
        }
        else{
            return $this->handleError('Credentials do not match',[],'401');
        }
    }

    public function logout(Request $request){
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return $this->handleResponse([],'Logout');
    }

    public function register(Request $request){
        $input=$request->all();
        $validator=Validator::make($input,[
            'name'=>['required'],
            'email'=>['required','email'],
            'password'=>['required'],
            'confirm_password'=>['required','same:password']
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors(),[],'400');
        }

        $input['password']=bcrypt($input['password']);
        $user=User::create($input);

        return $this->handleResponse($user,'User registered');
    }

    public function checkSession(Request $request) {
        if ((time() - $request->session()->get('LAST_ACTIVITY')) > (\Config::get('session.lifetime') * 60)) {
            if(Auth::id()) {
                return $this->handleResponse(Auth::id(),'Session is not expired');
            }
            else {
                return $this->handleResponse('','Session is not existent');
            }
        }
        return $this->handleResponse('','Session is expired');
    }
}
