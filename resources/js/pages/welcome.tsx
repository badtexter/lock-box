import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

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
            <div className="min-h-screen bg-white dark:bg-[#00033D] transition-colors duration-300 overflow-hidden">
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

                    {/* NAVBAR */}
                <nav className="relative z-20 container mx-auto px-8 py-8 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <span className="font-bold text-3xl text-[#030812] dark:text-white">
                            LockBox
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                            <Link
                                href={login()}
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
                                href={register()}
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
                </div>
            </div>
        </>
    );
}