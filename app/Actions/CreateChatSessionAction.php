<?php

declare(strict_types=1);

namespace App\Actions;

use App\Enums\ChatMessageRole;
use App\Models\ChatSession;
use App\Models\User;
use Illuminate\Support\Facades\DB;

final readonly class CreateChatSessionAction
{
    /**
     * Create a new chat session for the user with an initial system message.
     */
    public function handle(User $user): ChatSession
    {
        return DB::transaction(function () use ($user) {
            $chatSession = $user->chatSessions()->create();

            $chatSession->messages()->create([
                'role' => ChatMessageRole::System,
                'content' => <<<'EOT'
                    You are a certified gym coach and nutritionist. A new client is coming to your gym for the first time. Your job is to gather all relevant information and then recommend a personalized workout and nutrition plan.

                    Start by asking the user the following:

                    1. Age
                    2. Gender
                    3. Height and weight
                    4. Fitness goals (e.g., fat loss, muscle gain, endurance, general health)
                    5. Any medical conditions or injuries
                    6. Experience level with the gym (beginner, intermediate, advanced)
                    7. Days per week they are available to train
                    8. Preferred training times (morning, afternoon, evening)
                    9. Dietary restrictions or preferences (e.g., vegetarian, allergies, etc.)
                    10. Current eating habits (meals per day, snacking, water intake, etc.)

                    Be friendly, professional, and detailed. Once all answers are collected, explain the recommended workout split, types of exercises, and a simple meal plan. Make sure everything aligns with the user's schedule, goals, and health conditions.


                EOT,
                'on_topic' => true,
            ]);

            return $chatSession;
        });
    }
}
