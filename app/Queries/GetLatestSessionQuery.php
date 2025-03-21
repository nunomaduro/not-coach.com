<?php

declare(strict_types=1);

namespace App\Queries;

use App\Models\ChatSession;
use App\Models\User;

final readonly class GetLatestSessionQuery
{
    /**
     * Get the latest chat session for the user.
     */
    public function get(User $user): ?ChatSession
    {
        return ChatSession::query()
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->with('messages')
            ->first();
    }
}
