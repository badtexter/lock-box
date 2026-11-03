import { Head, Link } from '@inertiajs/react';
import { Copy, Eye, KeyRound, Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { login, register } from '@/routes';

const FEATURES = [
    {
        name: 'One encrypted vault',
        detail: 'Every credential is encrypted at rest. Nothing is stored or read in plain text, including by you.',
    },
    {
        name: 'A generator that means it',
        detail: 'Fourteen characters minimum, upper and lower case, a number and a symbol, built in — no reused passwords.',
    },
    {
        name: '2FA and passkeys',
        detail: 'Time-based codes with recovery codes, or sign in with a passkey instead of typing anything.',
    },
    {
        name: 'Find it in one search',
        detail: 'Every entry is searchable by platform or email the moment you start typing.',
    },
];

export default function Welcome() {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    return (
        <>
            <Head title="LockBox" />
            <div className="bg-background min-h-svh">
                {/* NAV */}
                <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
                    <span className="text-foreground flex items-center gap-2.5">
                        <span className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-[4px] text-[11px] font-semibold">
                            L
                        </span>
                        <span className="text-[15px] font-medium tracking-tight">
                            LockBox
                        </span>
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                updateAppearance(
                                    resolvedAppearance === 'light'
                                        ? 'dark'
                                        : 'light',
                                )
                            }
                            className="hover:bg-accent flex h-8 w-8 items-center justify-center rounded-[6px]"
                            aria-label="Toggle theme"
                        >
                            {resolvedAppearance === 'light' ? (
                                <Sun className="text-muted-foreground h-4 w-4" />
                            ) : (
                                <Moon className="text-muted-foreground h-4 w-4" />
                            )}
                        </button>
                        <Link
                            href={login().url}
                            className="text-foreground hover:bg-accent rounded-[6px] px-3 py-2 text-sm font-medium"
                        >
                            Log in
                        </Link>
                        <Link
                            href={register().url}
                            className="bg-primary text-primary-foreground rounded-[6px] px-4 py-2 text-sm font-medium"
                        >
                            Get started
                        </Link>
                    </div>
                </nav>

                {/* HERO */}
                <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
                    <div>
                        <h1 className="text-foreground text-4xl font-semibold tracking-tight lg:text-5xl">
                            One encrypted vault for every password.
                        </h1>
                        <p className="text-muted-foreground mt-5 max-w-md text-lg">
                            LockBox stores your credentials encrypted, generates
                            strong ones for you, and gets out of the way.
                        </p>
                        <div className="mt-8 flex items-center gap-3">
                            <Link
                                href={register()}
                                className="bg-primary text-primary-foreground rounded-[6px] px-5 py-2.5 text-sm font-medium"
                            >
                                Create your vault
                            </Link>
                            <Link
                                href={login().url}
                                className="bg-secondary text-secondary-foreground rounded-[6px] px-5 py-2.5 text-sm font-medium"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>

                    {/* A real fragment of the product, at true size */}
                    <div
                        data-ui
                        className="border-border bg-card mx-auto w-full max-w-sm rounded-lg border p-4" // taste-skill-ignore: data-ui fragment, keeps its own border
                    >
                        <div className="flex items-center gap-3 rounded-[6px] px-2.5 py-2">
                            <div className="bg-secondary text-secondary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] text-sm font-medium">
                                G
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-foreground text-sm font-medium">
                                    GitHub
                                </div>
                                <div className="text-muted-foreground truncate text-xs">
                                    dev@example.com
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 pt-3">
                            <span className="text-foreground text-sm font-medium">
                                Password
                            </span>
                            <div className="bg-muted border-border mt-2 flex items-center justify-between gap-3 rounded-[6px] border px-3 py-2.5"> {/* taste-skill-ignore: data-ui fragment, keeps its own border */}
                                <span className="text-foreground font-mono text-sm tracking-[0.1em]">{/* taste-skill-ignore: a password field, not prose */}
                                    ••••••••••••
                                </span>
                                <div className="flex shrink-0 gap-1">
                                    <Copy className="text-muted-foreground h-4 w-4" />
                                    <Eye className="text-muted-foreground h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES — a tone step marks the section instead of a rule */}
                <section className="bg-muted/40">
                    <div className="mx-auto max-w-5xl px-6 py-16">
                        <h2 className="text-foreground text-2xl font-semibold tracking-tight">
                            What it does
                        </h2>
                        <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
                            {FEATURES.map((feature) => (
                                <div key={feature.name}>
                                    <h3 className="text-foreground flex items-center gap-2 text-base font-medium">
                                        <KeyRound className="text-muted-foreground h-4 w-4" />
                                        {feature.name}
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-sm">
                                        {feature.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="mx-auto max-w-5xl px-6 py-16">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <h2 className="text-foreground text-2xl font-semibold tracking-tight">
                            Start your vault.
                        </h2>
                        <Link
                            href={register()}
                            className="bg-primary text-primary-foreground rounded-[6px] px-5 py-2.5 text-sm font-medium"
                        >
                            Create your vault
                        </Link>
                    </div>
                </section>

                {/* FOOTER — a tone step closes the page */}
                <footer className="bg-muted/40">
                    <div className="mx-auto max-w-5xl px-6 py-8">
                        <p className="text-muted-foreground text-sm">
                            LockBox — a self-hosted password manager.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
