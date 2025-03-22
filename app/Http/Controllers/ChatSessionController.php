<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\CreateChatSessionAction;
use App\Http\Requests\CreateChatSessionRequest;
use App\Queries\GetLatestSessionQuery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class ChatSessionController
{
    /**
     * Display the chat interface with the latest session.
     */
    public function index(Request $request, CreateChatSessionAction $action, GetLatestSessionQuery $query): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        if ($user->chatSessions()->doesntExist()) {
            $action->handle($user);
        }

        $session = $query->get($user);

        return Inertia::render('chat/list', [
            'session' => $session,
        ]);
    }

    /**
     * Create a new chat session.
     */
    public function store(
        CreateChatSessionRequest $request,
        CreateChatSessionAction $action
    ): RedirectResponse {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $action->handle($user);

        return back();
    }
}
