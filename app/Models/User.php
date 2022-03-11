<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Post;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'description',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function followers() {
        return $this->belongsToMany(User::class,'follows','followed_id','follower_id')->orderBy('name','asc')->as('followers');
    }

    public function follow() {
        return $this->belongsToMany(User::class,'follows','follower_id','followed_id')->orderBy('name','asc')->as('follow');
    }

    public function posts() {
        return $this->hasMany(Post::class,'user_id')->orderBy('created_at','desc');
    }

    public function sharedPost() {
        return $this->belongsToMany(Post::class,'post_is_shared','user_id','post_id')->orderBy('created_at','desc')->as('sharedPost');
    }
}
