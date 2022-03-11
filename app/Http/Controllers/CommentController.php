<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Reply;
use Auth;
use Validator;

class CommentController extends Controller
{
    public function commentLike($id) {
        $likers = Comment::find($id)->likers();
        $like = $likers->where('user_id',Auth::id())->first();
        if(!$like) {
            $likers->attach(Auth::id());
            $data = json_encode(true);
            $message = 'Comment has been liked successfuly';
        }
        else {
            $likers->detach(Auth::id());
            $data = json_encode(false);
            $message = 'Comment has been unliked sucessfuly';
        }
        return $this->handleResponse($data,$message);
    }

    public function reply(Request $request,$id) {
        $input = $request->all();
        $validator = Validator::make($input,[
            'content'=>['required','max:255'],
            'image'=>['array'],
            'image.*'=>['image','mimes:jpeg,png,jpg'],
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors());
        }
        $reply = new Reply();
        $reply->content = $request->content;
        $reply->author()->associate(Auth::id());
        $reply->save();
        $comment = Comment::find($id);
        $comment->replies()->attach($reply);
        return $this->handleResponse($reply,'Reply has been posted with success');
    }
}
