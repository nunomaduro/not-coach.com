<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Inertia\Testing\AssertableInertia;

test('reset password screen can be rendered with token and email', function (): void {
    $user = User::factory()->create();

    $token = Password::createToken($user);

    $response = $this->get(route('password.reset', ['token' => $token]));

    $response->assertInertia(
        fn (AssertableInertia $page) => $page
            ->component('auth/reset-password')
            ->has('token')
    );
});

test('password can be reset with valid token', function (): void {
    Event::fake();

    $user = User::factory()->create();

    $token = Password::createToken($user);

    $response = $this->post(route('password.store'), [
        'token' => $token,
        'email' => $user->email,
        'password' => 'NewPassword123',
        'password_confirmation' => 'NewPassword123',
    ]);

    Event::assertDispatched(PasswordReset::class);

    $response->assertRedirect(route('login'));
    $response->assertSessionHas('status');

    expect(Hash::check('NewPassword123', $user->fresh()->password))->toBeTrue();
});

test('password reset fails with invalid token', function (): void {
    Event::fake();

    $user = User::factory()->create();

    $response = $this->post(route('password.store'), [
        'token' => 'invalid-token',
        'email' => $user->email,
        'password' => 'NewPassword123',
        'password_confirmation' => 'NewPassword123',
    ]);

    Event::assertNotDispatched(PasswordReset::class);

    $response->assertSessionHasErrors('email');
});
