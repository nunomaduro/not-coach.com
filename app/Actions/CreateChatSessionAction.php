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
                    TODO
                EOT,
            ]);

            return $chatSession;
        });
    }
}
