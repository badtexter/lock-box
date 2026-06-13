import { Link } from '@inertiajs/react';
// Logo icon removed — using text-only branding
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { useAppearance } from '@/hooks/use-appearance';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggle = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="min-h-svh bg-background">
            <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between">
                <Link href={home()} className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold">LockBox</span>
                </Link>

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

            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">{title}</h1>
                                <p className="text-center text-sm text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
