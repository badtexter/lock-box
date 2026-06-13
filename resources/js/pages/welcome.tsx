import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import { useEffect, useState } from 'react';

export default function Welcome() {
    const { auth } = usePage().props;
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                          (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDark(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newDarkMode = !isDark;
        setIsDark(newDarkMode);
        localStorage.setItem('darkMode', String(newDarkMode));
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const colors = {
        dark_blue: '#00033D',
        lighter_blue: '#0033FF',
        light_purple: '#977DFF',
        grey: '#EAEDF8',
        white: '#FFFFFF',
        black: '#030812'
    };

    return (
        <>
            <Head title="LockBox" />
            <div className="font-sans min-h-screen bg-white dark:bg-[#00033D] transition-colors duration-300 overflow-hidden">
                {/* NAVBAR */}
                <nav className="relative z-20 container mx-auto px-8 py-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-3xl text-[#030812] dark:text-white">
                            LockBox
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a1 1 0 00-1.414 0l-.707.707a1 1 0 000 1.414l2.12 2.12a1 1 0 001.414 0l.707-.707a1 1 0 000-1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM9 4a1 1 0 100-2 1 1 0 000 2zm0 12a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                        <Link
                            href={login().url}
                            className="
                                px-6 py-3 rounded-full
                                border
                                border-[#0033FF]/30
                                text-[#030812]
                                dark:text-white
                                hover:bg-[#0033FF]/10
                                transition
                            "
                        >
                            Login
                        </Link>
                        <Link
                            href={register().url}
                            className="
                                px-6 py-3 rounded-full
                                text-white
                                font-medium
                                transition
                                hover:scale-105
                            "
                            style={{
                                background: `linear-gradient(
                                    135deg,
                                    ${colors.lighter_blue},
                                    ${colors.light_purple}
                                )`
                            }}
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>

                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute right-[-500px] top-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
                        style={{
                            background: `
                                radial-gradient(
                                    circle,
                                    rgba(151,125,255,.45) 0%,
                                    rgba(0,51,255,.25) 25%,
                                    transparent 65%
                                )
                            `
                        }}
                    />

                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="absolute right-[-450px] top-1/2 -translate-y-1/2 rounded-full border"
                            style={{
                                width: `${400 + i * 150}px`,
                                height: `${400 + i * 150}px`,
                                borderColor: 'rgba(151,125,255,.12)'
                            }}
                        />
                    ))}
                </div>

             {/* HERO */}
                <section className="relative z-20 container mx-auto px-8 pt-20 pb-32">

                    <div className="max-w-3xl">

                        <div
                            className="
                                inline-flex
                                items-center
                                px-5 py-2
                                rounded-full
                                mb-8
                            "
                            style={{
                                background: 'rgba(151,125,255,.08)',
                                border: '1px solid rgba(151,125,255,.15)'
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full mr-3"
                                style={{
                                    background: colors.light_purple
                                }}
                            />

                            <span className="text-sm text-[#030812]/70 dark:text-white/70">
                                Secure. Fast. Private.
                            </span>
                        </div>

                        <h1
                            className="
                                text-6xl
                                md:text-8xl
                                font-bold
                                leading-[0.95]
                                tracking-tight
                                text-[#030812]
                                dark:text-white
                            "
                        >
                            Secure your
                            <br />
                            passwords.
                            <br />

                            <span
                                style={{
                                    background: `linear-gradient(
                                        135deg,
                                        ${colors.lighter_blue},
                                        ${colors.light_purple}
                                    )`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                Simplify your life.
                            </span>
                        </h1>

                        <p
                            className="
                                mt-8
                                text-xl
                                max-w-xl
                                leading-relaxed
                                text-[#030812]/65
                                dark:text-white/65
                            "
                        >
                            LockBox is a secure password manager that
                            stores your credentials safely and gives
                            you instant access whenever you need them.
                        </p>

                        <div className="flex gap-5 mt-12">

                            <Link
                                href={register()}
                                className="
                                    px-8
                                    py-4
                                    rounded-2xl
                                    text-white
                                    font-semibold
                                    transition
                                    hover:scale-105
                                "
                                style={{
                                    background: `linear-gradient(
                                        135deg,
                                        ${colors.lighter_blue},
                                        ${colors.light_purple}
                                    )`
                                }}
                            >
                                Get Started Free
                            </Link>

                            <button
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-[#030812]
                                    dark:text-white
                                "
                            >
                                <div
                                    className="
                                        w-12
                                        h-12
                                        rounded-full
                                        border
                                        flex
                                        items-center
                                        justify-center
                                    "
                                    style={{
                                        borderColor:
                                            'rgba(151,125,255,.35)'
                                    }}
                                >
                                    ▶
                                </div>

                                See how it works
                            </button>

                        </div>

                    </div>

                </section>
            </div>
        </>
    );
}