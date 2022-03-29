<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;
use App\Http\Resources\User as UserResource;
use App\Models\Post;
use App\Models\User;
use App\Models\Image;
use App\Models\Comment;
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
            return $this->handleError('Post not found',[],('404'));
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
            return $this->handleError('Post not found',[],'404');
        }
        $post->delete();
        return $this->handleResponse([],'Post deleted with success');
    }

    public function newsFeed() {
        $follow = User::find(Auth::id())->follow()->get();
        if(!$follow || count($follow) < 1) {
            return $this->handleResponse([],'No follow found');
        }
        $id_array = $follow->pluck('id');
        $posts = Post::whereIn('user_id',$id_array)->orderBy('created_at','desc')->get();
        foreach($posts as $post) {
            $post->sharer = $post->author;
            $post->share_date = $post->created_at;
        }
        $shared_posts = User::with('sharedPost')->whereIn('id',$id_array)->orderBy('created_at','desc')->get()->pluck('sharedPost','id');
        $share_collection = collect();
        foreach($shared_posts as $key=>$shared_post) {
            foreach($shared_post as $post) {
                $sharer = User::find($key);
                $post->sharer = $sharer;
                $post->share_date = $post->sharedPost->created_at;
                $share_collection->push($post);
            }
        }
        $complete_collection = $posts->concat($share_collection)->sortByDesc('share_date');
        $posts_array = PostResource::collection($complete_collection);
        return $this->handleResponse($posts_array,'Posts fetched with success');
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

    public function postShare($id) {
        $post = Post::find($id);
        if(User::find(Auth::id())->follow()->where('user_id',$post->author->id)) {
            return $this->handleError('You need to follow this user to share his post',[],'401');
        }
        $sharers = $post->sharers();
        $share = $sharers->where('user_id',Auth::id())->first();
        if(!$share) {
            $sharers->attach(Auth::id());
            $data = json_encode(true);
            $message = 'Post has been shared successfuly';
        }
        else {
            $sharers->detach(Auth::id());
            $data = json_encode(false);
            $message = 'Post has been unshared successfuly';
        }
        return $this->handleResponse($data,$message);
    } 

    public function comment(Request $request,$id) {
        $input = $request->all();
        $validator = Validator::make($input,[
            'content'=>['required','max:255'],
            'image'=>['array'],
            'image.*'=>['image','mimes:jpeg,png,jpg'],
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors());
        }
        $comment = new Comment();
        $comment->content = $request->content;
        $comment->author()->associate(Auth::id());
        $comment->save();
        if($request->image){
            foreach($request->image as $key=>$file) {
                $imageName=time().$key.'.'.$file->getClientOriginalExtension();
                $file->move(public_path('uploads'),$imageName);
                $image = new Image();
                $image->url = env('UPLOAD_PATH').$imageName;
                $image->save();
                $comment->images()->attach($image);
            }
        }
        $post = Post::find($id);
        $post->comments()->attach($comment);
        return $this->handleResponse($comment,'Comment has been posted with success');
    }
}
