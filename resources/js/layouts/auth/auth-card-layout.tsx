import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
// Logo icon removed — using text-only branding
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home } from '@/routes';
import { useAppearance } from '@/hooks/use-appearance';
import { Moon } from 'lucide-react';
import { SunIcon } from '@/components/sun-icon';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const toggle = () =>
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');

    return (
        <div className="h-screen min-h-screen overflow-hidden">
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

            <div className="flex h-full flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                <div className="flex max-h-full w-full max-w-md flex-col gap-6 overflow-auto">
                    <div className="flex flex-col gap-6">
                        <Card className="max-h-[calc(100vh-8rem)] overflow-auto rounded-xl">
                            <CardHeader className="px-10 pt-8 pb-0 text-center">
                                <CardTitle className="text-xl">
                                    {title}
                                </CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            <CardContent className="px-10 py-8">
                                {children}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
