<?php

declare(strict_types=1);

namespace App\Actions;

use App\Contracts\Services\AI;
use App\Enums\ChatMessageRole;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\User;
use Illuminate\Support\Facades\DB;

final readonly class CreateChatMessageAction
{
    public function __construct(private AI $ai)
    {
        //
    }

    /**
     * Add a new user message to the chat session and generate an AI response.
     */
    public function handle(ChatSession $chatSession, string $content): void
    {
        DB::transaction(function () use ($chatSession, $content): void {
            $message = $chatSession->messages()->create([
                'role' => ChatMessageRole::User,
                'content' => $content,
                'on_topic' => $this->ai->isOnTopic($content),
            ]);

            if ($message->on_topic === false) {
                $chatSession->messages()->create([
                    'role' => ChatMessageRole::Assistant,
                    'content' => 'This is not the place to discuss this.',
                    'on_topic' => false,
                ]);

                return;
            }

            $response = $this->generateAIResponse($chatSession);

            $chatSession->messages()->create([
                'role' => ChatMessageRole::Assistant,
                'content' => $response,
                'on_topic' => true,
            ]);
        });
    }

    /**
     * Generate an AI response based on the conversation history.
     */
    private function generateAIResponse(ChatSession $chatSession): string
    {
        /** @var array<int, array{role: string, content: string}> $messages */
        $messages = $chatSession->messages()
            ->where('on_topic', true)
            ->orderBy('created_at')
            ->get()
            ->map(fn (ChatMessage $message): array => [
                'role' => $message->role->value,
                'content' => $message->content,
            ])
            ->toArray();

        return $this->ai->chat($messages);
    }
}
