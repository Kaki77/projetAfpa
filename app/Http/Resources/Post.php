<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Comment as CommentResource;

class Post extends JsonResource
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
            'content'=>$this->content,
            'author'=>$this->author,
            'images'=>$this->images,
            'likers'=>$this->likers,
            'sharers'=>$this->sharers,
            'comments'=>CommentResource::collection($this->comments),
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at
        ];
        
        if($this->sharer) {
            $array['sharer'] = $this->sharer;
        }
        if($this->share_date) {
            $array['share_date'] = $this->share_date;
        }

        return $array;
    }
}
