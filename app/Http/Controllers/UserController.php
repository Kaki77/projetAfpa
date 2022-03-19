<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;
use Auth;

class UserController extends Controller
{
    public function index() {
        $users = User::all()->orderBy('name','asc');
        return $this->handleResponse(UserResource::collection($users),'Users fetched with success');
    }

    public function show($id) {
        $user = User::find($id);
        if(!$user) {
            return $this->handleError('User not Found');
        }
        foreach($user->posts as $post) {
            $post->share_date = $post->created_at;
        }
        $shared_posts = $user->sharedPost->pluck('sharedPost')->pluck('created_at','post_id');
        foreach($user->sharedPost as $shared_post) {
            $shared_post->share_date = $shared_posts[$shared_post->id];
        }
        return $this->handleResponse(new UserResource($user),'User fetched with success');
    }

    public function destroy($id) {
        $user = User::find($id);
        if($user) {
            return $this->handleError('User not found');
        }
        $user->delete();
        return $this->handleResponse([],'User deleted with success');
    }

    public function changeDescription(Request $request) {
        $user = User::find(Auth::id());
        if(!$user) {
            return $this->handleError('An error has occured, please try later');
        }
        $input = $request->all();
        $validator = Validator::make($input,[
            'description'=>['max:250'],
        ]);
        if($validator->fails()) {
            return $this->handleError($validator->errors());
        }
        $user->description = $request->description;
        $user->save();
        return $this->handleResponse([],'Description updated with success');
    }

    public function changeAvatar(Request $request) {
        $user = User::find(Auth::id());
        if(!$user) {
            return $this->handleError('An error has occured, please try later');
        }
        $input = $request->all();
        $validator = Validator::make($input,[
            'avatar'=>['image','mimes:jpeg,png,jpg']
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors());
        }
        $imageName=time().'.'.$request->avatar->getClientOriginalExtension();
        $request->avatar->move(public_path('uploads'),$imageName);
        $user->avatar = env('UPLOAD_PATH').$imageName;
        $user->save();
        return $this->handleResponse([],'Avatar updated with success');
    }

    public function changePassword(Request $request) {
        $user = User::find(Auth::id());
        if(!$user) {
            return $this->handleError('An error has occured, please try later');
        }
        $input = $request->all();
        $validator = Validator::make($input,[
            'old_password'=>['required'],
            'password'=>['required'],
            'confirm_password'=>['required','same:password'],
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors(),[],'400');
        }
        if(password_verify($request->old_password,$user->password)) {
            $user->password = bcrypt($request->password);
            $user->save();
            return $this->handleResponse([],'Password has been updated with success');
        }
        else {
            return $this->handleError('Your old password is not correct',[],'401');
        }
    }

    public function followFeed() {
        $follow = User::find(Auth::id())->follow()->orderBy('name','asc')->get();
        return $this->handleResponse(UserResource::collection($follow),'Follow fetched with success');
    }

    public function follow($id) {
        $followers = User::find($id)->followers();
        $follow = $followers->where('follower_id',Auth::id())->first();
        if(!$follow) {
            $followers->attach(Auth::id());
            $data = json_encode(true);
            $message = "Follow is successfull";
        }
        else {
            $followers->detach(Auth::id());
            $data = json_encode(false);
            $message = "Unfollow is successfull";
        }
        return $this->handleResponse($data,$message);
    }
}
