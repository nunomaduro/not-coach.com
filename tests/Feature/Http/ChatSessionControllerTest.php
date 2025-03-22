<?php

declare(strict_types=1);

use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

test('index creates chat session if none exists', function () {
    $user = User::factory()->create();

    expect(ChatSession::query()->count())->toBe(0);

    $this->actingAs($user)
        ->get(route('chat.index'))
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('chat/list')
            ->has('session')
        );

    $chatSession = ChatSession::query()->first();

    expect($chatSession)->not->toBeNull()
        ->and($chatSession->user_id)->toBe($user->id)
        ->and($chatSession->messages)->toHaveCount(1);
});

test('index re-uses existing session if exists', function () {
    $user = User::factory()->create();
    $chatSession = ChatSession::factory()->for($user)->create();
    ChatMessage::factory()->for($chatSession)->create();

    expect(ChatSession::query()->count())->toBe(1);

    $this->actingAs($user)
        ->get(route('chat.index'))
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('chat/list')
            ->has('session')
            ->where('session.id', $chatSession->id)
        );

    $chatSession = ChatSession::query()->first();

    expect($chatSession)->not->toBeNull()
        ->and($chatSession->user_id)->toBe($user->id)
        ->and($chatSession->messages)->toHaveCount(1);
});

test('store creates new chat session', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('chat.store'))
        ->assertRedirect();

    $chatSession = ChatSession::query()->first();

    expect($chatSession)->not->toBeNull()
        ->and($chatSession->user_id)->toBe($user->id)
        ->and($chatSession->messages)->toHaveCount(1);
});

test('unauthenticated users cannot access chat', function () {
    $this->get(route('chat.index'))
        ->assertRedirect(route('login'));

    $this->post(route('chat.store'))
        ->assertRedirect(route('login'));
});
