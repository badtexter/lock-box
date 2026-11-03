import { Head, Link } from '@inertiajs/react';
import {
    Copy,
    Eye,
    KeyRound,
    Moon,
    RefreshCw,
    Search,
    Shield,
    Sun,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { login, register } from '@/routes';

export default function Welcome() {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    return (
        <>
            <Head title="LockBox" />
            <div className="min-h-svh bg-background">
                {/* NAV */}
                <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
                    <span className="flex items-center gap-2.5 text-foreground">
                        <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-primary text-[11px] font-semibold text-primary-foreground">
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
                            className="flex h-8 w-8 items-center justify-center rounded-[6px] hover:bg-accent"
                            aria-label="Toggle theme"
                        >
                            {resolvedAppearance === 'light' ? (
                                <Sun className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Moon className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>
                        <Link
                            href={login().url}
                            className="rounded-[6px] px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                        >
                            Log in
                        </Link>
                        <Link
                            href={register().url}
                            className="rounded-[6px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                        >
                            Get started
                        </Link>
                    </div>
                </nav>

                {/* HERO */}
                <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
                    <div>
                        <h1 className="fade-in-up text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
                            One encrypted vault for every password.
                        </h1>
                        <p
                            className="fade-in-up mt-5 max-w-md text-lg text-foreground"
                            style={{ animationDelay: '80ms' }}
                        >
                            LockBox stores your credentials encrypted, generates
                            strong ones for you, and gets out of the way.
                        </p>
                        <div
                            className="fade-in-up mt-8 flex items-center gap-3"
                            style={{ animationDelay: '160ms' }}
                        >
                            <Link
                                href={register()}
                                className="rounded-[6px] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                            >
                                Create your vault
                            </Link>
                            <Link
                                href={login().url}
                                className="rounded-[6px] bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-transform hover:-translate-y-0.5"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>

                    {/* A real fragment of the product, at true size */}
                    <div
                        data-ui
                        className="fade-in-up mx-auto w-full max-w-sm rounded-lg border border-border bg-card p-6" // taste-skill-ignore: data-ui fragment, keeps its own border
                        style={{ animationDelay: '220ms' }}
                    >
                        <div className="flex items-center gap-3 rounded-[6px] px-2.5 py-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-secondary text-sm font-medium text-secondary-foreground">
                                G
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-foreground">
                                    GitHub
                                </div>
                                <div className="truncate text-xs text-muted-foreground">
                                    dev@example.com
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4">
                            <span className="text-sm font-medium text-foreground">
                                Password
                            </span>
                            <div className="mt-2 flex items-center justify-between gap-3 rounded-[6px] border border-border bg-muted px-3 py-2.5">
                                {' '}
                                {/* taste-skill-ignore: data-ui fragment, keeps its own border */}
                                <span className="font-mono text-sm tracking-[0.1em] text-foreground">
                                    {/* taste-skill-ignore: a password field, not prose */}
                                    ••••••••••••
                                </span>
                                <div className="flex shrink-0 gap-1">
                                    <Copy className="h-4 w-4 text-muted-foreground" />
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                            <p className="mt-3 text-xs text-muted-foreground">
                                Added 2 days ago
                            </p>
                        </div>
                    </div>
                </section>

                {/* FEATURES — a tone step marks the section instead of a rule */}
                <section className="bg-muted/40">
                    <div className="mx-auto max-w-5xl px-6 py-16">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                            What it does
                        </h2>

                        <div className="mt-10 grid gap-10 sm:grid-cols-2">
                            {/* Generator — a real fragment of the add-password form */}
                            <div
                                className="fade-in-up"
                                style={{ animationDelay: '0ms' }}
                            >
                                <div
                                    data-ui
                                    className="rounded-lg border border-border bg-card p-6" // taste-skill-ignore: data-ui fragment, keeps its own border
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-foreground">
                                            Password
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <RefreshCw className="h-3.5 w-3.5" />
                                            Generate
                                        </span>
                                    </div>
                                    <div className="mt-2 rounded-[6px] border border-border bg-muted px-3 py-2.5">
                                        {' '}
                                        {/* taste-skill-ignore: data-ui fragment, keeps its own border */}
                                        <span className="font-mono text-sm tracking-[0.1em] text-foreground">
                                            {/* taste-skill-ignore: a password field, not prose */}
                                            f4!xQ9r@mZ2k
                                        </span>
                                    </div>
                                    <p className="mt-3 text-xs text-muted-foreground">
                                        Looks good.
                                    </p>
                                </div>
                                <h3 className="mt-4 text-base font-medium text-foreground">
                                    A generator that means it
                                </h3>
                                <p className="mt-2 text-base text-foreground">
                                    Fourteen characters minimum, upper and lower
                                    case, a number and a symbol, built in — no
                                    reused passwords.
                                </p>
                            </div>

                            {/* Search — a real fragment of the vault list */}
                            <div
                                className="fade-in-up"
                                style={{ animationDelay: '80ms' }}
                            >
                                <div
                                    data-ui
                                    className="rounded-lg border border-border bg-card p-6" // taste-skill-ignore: data-ui fragment, keeps its own border
                                >
                                    <div className="relative">
                                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <div className="h-9 rounded-[6px] border border-border bg-muted pl-9 text-sm leading-9 text-muted-foreground">
                                            {' '}
                                            {/* taste-skill-ignore: data-ui fragment, keeps its own border */}
                                            git
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center gap-3 rounded-[6px] bg-secondary px-2.5 py-2">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-background text-xs font-medium text-foreground">
                                            G
                                        </div>
                                        <span className="text-sm font-medium text-foreground">
                                            GitHub
                                        </span>
                                    </div>
                                    <div className="mt-1.5 flex items-center gap-3 rounded-[6px] px-2.5 py-2">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-secondary text-xs font-medium text-secondary-foreground">
                                            G
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            GitLab
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mt-4 text-base font-medium text-foreground">
                                    Find it in one search
                                </h3>
                                <p className="mt-2 text-base text-foreground">
                                    Every entry is searchable by platform or
                                    email the moment you start typing.
                                </p>
                            </div>

                            {/* 2FA & passkeys — a real fragment of the security settings */}
                            <div
                                className="fade-in-up"
                                style={{ animationDelay: '160ms' }}
                            >
                                <div
                                    data-ui
                                    className="rounded-lg border border-border bg-card p-6" // taste-skill-ignore: data-ui fragment, keeps its own border
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-foreground">
                                            Two-factor authentication
                                        </span>
                                        <span className="rounded-[4px] bg-[#dcfae5] px-2 py-0.5 text-xs font-medium text-[#04250e] dark:bg-[#172a1d] dark:text-[#3fc07a]">
                                            Enabled
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-xs text-muted-foreground">
                                        Recovery codes generated
                                    </p>
                                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                                        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                                            <Shield className="h-4 w-4 text-muted-foreground" />
                                            Passkeys
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            1 registered
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mt-4 text-base font-medium text-foreground">
                                    2FA and passkeys
                                </h3>
                                <p className="mt-2 text-base text-foreground">
                                    Time-based codes with recovery codes, or
                                    sign in with a passkey instead of typing
                                    anything.
                                </p>
                            </div>

                            {/* Encryption — a real fragment of the vault, locked */}
                            <div
                                className="fade-in-up"
                                style={{ animationDelay: '240ms' }}
                            >
                                <div
                                    data-ui
                                    className="rounded-lg border border-border bg-card p-6" // taste-skill-ignore: data-ui fragment, keeps its own border
                                >
                                    <div className="flex items-center gap-3 rounded-[6px] px-2.5 py-2">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-secondary text-secondary-foreground">
                                            <KeyRound className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm font-medium text-foreground">
                                                12 credentials
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                encrypted at rest
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-xs text-muted-foreground">
                                        AES-256, decrypted only in your browser
                                    </p>
                                </div>
                                <h3 className="mt-4 text-base font-medium text-foreground">
                                    One encrypted vault
                                </h3>
                                <p className="mt-2 text-base text-foreground">
                                    Every credential is encrypted at rest.
                                    Nothing is stored or read in plain text,
                                    including by you.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="mx-auto max-w-5xl px-6 py-16">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                            Start your vault.
                        </h2>
                        <Link
                            href={register()}
                            className="rounded-[6px] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                        >
                            Create your vault
                        </Link>
                    </div>
                </section>

                {/* FOOTER — a tone step closes the page */}
                <footer className="bg-muted/40">
                    <div className="mx-auto max-w-5xl px-6 py-8">
                        <p className="text-sm text-muted-foreground">
                            LockBox — a self-hosted password manager.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
