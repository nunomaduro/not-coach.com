<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Notification;

test('verification notification is sent', function (): void {
    Notification::fake();

    $user = User::factory()->unverified()->create();

    $response = $this
        ->actingAs($user)
        ->post(route('verification.send'));

    $response->assertRedirect();
    $response->assertSessionHas('status', 'verification-link-sent');

    Notification::assertSentTo($user, VerifyEmail::class);
});

test('verification notification is not sent to verified users', function (): void {
    Notification::fake();

    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post(route('verification.send'));

    $response->assertRedirect(route('dashboard'));

    Notification::assertNotSentTo($user, VerifyEmail::class);
});
