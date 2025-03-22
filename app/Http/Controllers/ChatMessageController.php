<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\CreateChatMessageAction;
use App\Http\Requests\CreateChatMessageRequest;
use App\Queries\GetLatestSessionQuery;
use Illuminate\Http\RedirectResponse;

final class ChatMessageController
{
    /**
     * Create a new chat message.
     */
    public function store(
        CreateChatMessageRequest $request,
        GetLatestSessionQuery $query,
        CreateChatMessageAction $action
    ): RedirectResponse {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $chatSession = $query->get($user);

        $action->handle($chatSession, $request->string('content')->value());

        return back();
    }
}
