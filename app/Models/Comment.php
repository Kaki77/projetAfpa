<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public function author() {
        return $this->belongsTo(User::class,'user_id');
    }

    public function replies() {
        return $this->belongsToMany(Reply::class,'comment_has_replies','comment_id','reply_id')->orderBy('created_at','desc')->as('replies');
    }

    public function images() {
        return $this->belongsToMany(Image::class,'comment_has_images','comment_id','image_id')->as('images');
    }

    public function likers() {
        return $this->belongsToMany(User::class,'comment_is_liked','comment_id','user_id')->orderBy('name','asc')->as('likers');
    }

    public function sharers() {
        return $this->belongsToMany(User::class,'comment_is_shared','comment_id','user_id')->orderBy('name','asc')->as('sharers');
    }
}
