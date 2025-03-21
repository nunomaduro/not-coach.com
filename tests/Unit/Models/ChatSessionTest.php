<?php

declare(strict_types=1);

use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\User;

test('to array', function () {
    $chatSession = ChatSession::factory()->create()->refresh();

    expect(array_keys($chatSession->toArray()))
        ->toBe([
            'id',
            'user_id',
            'created_at',
            'updated_at',
        ]);
});

test('chat session belongs to a user', function (): void {
    $chatSession = ChatSession::factory()->create();

    expect($chatSession->user)->toBeInstanceOf(User::class);
});

test('chat session can have many messages', function (): void {
    $chatSession = ChatSession::factory()->create();
    $messages = ChatMessage::factory()
        ->count(3)
        ->for($chatSession)
        ->create();

    expect($chatSession->messages)->toHaveCount(3)
        ->and($chatSession->messages->first())->toBeInstanceOf(ChatMessage::class);
});
