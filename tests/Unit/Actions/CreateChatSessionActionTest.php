<?php

declare(strict_types=1);

use App\Actions\CreateChatSessionAction;
use App\Enums\ChatMessageRole;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\User;
use Illuminate\Support\Facades\DB;

test('it creates a chat session for a user', function (): void {
    // Arrange
    $user = User::factory()->create();
    $action = new CreateChatSessionAction();

    // Act
    $chatSession = $action->handle($user);

    // Assert
    expect($chatSession)->toBeInstanceOf(ChatSession::class)
        ->and($chatSession->user_id)->toBe($user->id)
        ->and($chatSession->exists)->toBeTrue();
});

test('it adds an initial system message to the chat session', function (): void {
    // Arrange
    $user = User::factory()->create();
    $action = new CreateChatSessionAction();

    // Act
    $chatSession = $action->handle($user);

    // Assert
    $systemMessage = ChatMessage::query()
        ->where('chat_session_id', $chatSession->id)
        ->where('role', ChatMessageRole::System)
        ->first();

    expect($systemMessage)->not->toBeNull()
        ->and($systemMessage->content)->not->toBeEmpty();
});

test('it uses a database transaction', function (): void {
    // Arrange
    $user = User::factory()->create();
    $action = new CreateChatSessionAction();

    // Expect
    DB::shouldReceive('transaction')
        ->once()
        ->andReturnUsing(function ($callback) {
            return $callback();
        });

    // Act
    $action->handle($user);
});
