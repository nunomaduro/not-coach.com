<?php

declare(strict_types=1);

use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

beforeEach(function (): void {
    RateLimiter::clear('test-email|127.0.0.1');
});

test('login request validates required fields', function (): void {
    $request = new LoginRequest();

    expect($request->rules())->toHaveKeys(['email', 'password']);
    expect($request->authorize())->toBeTrue();
});

test('authenticate method logs in user with valid credentials', function (): void {
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => bcrypt('password'),
    ]);

    $request = new LoginRequest();
    $request->merge([
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    $request->authenticate();

    expect(Auth::check())->toBeTrue();
    expect(Auth::user()->id)->toBe($user->id);
});

test('authenticate method throws exception with invalid credentials', function (): void {
    User::factory()->create([
        'email' => 'test@example.com',
        'password' => bcrypt('password'),
    ]);

    $request = new LoginRequest();
    $request->merge([
        'email' => 'test@example.com',
        'password' => 'wrong-password',
    ]);

    try {
        $request->authenticate();
        $this->fail('ValidationException was not thrown');
    } catch (ValidationException $e) {
        expect($e->errors())->toHaveKey('email');
    }
});

test('rate limiter blocks after too many attempts', function (): void {
    Event::fake();

    $email = 'test-email';
    $ip = '127.0.0.1';
    $throttleKey = Str::transliterate(Str::lower($email).'|'.$ip);

    // Simulate hitting rate limit
    for ($i = 0; $i < 5; $i++) {
        RateLimiter::hit($throttleKey);
    }

    $request = new LoginRequest();
    $request->merge(['email' => $email]);
    $request->setMethod('POST');
    $request->server->set('REMOTE_ADDR', $ip);

    try {
        $request->ensureIsNotRateLimited();
        $this->fail('ValidationException was not thrown');
    } catch (ValidationException $e) {
        expect($e->errors())->toHaveKey('email');
        Event::assertDispatched(Lockout::class);
    }
});

test('throttle key is generated correctly', function (): void {
    $request = new LoginRequest();
    $request->merge([
        'email' => 'test@example.com',
    ]);

    $request->setMethod('POST');
    $request->server->set('REMOTE_ADDR', '127.0.0.1');

    $key = $request->throttleKey();

    expect($key)->toContain('test@example.com');
    expect($key)->toContain('127.0.0.1');
});
