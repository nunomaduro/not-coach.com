<?php

declare(strict_types=1);

use App\Actions\DeleteChatSessionAction;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use Illuminate\Support\Facades\DB;

test('it deletes a chat session and its messages', function (): void {
    // Arrange
    $chatSession = ChatSession::factory()->create();

    // Create some messages for the session
    ChatMessage::factory()
        ->count(3)
        ->for($chatSession)
        ->create();

    $action = new DeleteChatSessionAction();

    // Act
    $action->handle($chatSession);

    // Assert
    expect(ChatSession::query()->find($chatSession->id))->toBeNull();

    $messages = ChatMessage::query()
        ->where('chat_session_id', $chatSession->id)
        ->get();

    expect($messages)->toHaveCount(0);
});

test('it uses a database transaction', function (): void {
    // Arrange
    $chatSession = ChatSession::factory()->create();
    $action = new DeleteChatSessionAction();

    // Expect
    DB::shouldReceive('transaction')
        ->once()
        ->andReturnUsing(function ($callback) {
            return $callback();
        });

    // Act
    $action->handle($chatSession);
});
