<?php

declare(strict_types=1);

use App\Enums\ChatMessageRole;
use App\Models\ChatMessage;
use App\Models\ChatSession;

test('to array', function () {
    $chatMessage = ChatMessage::factory()->create()->refresh();

    expect(array_keys($chatMessage->toArray()))
        ->toBe([
            'id',
            'chat_session_id',
            'role',
            'content',
            'created_at',
            'updated_at',
        ]);
});

test('chat message belongs to a chat session', function (): void {
    $chatMessage = ChatMessage::factory()->create();

    expect($chatMessage->chatSession)->toBeInstanceOf(ChatSession::class);
});

test('chat message can be created with user role', function (): void {
    $chatMessage = ChatMessage::factory()->fromUser()->create();

    expect($chatMessage->role)->toBe(ChatMessageRole::User);
});
