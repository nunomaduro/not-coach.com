<?php

declare(strict_types=1);

namespace App\Actions;

use App\Enums\ChatMessageRole;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\User;
use Illuminate\Support\Facades\DB;

final class CreateChatMessageAction
{
    /**
     * Add a new user message to the chat session and generate an AI response.
     */
    public function handle(ChatSession $chatSession, string $content): void
    {
        DB::transaction(function () use ($chatSession, $content): void {
            $chatSession->messages()->create([
                'role' => ChatMessageRole::User,
                'content' => $content,
            ]);

            $response = $this->generateAIResponse($chatSession);

            $chatSession->messages()->create([
                'role' => ChatMessageRole::Assistant,
                'content' => $response,
            ]);
        });
    }

    /**
     * Generate an AI response based on the conversation history.
     */
    private function generateAIResponse(ChatSession $chatSession): string
    {
        $chatSession->messages()
            ->orderBy('created_at')
            ->get()
            ->map(fn (ChatMessage $message): array => [
                'role' => $message->role->value,
                'content' => $message->content,
            ])
            ->toArray();

        $simulatedResponses = [
            'Based on your fitness level, I recommend starting with 3 days of strength training and 2 days of cardio per week.',
            'Remember to stay hydrated during your workouts! Aim for at least 16-20 oz of water before exercise.',
            'For your goals, focus on compound exercises like squats, deadlifts, and bench press to maximize muscle growth.',
            'Don\'t forget that proper nutrition is just as important as your workout routine!',
            'Make sure you\'re getting enough protein to support muscle recovery. Aim for 1.6-2.2g per kg of bodyweight.',
        ];

        // Use a deterministic approach based on the current timestamp

        $index = time() % count($simulatedResponses);

        return $simulatedResponses[$index];
    }
}
