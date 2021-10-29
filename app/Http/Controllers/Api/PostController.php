<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $sortField = request('sort_field', 'created_at');
        if(!in_array($sortField, ['id', 'title', 'text', 'created_at', 'updated_at'])) {
            $sortField = 'created_at';
        }

        $sortOrder = request('sort_order', 'desc');
        if(!in_array($sortOrder, ['asc', 'desc'])) {
            $sortOrder = 'desc';
        }

        $posts = Post::when(request('category_id', '') != '', function($query) {
            $query->where('category_id', request('category_id'));
        })->orderBy($sortField, $sortOrder)->paginate(5);

        return PostResource::collection($posts);
    }

    public function store(PostRequest $postRequest) {
        $post = Post::create($postRequest->validated());
        
        return new PostResource($post);
    }
}
