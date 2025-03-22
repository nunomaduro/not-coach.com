import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage, ChatSession } from '@/types/props';
import { Head, useForm } from '@inertiajs/react';
import { MessageSquare, Plus, Send } from 'lucide-react';
import { FormEvent, useEffect, useRef } from 'react';

interface ChatPageProps {
    session: ChatSession;
}

export default function List({ session }: ChatPageProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const createSessionForm = useForm();

    const createMessageForm = useForm({
        content: '',
    });

    useEffect(() => {
        scrollToBottom();
    }, [session.messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCreateMessageFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!createMessageForm.data.content.trim() || createMessageForm.processing) {
            return;
        }

        createMessageForm.post(route('chat.messages.store'), {
            preserveScroll: true,
            onSuccess: () => {
                createMessageForm.reset('content');
            },
        });
    };

    const handleCreateSession = (e: FormEvent | null) => {
        e?.preventDefault();

        createSessionForm.post(route('chat.store'), {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            <Head title="Chat | AI Gym Coach">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            {/* Header */}
            <header className="border-b border-[#1E1E1E] bg-[#0A0A0A]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                            <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">AI Gym Coach</span>
                    </div>

                    <form onSubmit={handleCreateSession}>
                        <Button
                            onClick={handleCreateSession}
                            className="rounded-full bg-[#161616] px-4 py-2 text-sm font-medium text-white hover:bg-[#202020]"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            New Chat
                        </Button>
                    </form>
                </div>
            </header>

            <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Chat Container */}
                <div className="overflow-hidden rounded-xl border border-[#1E1E1E] bg-[#0F0F0F]">
                    {/* Chat Header */}
                    <div className="border-b border-[#1E1E1E] bg-[#0F0F0F] p-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1.5">
                                <MessageSquare className="h-4 w-4 text-white" />
                            </div>
                            <h2 className="text-lg font-semibold text-white">Fitness Assistant</h2>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="max-h-[calc(100vh-280px)] min-h-[400px] space-y-6 overflow-y-auto p-4">
                        {session.messages.length === 0 ? (
                            <div className="flex h-32 items-center justify-center">
                                <p className="text-gray-400">No messages yet. Start a conversation!</p>
                            </div>
                        ) : (
                            session.messages.map((message: ChatMessage) => {
                                // Skip system messages
                                if (message.role === 'system') return null;

                                return (
                                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[80%] rounded-lg p-4 shadow-sm ${
                                                message.role === 'user'
                                                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                                                    : 'border border-[#2E2E2E] bg-[#161616] text-white'
                                            }`}
                                        >
                                            <div className="whitespace-pre-wrap">{message.content}</div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="border-t border-[#1E1E1E] bg-[#0F0F0F] p-4">
                        <form onSubmit={handleCreateMessageFormSubmit} className="w-full">
                            <div className="flex w-full gap-2">
                                <Input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={createMessageForm.data.content}
                                    onChange={(e) => createMessageForm.setData('content', e.target.value)}
                                    disabled={createMessageForm.processing}
                                    className="flex-1 border-[#2E2E2E] bg-[#161616] text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();

                                            if (createMessageForm.data.content.trim() && !createMessageForm.processing) {
                                                handleCreateMessageFormSubmit(e);
                                            }
                                        }
                                    }}
                                />
                                <Button
                                    type="submit"
                                    disabled={createMessageForm.processing || !createMessageForm.data.content.trim()}
                                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                                >
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Send</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-gray-500">&copy; {new Date().getFullYear()} AI Gym Coach. All rights reserved.</div>
            </div>
        </div>
    );
}
