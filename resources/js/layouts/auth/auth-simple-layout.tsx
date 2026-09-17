import { Link } from '@inertiajs/react';
// Logo icon removed — using text-only branding
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { useAppearance } from '@/hooks/use-appearance';
import { Moon } from 'lucide-react';
import { SunIcon } from '@/components/sun-icon';

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
        <div className="h-screen min-h-screen overflow-hidden bg-background">
            <header className="flex w-full items-center justify-between px-6 py-4 md:px-10">
                <Link href={home()} className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold">LockBox</span>
                </Link>

                <button
                    onClick={toggle}
                    className="rounded-lg p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Toggle theme"
                >
                    {resolvedAppearance === 'dark' ? (
                        <SunIcon className="h-6 w-6 text-yellow-500" />
                    ) : (
                        <Moon className="h-6 w-6 text-gray-700" />
                    )}
                </button>
            </header>

            <div className="flex h-full flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="max-h-full w-full max-w-sm overflow-auto">
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
