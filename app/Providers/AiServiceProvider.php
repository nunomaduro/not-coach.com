<?php

declare(strict_types=1);

namespace App\Providers;

use App\Contracts\Services\AI;
use App\Services\AI\OpenAI;
use Illuminate\Support\ServiceProvider;
use OpenAI as OpenAIClientFactory;

/**
 * @codeCoverageIgnore
 */
final class AiServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     */
    public function register(): void
    {
        $this->app->scoped(AI::class, function (): OpenAI {
            $client = OpenAIClientFactory::client(config()->string('services.openai.key'));

            return new OpenAI($client);
        });
    }
}
