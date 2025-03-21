<?php

declare(strict_types=1);

use App\Models\User;
use Inertia\Testing\AssertableInertia;

test('unverified users are shown the verification page', function (): void {
    $user = User::factory()->unverified()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('verification.notice'));

    $response->assertInertia(
        fn (AssertableInertia $page) => $page
            ->component('auth/verify-email')
            ->has('status')
    );
});

test('verified users are redirected to dashboard', function (): void {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('verification.notice'));

    $response->assertRedirect(route('dashboard'));
});
