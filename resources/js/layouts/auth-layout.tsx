import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
// Logo icon removed — using text-only branding
import { home } from '@/routes';
import { useAppearance } from '@/hooks/use-appearance';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggle = () => updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');

    return (
        <div className="min-h-screen h-screen relative overflow-hidden bg-white dark:bg-[#00033D]">
            <header className="relative z-30 w-full py-4 px-6 md:px-10 flex items-center justify-between">
                <a href={home().url ?? '/'} className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold">LockBox</span>
                </a>

                <button
                    onClick={toggle}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Toggle theme"
                >
                    {resolvedAppearance === 'dark' ? (
                        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a1 1 0 00-1.414 0l-.707.707a1 1 0 000 1.414l2.12 2.12a1 1 0 001.414 0l.707-.707a1 1 0 000-1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM9 4a1 1 0 100-2 1 1 0 000 2zm0 12a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    )}
                </button>
            </header>

            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                

                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="absolute rounded-full border"
                        style={{
                            width: `${350 + i * 140}px`,
                            height: `${350 + i * 140}px`,
                            right: '-350px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            borderColor: 'rgba(151,125,255,0.12)',
                        }}
                    />
                ))}

                <div
                    className="
                        absolute
                        right-[-300px]
                        top-1/2
                        -translate-y-1/2
                        w-[900px]
                        h-[900px]
                        rounded-full
                    "
                    style={{
                        background: `
                            radial-gradient(
                                circle,
                                rgba(151,125,255,.55),
                                rgba(0,51,255,.25),
                                transparent 70%
                            )
                        `,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-6">

                <div
                    className="
                        w-full
                        max-w-md
                        rounded-3xl
                        p-8
                        max-h-[calc(100vh-6rem)]
                        overflow-auto
                        backdrop-blur-xl
                        bg-white/80
                        dark:bg-white/5
                        border border-gray-200
                        dark:border-white/10
                        shadow-lg
                        dark:shadow-none
                        ring-1 ring-black/5
                        dark:ring-0"
                >
                    <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                        {title}
                    </h1>
                    <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                        {description}
                    </p>

                    <br />

                    {children}
                    
                </div>

            </div>
        </div>
    );
}
