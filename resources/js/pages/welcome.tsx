import { Head, Link, usePage } from '@inertiajs/react';
import { login } from '@/routes';
import { register } from '@/routes';
import { useEffect, useState } from 'react';
import { Moon } from 'lucide-react';
import { SunIcon } from '@/components/sun-icon';

export default function Welcome() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode =
            localStorage.getItem('darkMode') === 'true' ||
            (!localStorage.getItem('darkMode') &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
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
        black: '#030812',
    };

    return (
        <>
            <Head title="LockBox" />
            <div className="min-h-screen overflow-hidden bg-white font-sans transition-colors duration-300 dark:bg-[#00033D]">
                {/* NAVBAR */}
                <nav className="relative z-20 container mx-auto flex items-center justify-between px-8 py-8">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-[#030812] dark:text-white">
                            LockBox
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="rounded-lg p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <SunIcon className="h-6 w-6 text-yellow-500" />
                            ) : (
                                <Moon className="h-6 w-6 text-gray-700" />
                            )}
                        </button>
                        <Link
                            href={login().url}
                            className="rounded-full border border-[#0033FF]/30 px-6 py-3 text-[#030812] transition hover:bg-[#0033FF]/10 dark:text-white"
                        >
                            Login
                        </Link>
                        <Link
                            href={register().url}
                            className="rounded-full px-6 py-3 font-medium text-white transition hover:scale-105"
                            style={{
                                background: `linear-gradient(
                                    135deg,
                                    ${colors.lighter_blue},
                                    ${colors.light_purple}
                                )`,
                            }}
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>

                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="absolute top-1/2 right-[-500px] h-[1200px] w-[1200px] -translate-y-1/2 rounded-full"
                        style={{
                            background: `
                                radial-gradient(
                                    circle,
                                    rgba(151,125,255,.45) 0%,
                                    rgba(0,51,255,.25) 25%,
                                    transparent 65%
                                )
                            `,
                        }}
                    />

                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="absolute top-1/2 right-[-450px] -translate-y-1/2 rounded-full border"
                            style={{
                                width: `${400 + i * 150}px`,
                                height: `${400 + i * 150}px`,
                                borderColor: 'rgba(151,125,255,.12)',
                            }}
                        />
                    ))}
                </div>

                {/* HERO */}
                <section className="relative z-20 container mx-auto px-8 pt-20 pb-32">
                    <div className="max-w-3xl">
                        <div
                            className="mb-8 inline-flex items-center rounded-full px-5 py-2"
                            style={{
                                background: 'rgba(151,125,255,.08)',
                                border: '1px solid rgba(151,125,255,.15)',
                            }}
                        >
                            <span
                                className="mr-3 h-2 w-2 rounded-full"
                                style={{
                                    background: colors.light_purple,
                                }}
                            />

                            <span className="text-sm text-[#030812]/70 dark:text-white/70">
                                Secure. Fast. Private.
                            </span>
                        </div>

                        <h1 className="text-6xl leading-[0.95] font-bold tracking-tight text-[#030812] md:text-8xl dark:text-white">
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
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Simplify your life.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-xl leading-relaxed text-[#030812]/65 dark:text-white/65">
                            LockBox is a secure password manager that stores
                            your credentials safely and gives you instant access
                            whenever you need them.
                        </p>

                        <div className="mt-12 flex gap-5">
                            <Link
                                href={register()}
                                className="rounded-2xl px-8 py-4 font-semibold text-white transition hover:scale-105"
                                style={{
                                    background: `linear-gradient(
                                        135deg,
                                        ${colors.lighter_blue},
                                        ${colors.light_purple}
                                    )`,
                                }}
                            >
                                Get Started Free
                            </Link>

                            <button className="flex items-center gap-3 text-[#030812] dark:text-white">
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded-full border"
                                    style={{
                                        borderColor: 'rgba(151,125,255,.35)',
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
