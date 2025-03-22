<?php

declare(strict_types=1);

namespace App\Services\AI;

use App\Contracts\Services\AI;
use App\Enums\ChatMessageRole;
use OpenAI\Contracts\ClientContract;

final readonly class OpenAI implements AI
{
    /**
     * Create a new instance.
     */
    public function __construct(private ClientContract $client)
    {
        //
    }

    /**
     * Checks if the given message does not make the AI agent off-topic.
     */
    public function isOnTopic(string $message): bool
    {
        $result = $this->client->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => ChatMessageRole::System, 'content' => <<<'EOT'
                        You are a validation agent. Your job is to determine if a user message would make the assistant go off-topic based on the original system instruction.

                        The original assistant is a certified gym coach and nutritionist helping new clients get started. They ask for user info like age, availability, fitness goals, health status, etc., to create a gym and meal plan.

                        Given a user prompt, return one of the following strings exactly:

                        - "on_topic" — if the message is relevant to fitness, nutrition, gym training, or user health info.
                        - "off_topic" — if the message goes outside the assistant’s role, such as tech support, entertainment, unrelated advice, jokes, or general conversation.

                        Only return the exact string. Do not explain. Do not include punctuation or formatting.

                        Please only flag messages that are clearly off-topic. If the message is ambiguous, assume it is on-topic.

                        E.g: if the user says "hello" or "how are you", the response should be "on_topic".
                    EOT,
                ], [
                    'role' => ChatMessageRole::User, 'content' => $message,
                ],
            ],
        ]);

        return match ($result->choices[0]->message->content) {
            'on_topic' => true,
            default => false,
        };
    }

    /**
     * Generate a chat response based on the conversation history.
     *
     * @param  array<int, array{role: string, content: string}>  $messages
     */
    public function chat(array $messages): string
    {
        $result = $this->client->chat()->create([
            'model' => 'gpt-4o',
            'messages' => $messages,
        ]);

        return (string) $result->choices[0]->message->content;
    }
}
