import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Eye, Copy, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PasswordItem = {
    id: number;
    platform: string;
    email: string;
    password: string;
};

function PasswordTable({ items }: { items: PasswordItem[] }) {
    return (
        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/90 dark:bg-[#07103d]/90 backdrop-blur-xl">
            <div className="grid grid-cols-3 gap-4 px-6 py-5 text-sm font-semibold text-slate-500 dark:text-slate-300 border-b border-white/10 dark:border-white/5">
                <span>Platform</span>
                <span>Email</span>
                <span>Password</span>
            </div>

            {items.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-3 items-center px-6 py-4 text-sm text-[#030812] dark:text-white hover:bg-white/40 dark:hover:bg-white/10 transition"
                >
                    <div className="font-medium">{item.platform}</div>
                    <div className="text-gray-600 dark:text-white/60">{item.email}</div>
                    <div className="flex items-center justify-between">
                        <span className="font-mono tracking-wider">••••••••••</span>
                        <div className="flex items-center gap-2">
                            <button
                                className="p-2 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition"
                                title="Copy password"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                            <button
                                className="p-2 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition"
                                title="Show password"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

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
];

export default function Dashboard() {
    const items = sampleItems;

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-[calc(100vh-4rem)] space-y-6 p-4 sm:p-6 lg:p-8 bg-white/95 dark:bg-[#00033D]/90">
                <div className="rounded-[2rem] border border-white/10 bg-white/80 dark:bg-[#07103d]/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm uppercase tracking-[0.3em] text-[#6366f1]/80 dark:text-[#c7d2fe]/70">
                                Your vault
                            </p>
                            <h1 className="text-4xl font-semibold tracking-tight text-[#030812] dark:text-white md:text-5xl">
                                Secure credentials
                                <br />
                                for every platform.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-[#334155] dark:text-[#e2e8f0]/75">
                                Store all your login details safely and access them instantly from your dashboard.
                            </p>
                        </div>

                        <Button className="w-full md:w-auto rounded-full bg-gradient-to-r from-[#0033FF] to-[#977DFF] px-6 py-3 text-white shadow-lg shadow-[#0033FF]/20 hover:brightness-110 transition">
                            Add new password
                        </Button>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/60 dark:bg-white/5 p-4 shadow-xl shadow-slate-900/5 backdrop-blur-xl overflow-hidden">
                    {items.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-white/10 bg-white/70 dark:bg-white/5 p-10 text-center">
                            <PlaceholderPattern className="mx-auto mb-6 h-40 w-full max-w-xl" />
                            <p className="text-sm text-gray-600 dark:text-white/60">
                                Your dashboard is ready. Add a new credential to get started.
                            </p>
                        </div>
                    ) : (
                        <PasswordTable items={items} />
                    )}
                </div>
            </div>
        </>
    );
}
