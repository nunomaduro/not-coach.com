import { Head, Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-md">
                    {/* Logo and Title */}
                    <div className="mb-8 flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1">
                                <span className="text-xl font-bold text-white">AI</span>
                            </div>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold text-white">{title}</h1>
                            <p className="text-center text-sm text-gray-400">{description}</p>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="rounded-xl border border-[#1E1E1E] bg-[#0F0F0F] p-8">{children}</div>

                    {/* Footer */}
                    <div className="mt-12 text-center text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} AI Gym Coach. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
