<?php

declare(strict_types=1);

use App\Contracts\Services\AI;
use App\Enums\ChatMessageRole;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\User;

test('store creates new chat message', function () {
    $user = User::factory()->create();
    $chatSession = ChatSession::factory()->for($user)->create();

    app(AI::class)
        ->shouldReceive('chat')
        ->once();

    $this->actingAs($user)
        ->fromRoute('chat.index')
        ->post(route('chat.messages.store'), [
            'content' => 'Test message',
        ])
        ->assertRedirectToRoute('chat.index');

    expect($chatSession->messages()->count())->toBe(2);

    $message = $chatSession->messages()->first();

    expect($message->role)->toBe(ChatMessageRole::User)
        ->and($message->content)->toBe('Test message');
});

test('store validates message content', function () {
    $user = User::factory()->create();
    ChatSession::factory()->for($user)->create();

    $this->actingAs($user)
        ->post(route('chat.messages.store'), [
            'content' => '',
        ])
        ->assertSessionHasErrors([
            'content' => 'The content field is required.',
        ]);

    expect(ChatMessage::query()->count())->toBe(0);
});

test('unauthenticated users cannot create messages', function () {
    $this->post(route('chat.messages.store'), [
        'content' => 'Test message',
    ])->assertRedirect(route('login'));

    expect(ChatMessage::query()->count())->toBe(0);
});
