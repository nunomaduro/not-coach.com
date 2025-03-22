<?php

declare(strict_types=1);

use OpenAI\Responses\Chat\CreateResponse;
use OpenAI\Testing\ClientFake;

it('queries open ai', closure: function () {
    $client = new ClientFake([
        CreateResponse::fake([
            'choices' => [
                [
                    'text' => 'awesome!',
                ],
            ],
        ]),
    ]);

    $ai = new App\Services\AI\OpenAI($client);

    $response = $ai->chat([
        ['role' => 'User', 'content' => 'Hello'],
        ['role' => 'Assistant', 'content' => 'Hi'],
    ]);

    expect($response)->not()->toBeEmpty();
});
