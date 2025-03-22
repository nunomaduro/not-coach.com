import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { ChatMessage, ChatSession } from '@/types/chat';
import { useForm } from '@inertiajs/react';
import { MessageSquare, Send } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

interface ChatPageProps {
    session: ChatSession;
}

export default function Chat({ session }: ChatPageProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        content: '',
    });

    // Scroll to bottom when component mounts or messages change
    useEffect(() => {
        scrollToBottom();
    }, [session.messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (!data.content.trim() || processing || isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        
        post(route('chat.messages.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('content');
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <AppHeaderLayout breadcrumbs={[{ title: 'Chat', href: route('chat.index') }]}>
            <div className="container mx-auto py-6">
                <Card className="mx-auto max-w-4xl shadow-sm">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            <CardTitle>Chat Assistant</CardTitle>
                        </div>
                        <Separator className="mt-2" />
                    </CardHeader>
                    <CardContent className="px-4 pt-0 pb-2">
                        <div className="space-y-6 max-h-[60vh] overflow-y-auto p-2">
                            {session.messages.length === 0 ? (
                                <div className="flex items-center justify-center h-32 text-muted-foreground">
                                    <p>No messages yet. Start a conversation!</p>
                                </div>
                            ) : (
                                session.messages.map((message: ChatMessage) => {
                                    // Skip system messages
                                    if (message.role === 'system') return null;
                                    
                                    return (
                                        <div 
                                            key={message.id} 
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
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
                            <div className="flex gap-2 w-full">
                                <Input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    disabled={processing || isSubmitting}
                                    className="flex-1"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            if (data.content.trim() && !processing && !isSubmitting) {
                                                handleSubmit(e);
                                            }
                                        }
                                    }}
                                />
                                <Button 
                                    type="submit" 
                                    disabled={processing || isSubmitting || !data.content.trim()}
                                >
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
