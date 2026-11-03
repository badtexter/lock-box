import { Copy, Eye, Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { home } from '@/routes';

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

    const toggle = () =>
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* LEFT — the colour */}
            <div className="brand-gradient-soft relative hidden flex-col justify-between p-10 lg:flex">
                <a
                    href={home().url ?? '/'}
                    className="flex items-center gap-2.5 text-white"
                >
                    <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-white/15 text-[11px] font-semibold">
                        L
                    </span>
                    <span className="text-[15px] font-medium tracking-tight">
                        LockBox
                    </span>
                </a>

                <div>
                    <h2 className="max-w-sm text-3xl font-semibold tracking-tight text-white">
                        One encrypted vault for every password.
                    </h2>
                    <p className="mt-3 max-w-sm text-sm text-white/80">
                        Stored encrypted, generated strong, and out of your way.
                    </p>

                    {/* A real fragment of the product, at true size */}
                    <div
                        data-ui
                        className="mt-8 w-full max-w-sm rounded-lg bg-white p-4" // taste-skill-ignore: data-ui fragment, keeps its own surface
                    >
                        <div className="flex items-center gap-3 rounded-[6px] px-2.5 py-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-slate-100 text-sm font-medium text-slate-900">
                                G
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-slate-900">
                                    GitHub
                                </div>
                                <div className="truncate text-xs text-slate-500">
                                    dev@lockbox.io
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-3 rounded-[6px] bg-slate-100 px-3 py-2.5">
                            <span
                                className="font-mono text-sm tracking-[0.1em] text-slate-700" // taste-skill-ignore: a password field, not prose
                            >
                                ••••••••••••
                            </span>
                            <div className="flex shrink-0 gap-1">
                                <Copy className="h-4 w-4 text-slate-400" />
                                <Eye className="h-4 w-4 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-white/65">
                    Encrypted at rest. Decrypted only in your browser.
                </p>
            </div>

            {/* RIGHT — the form */}
            <div className="relative flex items-center justify-center bg-background px-6 py-12">
                <button
                    onClick={toggle}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-[6px] hover:bg-accent lg:top-6 lg:right-6"
                    aria-label="Toggle theme"
                >
                    {resolvedAppearance === 'dark' ? (
                        <Sun className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <Moon className="h-4 w-4 text-muted-foreground" />
                    )}
                </button>

                <div className="w-full max-w-sm">
                    <a
                        href={home().url ?? '/'}
                        className="mb-8 flex items-center gap-2.5 text-foreground lg:hidden"
                    >
                        <span className="brand-gradient flex h-6 w-6 items-center justify-center rounded-[4px] text-[11px] font-semibold text-white">
                            L
                        </span>
                        <span className="text-[15px] font-medium tracking-tight">
                            LockBox
                        </span>
                    </a>

                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {description}
                    </p>

                    <div className="mt-6">{children}</div>
                </div>
            </div>
        </div>
    );
}
