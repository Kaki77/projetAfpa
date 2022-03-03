<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;
use App\Models\Post;
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
        $posts = Post::all();
        return $this->handleResponse(PostResource::collection($posts),'Posts fetched with success');
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input,[
            'content'=>['required','max:255'],
            'image'=>['image','mimes:jpeg,png,jpg'],
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors());
        }
        $post = new Post();
        $post->content = $request->content;
        $post->author()->associate(Auth::id());
        $post->save();
        if($request->image){
            $imageName=time().'.'.$request->image->getClientOriginalExtension();
            $request->image->move(public_path('uploads'),$imageName);
            $image=new Image();
            $image->url = env('UPLOAD_PATH').$imageName;
            $image->save();
            $post->images()->attach($image);
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
}
