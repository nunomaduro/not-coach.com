<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\ChatMessageRole;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ChatMessage>
 */
final class ChatMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'chat_session_id' => ChatSession::factory(),
            'role' => fake()->randomElement([ChatMessageRole::User, ChatMessageRole::Assistant]),
            'content' => fake()->paragraph(),
            'created_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'updated_at' => fn (array $attributes) => $attributes['created_at'],
        ];
    }

    /**
     * Indicate that the message is from the user.
     */
    public function fromUser(): self
    {
        return $this->state(fn (array $attributes): array => [
            'role' => ChatMessageRole::User,
        ]);
    }

    /**
     * Indicate that the message is from the assistant.
     */
    public function fromAssistant(): self
    {
        return $this->state(fn (array $attributes): array => [
            'role' => ChatMessageRole::Assistant,
        ]);
    }
}
