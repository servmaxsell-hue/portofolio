<?php

use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;

// Public API Routes
Route::prefix('v1')->group(function () {
    // Projects
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/featured', [ProjectController::class, 'featured']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);

    // Articles
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::get('/articles/latest', [ArticleController::class, 'latest']);
    Route::get('/articles/{slug}', [ArticleController::class, 'show']);
    Route::post('/articles', [ArticleController::class, 'store'])->middleware(\App\Http\Middleware\CheckApiKey::class);

    // Services
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{slug}', [ServiceController::class, 'show']);

    // Contact
    Route::post('/contact', [ContactController::class, 'store']);
});
