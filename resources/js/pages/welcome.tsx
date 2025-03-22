import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="AI Gym Coach">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-[#0A0A0A] text-white">
                {/* Navbar */}
                <header className="border-b border-[#1E1E1E] bg-[#0A0A0A]">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-white">AI Gym Coach</span>
                        </div>
                        <nav className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="hover:bg-opacity-90 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-all"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="hover:bg-opacity-90 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-all"
                                    >
                                        Get started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#13151A] to-[#0A0A0A]"></div>

                    {/* Gradient Orbs */}
                    <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-purple-600 opacity-10 blur-3xl"></div>
                    <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-blue-600 opacity-10 blur-3xl"></div>

                    <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
                            <div className="flex flex-col justify-center">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                                    Your Personal{' '}
                                    <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                                        Fitness Assistant
                                    </span>
                                </h1>
                                <p className="mt-6 max-w-3xl text-xl text-gray-300">
                                    Get personalized workout and nutrition plans tailored to your specific goals, schedule, and health conditions.
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:from-purple-600 hover:to-blue-600"
                                    >
                                        Start your fitness journey
                                    </Link>
                                    <Link href={route('login')} className="text-base font-medium text-white">
                                        Learn more <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative flex items-center justify-center lg:justify-end">
                                {/* Stylized Fitness Icon/Illustration */}
                                <div className="relative h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-1">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg
                                            className="h-64 w-64 text-white opacity-80"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20.25 5.25H3.75C2.92157 5.25 2.25 5.92157 2.25 6.75V17.25C2.25 18.0784 2.92157 18.75 3.75 18.75H20.25C21.0784 18.75 21.75 18.0784 21.75 17.25V6.75C21.75 5.92157 21.0784 5.25 20.25 5.25Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M15.75 12C15.75 12.1989 15.671 12.3897 15.5303 12.5303C15.3897 12.671 15.1989 12.75 15 12.75H9C8.80109 12.75 8.61032 12.671 8.46967 12.5303C8.32902 12.3897 8.25 12.1989 8.25 12C8.25 11.8011 8.32902 11.6103 8.46967 11.4697C8.61032 11.329 8.80109 11.25 9 11.25H15C15.1989 11.25 15.3897 11.329 15.5303 11.4697C15.671 11.6103 15.75 11.8011 15.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Personalized Fitness Coaching</h2>
                            <p className="mt-4 text-lg text-gray-300">Our AI coach creates custom plans based on your unique profile and goals</p>
                        </div>
                        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="rounded-2xl border border-[#1E1E1E] bg-[#0F0F0F] p-8 transition-all hover:border-purple-500/30">
                                <div className="mb-5 inline-flex rounded-xl bg-purple-500/10 p-3">
                                    <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white">Workout Plans</h3>
                                <p className="mt-2 text-gray-400">
                                    Customized exercise routines based on your fitness level, goals, and available equipment.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="rounded-2xl border border-[#1E1E1E] bg-[#0F0F0F] p-8 transition-all hover:border-blue-500/30">
                                <div className="mb-5 inline-flex rounded-xl bg-blue-500/10 p-3">
                                    <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white">Nutrition Guidance</h3>
                                <p className="mt-2 text-gray-400">Meal plans and dietary recommendations tailored to support your fitness journey.</p>
                            </div>

                            {/* Feature 3 */}
                            <div className="rounded-2xl border border-[#1E1E1E] bg-[#0F0F0F] p-8 transition-all hover:border-indigo-500/30">
                                <div className="mb-5 inline-flex rounded-xl bg-indigo-500/10 p-3">
                                    <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white">Health Monitoring</h3>
                                <p className="mt-2 text-gray-400">
                                    Track your progress and receive adjustments to your plan as you advance toward your goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="border-t border-[#1E1E1E] py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">How It Works</h2>
                            <p className="mt-4 text-lg text-gray-300">Simple steps to your personalized fitness journey</p>
                        </div>
                        <div className="mt-16">
                            <div className="relative">
                                {/* Connection Line */}
                                <div className="absolute top-0 left-12 h-full w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 md:left-1/2 md:-ml-0.5"></div>

                                {/* Step 1 */}
                                <div className="relative mb-12 md:mb-24">
                                    <div className="flex flex-col items-center md:flex-row">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0F0F0F] text-2xl font-bold text-white ring-4 ring-purple-500/20 md:absolute md:left-1/2 md:-ml-12">
                                            1
                                        </div>
                                        <div className="mt-6 rounded-2xl border border-[#1E1E1E] bg-[#0F0F0F] p-6 md:mt-0 md:w-5/12 md:pr-12">
                                            <h3 className="text-xl font-semibold text-white">Create Your Profile</h3>
                                            <p className="mt-2 text-gray-400">
                                                Answer questions about your age, fitness level, goals, and health conditions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative mb-12 md:mb-24">
                                    <div className="flex flex-col items-center md:flex-row md:justify-end">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0F0F0F] text-2xl font-bold text-white ring-4 ring-blue-500/20 md:absolute md:left-1/2 md:-ml-12">
                                            2
                                        </div>
                                        <div className="mt-6 rounded-2xl border border-[#1E1E1E] bg-[#0F0F0F] p-6 md:mt-0 md:w-5/12 md:pl-12">
                                            <h3 className="text-xl font-semibold text-white">Receive Your Plan</h3>
                                            <p className="mt-2 text-gray-400">
                                                Get a customized workout and nutrition plan designed specifically for you.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative">
                                    <div className="flex flex-col items-center md:flex-row">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0F0F0F] text-2xl font-bold text-white ring-4 ring-indigo-500/20 md:absolute md:left-1/2 md:-ml-12">
                                            3
                                        </div>
                                        <div className="mt-6 rounded-2xl border border-[#1E1E1E] bg-[#0F0F0F] p-6 md:mt-0 md:w-5/12 md:pr-12">
                                            <h3 className="text-xl font-semibold text-white">Track Your Progress</h3>
                                            <p className="mt-2 text-gray-400">
                                                Follow your plan and receive ongoing adjustments as you progress toward your goals.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500">
                            <div className="px-6 py-24 sm:px-12 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-16">
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                        Ready to transform your fitness?
                                        <br />
                                        Start your journey today.
                                    </h2>
                                    <p className="mt-6 max-w-xl text-lg text-purple-100">
                                        Join thousands of users who have already achieved their fitness goals with our AI coach.
                                    </p>
                                </div>
                                <div className="mt-8 lg:mt-0 lg:shrink-0">
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-full bg-white px-12 py-4 text-base font-medium text-purple-600 shadow-md transition-all hover:bg-gray-100"
                                    >
                                        Get started for free
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-[#1E1E1E] py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between md:flex-row">
                            <div className="mb-6 md:mb-0">
                                <span className="text-xl font-bold text-white">AI Gym Coach</span>
                            </div>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Terms
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Privacy
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Contact
                                </a>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-[#1E1E1E] pt-8 text-center text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} AI Gym Coach. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
