<?php

declare(strict_types=1);

use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\User;
use App\Queries\GetLatestSessionQuery;

test('it returns the latest chat session for a user with messages', function (): void {
    // Arrange
    $user = User::factory()->create();

    // Create older session
    $olderSession = ChatSession::factory()->for($user)->create([
        'created_at' => now()->subDays(2),
        'updated_at' => now()->subDays(2),
    ]);

    ChatMessage::factory()
        ->count(2)
        ->for($olderSession)
        ->create();

    // Create newest session
    $newestSession = ChatSession::factory()->for($user)->create([
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    ChatMessage::factory()
        ->count(3)
        ->for($newestSession)
        ->create();

    // Create a session for another user (should not be returned)
    $otherUser = User::factory()->create();
    $otherSession = ChatSession::factory()->for($otherUser)->create();

    // Act
    $query = new GetLatestSessionQuery();
    $result = $query->get($user);

    // Assert
    expect($result->id)->toBe($newestSession->id)
        ->and($result->messages)->toHaveCount(3);
});

test('it returns null when user has no chat sessions', function (): void {
    // Arrange
    $user = User::factory()->create();

    // Act
    $query = new GetLatestSessionQuery();
    $result = $query->get($user);

    // Assert
    expect($result)->toBeNull();
});
