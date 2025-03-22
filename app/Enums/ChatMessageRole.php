<?php

declare(strict_types=1);

namespace App\Enums;

enum ChatMessageRole: string
{
    case Assistant = 'assistant';
    case User = 'user';
    case System = 'system';
    // Add here the off
}
