<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('accounts', [AccountController::class, 'store'])->name('accounts.store');
});

require __DIR__.'/settings.php';
