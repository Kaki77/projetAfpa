<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ResetPassword;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
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
            $data = ['id'=>Auth::id(),'dark_mode'=>User::find(Auth::id())->dark_mode];
            return $this->handleResponse($data,'User logged-in');
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
                return $this->handleError('Session is not existent',[],'401');
            }
        }
        return $this->handleError('Session is expired',[],'401');
    }

    public function checkToken(Request $request) {
        $token = $request->token;
        if(ResetPassword::where('token',$token)->first()) {
            return $this->handleResponse([],'Password reset request is valid. Please fill the form to reset your password.');
        }
        else {
            return $this->handleError('Password reset request is invalid or expired.',[],'401');
        }
    }

    public function passwordResetMail(Request $request) {
        $input=$request->all();
        $validator = Validator::make($input,[
            'mail'=>['required','email']
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors(),[],'400');
        }
        $email = User::where('email',$request->mail)->first();
        if($email) {
            $token = Str::random(64);
            Mail::to($email->email)->send(new ResetPasswordMail($token));
            ResetPassword::create([
                'email'=>$email->email,
                'token'=>$token,
            ]);
        }
        return $this->handleResponse([],'A link has been send to '.$request->mail.', please check you mails.');
    }

    public function passwordReset(Request $request) {
        $input = $request->all();
        $validator = Validator::make($input,[
            'token'=>['required'],
            'password'=>['required'],
            'confirm_password'=>['required','same:password'],
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors(),[],'400');
        }
        $reset = ResetPassword::where('token',$request->token)->first();
        if($reset) {
            if($reset->created_at->add(1,'hour')->diffInHours(now()) >= 0) {
                $user = User::where('email',$reset->email)->first();
                if($user) {
                    $user->password = bcrypt($request->password);
                    $user->save();
                    return $this->handleResponse([],'Password has been changed with success.');
                }
                else {
                    return $this->handleError('User not found.',[],'404');
                }
            }
            else {
                return $this->handleError('Password reset request is expired.',[],'401');
            }
        }
        return $this->handleError('Password reset request is invalid.',[],'401');
    }
}
