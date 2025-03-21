<?php

declare(strict_types=1);

use App\Actions\CreateChatMessageAction;
use App\Enums\ChatMessageRole;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use Illuminate\Support\Facades\DB;

test('it creates a user message and assistant response', function (): void {
    // Arrange
    $chatSession = ChatSession::factory()->create();
    $action = new CreateChatMessageAction();
    $messageContent = 'Can you recommend a workout plan?';

    // Act
    $action->handle($chatSession, $messageContent);

    // Assert
    $messages = ChatMessage::query()
        ->where('chat_session_id', $chatSession->id)
        ->orderBy('created_at')
        ->get();

    expect($messages)->toHaveCount(2)
        ->and($messages[0]->role)->toBe(ChatMessageRole::User)
        ->and($messages[0]->content)->toBe($messageContent)
        ->and($messages[1]->role)->toBe(ChatMessageRole::Assistant)
        ->and($messages[1]->content)->not->toBeEmpty();
});

test('it uses a database transaction', function (): void {
    // Arrange
    $chatSession = ChatSession::factory()->create();
    $action = new CreateChatMessageAction();

    // Expect
    DB::shouldReceive('transaction')
        ->once()
        ->andReturnUsing(function ($callback) {
            return $callback();
        });

    // Act
    $action->handle($chatSession, 'Hello');
});
