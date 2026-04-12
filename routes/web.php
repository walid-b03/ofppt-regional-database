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
Route::post('login', [AuthController::class, 'login'])->name('login');

/*
 * Private
 */
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
});

// Admin
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('regions', RegionController::class);
    Route::resource('complexes', ComplexController::class);
    Route::resource('establishments', EstablishmentController::class);
    Route::resource('users', UserController::class);
    Route::resource('trainings', TrainingController::class);
    Route::resource('assets', AssetController::class);
    Route::resource('rooms', RoomController::class);
});

// DRRG
Route::middleware(['auth:sanctum', 'role:DRRG'])->prefix('drrg')->name('drrg.')->group(function () {
    Route::get('region', [RegionController::class, 'show'])->name('region.show');
    Route::put('region', [RegionController::class, 'update'])->name('region.update');

    Route::resource('complexes', ComplexController::class);
    Route::resource('establishments', EstablishmentController::class);
    Route::resource('users', UserController::class);
    Route::resource('trainings', TrainingController::class);
    Route::resource('assets', AssetController::class);
    Route::resource('rooms', RoomController::class);
});

// DRCX
Route::middleware(['auth:sanctum', 'role:DRCX'])->prefix('drcx')->name('drcx.')->group(function () {
    Route::get('complex', [ComplexController::class, 'show'])->name('complex.show');
    Route::put('complex', [ComplexController::class, 'update'])->name('complex.update');

    Route::resource('establishments', EstablishmentController::class);
    Route::resource('users', UserController::class);
    Route::resource('trainings', TrainingController::class);
    Route::resource('assets', AssetController::class);
    Route::resource('rooms', RoomController::class);
});

// DRPD
Route::middleware(['auth:sanctum', 'role:DRPD'])->prefix('drpd')->name('drpd.')->group(function () {
    Route::get('establishment', [EstablishmentController::class, 'show'])->name('establishment.show');
    Route::put('establishment', [EstablishmentController::class, 'update'])->name('establishment.update');

    Route::resource('users', UserController::class);
    Route::resource('trainings', TrainingController::class);
    Route::resource('assets', AssetController::class);
    Route::resource('rooms', RoomController::class);
});

// AGAD
Route::middleware(['auth:sanctum', 'role:AGAD'])->prefix('agad')->name('agad.')->group(function () {
    Route::resource('trainings', TrainingController::class);
    Route::resource('assets', AssetController::class);
    Route::resource('rooms', RoomController::class);
});
