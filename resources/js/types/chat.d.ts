import { User } from '.';

export interface ChatSession {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    messages: ChatMessage[];
}

export interface ChatMessage {
    id: number;
    chat_session_id: number;
    role: 'user' | 'assistant' | 'system';
    content: string;
    created_at: string;
    updated_at: string;
}
