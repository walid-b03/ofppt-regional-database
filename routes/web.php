<?php

use App\Http\Controllers\Web\{
    AuthController,
    ProfileController,
    RegionController,
    ComplexController,
    EstablishmentController,
    UserController,
    TrainingController,
    AssetController,
    RoomController,
};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
 * Public
 */
Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1')->name('login');

/*
 * Private (All authenticated users)
 */
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');

    Route::resource('regions', RegionController::class);
    Route::resource('complexes', ComplexController::class);
    Route::resource('establishments', EstablishmentController::class);

    Route::resource('users', UserController::class);
    Route::put('users/{user}/password', [UserController::class, 'updatePassword'])->name('users.password');

    Route::resource('trainings', TrainingController::class);
    Route::resource('assets', AssetController::class);
    Route::resource('rooms', RoomController::class);
});

