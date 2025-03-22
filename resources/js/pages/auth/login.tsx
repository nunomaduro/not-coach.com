import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            <Head title="Log in | AI Gym Coach">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-md">
                    {/* Logo and Title */}
                    <div className="mb-8 flex flex-col items-center gap-4">
                        <a href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1">
                                <span className="text-xl font-bold text-white">AI</span>
                            </div>
                        </a>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                            <p className="text-center text-sm text-gray-400">Enter your credentials to access your account</p>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="rounded-xl border border-[#1E1E1E] bg-[#0F0F0F] p-8">
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-gray-300">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                        className="border-[#2E2E2E] bg-[#161616] text-white"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password" className="text-gray-300">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink href={route('password.request')} className="ml-auto text-sm text-purple-400" tabIndex={5}>
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Password"
                                        className="border-[#2E2E2E] bg-[#161616] text-white"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onClick={() => setData('remember', !data.remember)}
                                        tabIndex={3}
                                    />
                                    <Label htmlFor="remember" className="text-gray-300">
                                        Remember me
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Log in
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <TextLink href={route('register')} tabIndex={5} className="text-purple-400">
                            Sign up
                        </TextLink>
                    </div>

                    {/* Status Message */}
                    {status && <div className="mt-4 text-center text-sm font-medium text-green-500">{status}</div>}

                    {/* Footer */}
                    <div className="mt-12 text-center text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} AI Gym Coach. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
