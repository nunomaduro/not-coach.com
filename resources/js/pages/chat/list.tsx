import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { ChatMessage, ChatSession } from '@/types/props';
import { useForm } from '@inertiajs/react';
import { MessageSquare, Send } from 'lucide-react';
import { FormEvent, useEffect, useRef } from 'react';

interface ChatPageProps {
    session: ChatSession;
}

export default function List({ session }: ChatPageProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const form = useForm({
        content: '',
    });

    useEffect(() => {
        scrollToBottom();
    }, [session.messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!form.data.content.trim() || form.processing) {
            return;
        }

        form.post(route('chat.messages.store'), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('content');
            },
        });
    };

    return (
        <AppHeaderLayout breadcrumbs={[{ title: 'Chat', href: route('chat.index') }]}>
            <div className="container mx-auto py-6">
                <Card className="mx-auto max-w-4xl shadow-sm">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="text-primary h-5 w-5" />
                            <CardTitle>Chat Assistant</CardTitle>
                        </div>
                        <Separator className="mt-2" />
                    </CardHeader>
                    <CardContent className="px-4 pt-0 pb-2">
                        <div className="max-h-[60vh] space-y-6 overflow-y-auto p-2">
                            {session.messages.length === 0 ? (
                                <div className="text-muted-foreground flex h-32 items-center justify-center">
                                    <p>No messages yet. Start a conversation!</p>
                                </div>
                            ) : (
                                session.messages.map((message: ChatMessage) => {
                                    // Skip system messages
                                    if (message.role === 'system') return null;

                                    return (
                                        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div
                                                className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                                                    message.role === 'user'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-secondary text-secondary-foreground'
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
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="flex w-full gap-2">
                                <Input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={form.data.content}
                                    onChange={(e) => form.setData('content', e.target.value)}
                                    disabled={form.processing}
                                    className="flex-1"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();

                                            if (form.data.content.trim() && !form.processing) {
                                                handleSubmit(e);
                                            }
                                        }
                                    }}
                                />
                                <Button type="submit" disabled={form.processing || !form.data.content.trim()}>
                                    <Send className="size-4" />
                                    <span className="sr-only">Send</span>
                                </Button>
                            </div>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </AppHeaderLayout>
    );
}
