<?php

declare(strict_types=1);

namespace App\Http\Controllers\Chat;

use App\Actions\CreateChatMessageAction;
use App\Http\Requests\Chat\CreateChatMessageRequest;
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
        $chatSession = $query->get($request->user());

        $action->handle($chatSession, $request->validated('content'));

        return back();
    }
}
