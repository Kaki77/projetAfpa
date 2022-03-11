<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentHasRepliesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comment_has_replies', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->index();
            $table->foreign('comment_id')->references('id')->on('comments')->onDelete('cascade');
            $table->unsignedBigInteger('reply_id')->index();
            $table->foreign('reply_id')->references('id')->on('replies')->onDelete('cascade');
            $table->primary(['comment_id', 'reply_id']);
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comment_has_replies');
    }
}
