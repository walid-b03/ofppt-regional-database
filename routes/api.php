<?php

use App\Http\Controllers\Api\{
    AuthController,
    RegionController,
    ComplexController,
    EstablishmentController,
    UserController,
    TrainingController,
    AssetController,
    RoomController,
};
use Illuminate\Support\Facades\Route;

/*
 * Public
 */
Route::post('auth/login', [AuthController::class, 'login'])->name('api.login');

/*
 * Private
 */
Route::middleware('auth:sanctum')->name('api.')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout'])->name('logout');

    // Identity
    Route::get('user', [AuthController::class, 'user'])->name('user');

    // Read-only
    Route::get('regions', [RegionController::class, 'index'])->name('regions.index');
    Route::get('regions/{region}', [RegionController::class, 'show'])->name('regions.show');

    Route::get('complexes', [ComplexController::class, 'index'])->name('complexes.index');
    Route::get('complexes/{complex}', [ComplexController::class, 'show'])->name('complexes.show');

    Route::get('establishments', [EstablishmentController::class, 'index'])->name('establishments.index');
    Route::get('establishments/{establishment}', [EstablishmentController::class, 'show'])->name('establishments.show');

    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');

    // Read + Write
    Route::get('trainings', [TrainingController::class, 'index'])->name('trainings.index');
    Route::get('trainings/{training}', [TrainingController::class, 'show'])->name('trainings.show');
    Route::post('trainings', [TrainingController::class, 'store'])->name('trainings.store');
    Route::put('trainings/{training}', [TrainingController::class, 'update'])->name('trainings.update');

    Route::get('assets', [AssetController::class, 'index'])->name('assets.index');
    Route::get('assets/{asset}', [AssetController::class, 'show'])->name('assets.show');
    Route::post('assets', [AssetController::class, 'store'])->name('assets.store');
    Route::put('assets/{asset}', [AssetController::class, 'update'])->name('assets.update');

    Route::get('rooms', [RoomController::class, 'index'])->name('rooms.index');
    Route::get('rooms/{room}', [RoomController::class, 'show'])->name('rooms.show');
    Route::post('rooms', [RoomController::class, 'store'])->name('rooms.store');
    Route::put('rooms/{room}', [RoomController::class, 'update'])->name('rooms.update');
});
