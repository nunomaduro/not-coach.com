<?php

declare(strict_types=1);

use App\Models\ChatSession;
use App\Models\User;

test('to array', function () {
    $user = User::factory()->create()->refresh();

    expect(array_keys($user->toArray()))
        ->toBe([
            'id',
            'name',
            'email',
            'email_verified_at',
            'created_at',
            'updated_at',
        ]);
});

test('user can have many chat sessions', function (): void {
    $user = User::factory()->create();

    ChatSession::factory()
        ->count(3)
        ->for($user)
        ->create();

    expect($user->chatSessions)->toHaveCount(3)
        ->and($user->chatSessions->first())->toBeInstanceOf(ChatSession::class);
});
