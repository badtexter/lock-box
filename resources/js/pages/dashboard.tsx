import { Head } from '@inertiajs/react';
import { Eye, Copy, MoreVertical, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type PasswordItem = {
    id: number;
    platform: string;
    email: string;
    password: string;
};

const sampleItems: PasswordItem[] = [
    {
        id: 1,
        platform: 'GitHub',
        email: 'me@example.com',
        password: '••••••••••',
    },
    {
        id: 2,
        platform: 'Google',
        email: 'me+work@example.com',
        password: '••••••••••',
    },
    {
        id: 3,
        platform: 'Discord',
        email: 'discord@example.com',
        password: '••••••••••',
    },
];

function PasswordCard({ item }: { item: PasswordItem }) {
    return (
        <button
            className="
                group
                w-full
                rounded-3xl
                border
                border-slate-200/70
                dark:border-white/10
                bg-white/80
                dark:bg-white/[0.03]
                p-5
                text-left
                backdrop-blur-xl
                transition-all
                hover:-translate-y-1
                hover:border-[#977DFF]/30
                hover:bg-white
                dark:hover:bg-white/[0.05]
            "
        >
            <div className="flex items-start justify-between">
                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-[#0033FF]
                        to-[#977DFF]
                        font-semibold
                        text-white
                    "
                >
                    {item.platform[0]}
                </div>

                <MoreVertical className="h-4 w-4 text-slate-400 opacity-0 transition group-hover:opacity-100" />
            </div>

            <div className="mt-5">
                <h3 className="font-semibold text-[#030812] dark:text-white">
                    {item.platform}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
                    {item.email}
                </p>
            </div>

            <div className="mt-5 flex items-center justify-between">
                <span
                    className="
                        rounded-lg
                        bg-slate-100
                        dark:bg-white/5
                        px-3
                        py-1.5
                        font-mono
                        text-sm
                        text-slate-500
                        dark:text-white/50
                    "
                >
                    ••••••••••
                </span>

                <div className="flex items-center gap-1">
                    <div
                        className="
                            rounded-lg
                            p-2
                            text-slate-500
                            dark:text-white/50
                        "
                    >
                        <Copy className="h-4 w-4" />
                    </div>

                    <div
                        className="
                            rounded-lg
                            p-2
                            text-slate-500
                            dark:text-white/50
                        "
                    >
                        <Eye className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </button>
    );
}

export default function Dashboard() {
    const items = sampleItems;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Head title="Dashboard" />

            <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#F5F8FF] dark:bg-[#00033D]">

                {/* Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">

                    <div
                        className="absolute inset-0 opacity-40 dark:opacity-20"
                        style={{
                            backgroundImage: `
                                radial-gradient(
                                    rgba(151,125,255,0.35) 1px,
                                    transparent 1px
                                )
                            `,
                            backgroundSize: '32px 32px',
                        }}
                    />

                    <div
                        className="
                            absolute
                            right-[-250px]
                            top-[-150px]
                            h-[800px]
                            w-[800px]
                            rounded-full
                        "
                        style={{
                            background: `
                                radial-gradient(
                                    circle,
                                    rgba(151,125,255,.18),
                                    rgba(0,51,255,.08),
                                    transparent 70%
                                )
                            `,
                        }}
                    />

                    <div
                        className="
                            absolute
                            left-[-350px]
                            bottom-[-300px]
                            h-[900px]
                            w-[900px]
                            rounded-full
                        "
                        style={{
                            background: `
                                radial-gradient(
                                    circle,
                                    rgba(0,51,255,.10),
                                    transparent 70%
                                )
                            `,
                        }}
                    />

                </div>

                <div className="relative z-10 p-6 lg:p-10">

                    {/* Hero */}
                    <div className="mb-10">

                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[#977DFF]">
                            LockBox Vault
                        </p>

                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#030812] dark:text-white">
                            Manage your passwords
                            <br />
                            securely.
                        </h1>

                        <p className="mt-4 max-w-2xl text-slate-600 dark:text-white/60">
                            Store, organize and access all your credentials from one secure place.
                        </p>

                        <div className="mt-6 flex items-center gap-6 text-sm text-slate-500 dark:text-white/50">
                            <span>{items.length} credentials stored</span>
                            <span>Protected by encryption</span>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="mb-8 flex justify-end">

                        <Button
                            onClick={() => setIsOpen(true)}
                            className="
                                h-12
                                rounded-xl
                                px-5
                                text-white
                                shadow-lg
                                transition-all
                                hover:brightness-110
                            "
                            style={{
                                background:
                                    'linear-gradient(135deg,#2B5CFF,#977DFF)',
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Password
                        </Button>

                    </div>

                    {/* Content */}
                    {items.length === 0 ? (
                        <div
                            className="
                                rounded-[2rem]
                                border
                                border-white/10
                                bg-white/60
                                dark:bg-white/[0.03]
                                p-10
                                backdrop-blur-xl
                            "
                        >
                            <PlaceholderPattern className="mx-auto mb-6 h-40 w-full max-w-xl" />

                            <p className="text-center text-sm text-slate-500 dark:text-white/50">
                                Your vault is empty. Add your first credential to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {items.map((item) => (
                                <PasswordCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}

                </div>
            </div>

            { /* Add new Password Dialog */ }
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className=" max-w-xl border-slate-200/70 bg-white/95 backdrop-blur-2xl dark:border-white/10 dark:bg-[#07103d]/95 shadow-2xl">
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-xl font-semibold">
                            Add New Password
                        </DialogTitle>
                        <p className="text-sm text-slate-500 dark:text-white/50">
                            Store a new credential securely in your vault.
                        </p>
                    </DialogHeader>
                    <div className="space-y-5 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="platform">Platform</Label>
                            <Input
                                id="platform"
                                placeholder="GitHub"
                                className="
                                    h-12
                                    rounded-xl
                                    border-slate-200
                                    bg-white
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                "
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="me@example.com"
                                className="
                                    h-12
                                    rounded-xl
                                    border-slate-200
                                    bg-white
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                "
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••••••"
                                className="
                                    h-12
                                    rounded-xl
                                    border-slate-200
                                    bg-white
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                "
                            />
                        </div>
                    </div>

                <div className="flex justify-end gap-3">

                    <Button
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl"
                    >
                        Cancel
                    </Button>

                    <Button
                        className="
                            rounded-xl
                            text-white
                            shadow-lg
                            transition-all
                            hover:brightness-110
                        "
                        style={{
                            background:
                                'linear-gradient(135deg,#2B5CFF,#977DFF)',
                        }}
                    >
                        Save Password
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
        </>
    );
}