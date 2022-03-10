<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;
use App\Http\Resources\User as UserResource;
use App\Models\Post;
use App\Models\User;
use App\Models\Image;
use Validator;
use Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all()->orderBy('created_at','desc');
        return $this->handleResponse(PostResource::collection($posts),'Posts fetched with success');
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input,[
            'content'=>['required','max:255'],
            'image'=>['array'],
            'image.*'=>['image','mimes:jpeg,png,jpg'],
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors());
        }
        $post = new Post();
        $post->content = $request->content;
        $post->author()->associate(Auth::id());
        $post->save();
        if($request->image){
            foreach($request->image as $key=>$file) {
                $imageName=time().$key.'.'.$file->getClientOriginalExtension();
                $file->move(public_path('uploads'),$imageName);
                $image = new Image();
                $image->url = env('UPLOAD_PATH').$imageName;
                $image->save();
                $post->images()->attach($image);
            }
        }
        return $this->handleResponse($post,'Post posted with success');
    }

    public function show($id)
    {
        $post = Post::find($id);
        if(!$post) {
            return $this->handleError('Post not found');
        }
        return $this->handleResponse(new PostResource($post),'Post found');
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        $post = Post::find($id);
        if(!$post) {
            return $this->handleError('Post not found');
        }
        $post->delete();
        return $this->handleResponse([],'Post deleted with success');
    }

    public function newsFeed() {
        $follow = User::find(Auth::id())->follow()->get();
        $id_array = $follow->pluck('id');
        if(!$follow || count($follow) < 1) {
            return $this->handleResponse([],'No follow found');
        }
        $posts = Post::whereIn('user_id',$id_array)->orderBy('created_at','desc')->get();
        return $this->handleResponse(PostResource::collection($posts),'Posts fetched with success');
    }

    public function postLike($id) {
        $likers = Post::find($id)->likers();
        $like = $likers->where('user_id',Auth::id())->first();
        if(!$like) {
            $likers->attach(Auth::id());
            $data = json_encode(true);
            $message = 'Post has been liked successfuly';
        }
        else {
            $likers->detach(Auth::id());
            $data = json_encode(false);
            $message = 'Post has been unliked sucessfuly';
        }
        return $this->handleResponse($data,$message);
    }

}
