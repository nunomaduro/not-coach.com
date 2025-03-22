<?php

declare(strict_types=1);

use App\Actions\CreateChatMessageAction;
use App\Contracts\Services\AI;
use App\Enums\ChatMessageRole;
use App\Models\ChatMessage;
use App\Models\ChatSession;

test('it creates a user message and assistant response', function (): void {
    $chatSession = ChatSession::factory()->create();
    $action = app(CreateChatMessageAction::class);
    $messageContent = 'Can you recommend a workout plan?';

    app(AI::class)->shouldReceive('chat')->once()
        ->andReturn('Sure! Here is a workout plan for you.');

    $action->handle($chatSession, $messageContent);

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
