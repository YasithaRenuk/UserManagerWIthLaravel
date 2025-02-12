<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin', function () {
    return 'Welcome, Admin!';
})->middleware('role:admin');

Route::get('/edit-post', function () {
    return 'Edit Post Page';
})->middleware('permission:edit-post');

// Admin route to manage user roles
Route::middleware(['role:admin'])->group(function () {
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users.index');
    Route::put('/admin/users/{user}/update-role', [UserController::class, 'updateRole'])->name('admin.users.update-role');
});

require __DIR__.'/auth.php';
