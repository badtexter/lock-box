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
                </div>
            </div>
        </>
    );
}