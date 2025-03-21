<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\ChatSession;
use Illuminate\Support\Facades\DB;

final class DeleteChatSessionAction
{
    /**
     * Delete a chat session and all its messages.
     */
    public function handle(ChatSession $chatSession): void
    {
        DB::transaction(function () use ($chatSession): void {
            $chatSession->messages()->delete();

            $chatSession->delete();
        });
    }
}
