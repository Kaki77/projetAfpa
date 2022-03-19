<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Post as PostResource;
use Auth;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $array = [
            'id'=>$this->id,
            'name'=>$this->name,
            'description'=>$this->description,
            'avatar'=>$this->avatar,
            'followers'=>$this->followers,
            'follow'=>$this->follow,
            'sharedPosts'=>PostResource::collection($this->sharedPost),
            'posts'=>PostResource::collection($this->posts),
            'user_is_following'=>$this->followers->find(Auth::id()) ? json_encode(true) : json_encode(false),
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at
        ];
        if(count($this->posts) > 0 && $this->posts[0]->share_date){
            $posts = $this->posts->concat($this->sharedPost)->sortByDesc('share_date');
            $array['profileFeed'] = PostResource::collection($posts);
        }
        return $array;
    }
}
