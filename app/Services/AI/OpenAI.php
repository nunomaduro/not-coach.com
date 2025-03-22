<?php

declare(strict_types=1);

namespace App\Services\AI;

use App\Contracts\Services\AI;
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
