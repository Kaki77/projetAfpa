<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Reply as ReplyResource;

class Comment extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'content'=>$this->content,
            'author'=>$this->author,
            'images'=>$this->images,
            'likers'=>$this->likers,
            'sharers'=>$this->sharers,
            'replies'=>ReplyResource::collection($this->replies),
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at
        ];
    }
}