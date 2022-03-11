<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Post as PostResource;

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
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'description'=>$this->description,
            'followers'=>$this->followers,
            'follow'=>$this->follow,
            'posts'=>PostResource::collection($this->posts->merge($this->sharedPost)),
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at
        ];
    }
}
