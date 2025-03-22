<?php

declare(strict_types=1);

use App\Http\Controllers\Chat\ChatMessageController;
use App\Http\Controllers\Chat\ChatSessionController;
use Illuminate\Support\Facades\Route;

Route::prefix('chat')->middleware(['auth', 'verified'])->group(function (): void {
    Route::get('/', [ChatSessionController::class, 'index'])->name('chat.index');
    Route::post('/', [ChatSessionController::class, 'store'])->name('chat.store');

    // Chat messages
    Route::post('/messages', [ChatMessageController::class, 'store'])->name('chat.messages.store');
});
