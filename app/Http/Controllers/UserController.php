<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;
use Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all()->orderBy('name','asc');
        return $this->handleResponse(UserResource::collection($users),'Users fetched with success');
    }

    public function show($id)
    {
        $user = User::find($id);
        if(!$user) {
            return $this->handleError('User not Found');
        }
        return $this->handleResponse(new UserResource($user),'test');
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if($user) {
            return $this->handleError('User not found');
        }
        $user->delete();
        return $this->handleResponse([],'User deleted with success');
    }

    public function changeDescription(Request $request,$id)
    {
        $user = User::find($id);
        if(!$user || $id != Auth::id()) {
            return $this->handleError('An error has occured, please try later');
        }
        $input = $request->all();
        $validator = Validator::make($input,[
            'description'=>['max:250'],
        ]);
        if($validator->fails()) {
            return $this->handleError($validator->errors());
        }
        $user->description = $input['description'];
        $user->save();
        return $this->handleResponse([],'Description updated with success');
    }

    public function changeAvatar(Request $request,$id) {
        $user = User::find($id);
        if(!$user || $id != Auth::id()) {
            return $this->handleError('An error has occured, please try later');
        }
        $input = $request->all();
        $validator = Validator::make($input,[
            'avatar'=>['image','mimes:jpeg,png,jpg']
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors());
        }
        $imageName=time().'.'.$request->image->getClientOriginalExtension();
        $request->image->move(public_path('uploads'),$imageName);
        $user->avatar = env('UPLOAD_PATH').$imageName;
        $user->save();
        return $this->handleResponse([],'Avatar updated with success');
    }

    public function follow() {
        $follow = User::find(Auth::id())->follow()->orderBy('name','asc')->get();
        return $this->handleResponse(UserResource::collection($follow),'Follow fetched with success');
    }
}
