<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public function comments() {
        return $this->belongsToMany(Comments::class,'post_has_comments','post_id','comment_id')->as('comments');
    }

    public function images() {
        return $this->belongsToMany(Images::class,'post_has_images','post_id','image_id')->as('images');
    }

    public function likers() {
        return $this->belongsToMany(User::class,'post_is_liked','post_id','user_id')->as('likers');
    }

    public function sharers() {
        return $this->belongsToMany(User::class,'post_is_shared','post_id','user_id')->as('sharers');
    }

    
}
