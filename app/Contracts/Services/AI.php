<?php

declare(strict_types=1);

namespace App\Contracts\Services;

interface AI
{
    /**
     * Check if the content is on topic.
     */
    public function isOnTopic(string $content): bool;

    /**
     * Generate a chat response based on the conversation history.
     *
     * @param  array<int, array{role: string, content: string}>  $messages
     */
    public function chat(array $messages): string;
}
