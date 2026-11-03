import { Copy, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Account } from '@/types';

type PasswordDetailProps = {
    account: Account;
    revealed?: string | null;
    visible?: boolean;
    onCopy: (id: number) => void;
    onToggleReveal: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

export default function PasswordDetail({
    account,
    revealed,
    visible,
    onCopy,
    onToggleReveal,
    onEdit,
    onDelete,
}: PasswordDetailProps) {
    const email = account.username ?? account.email ?? '';
    const addedOn = new Date(account.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="min-w-0 flex-[999_1_560px] rounded-3xl border border-slate-300/70 bg-white/95 p-8 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0033FF] to-[#977DFF] text-2xl font-bold text-white shadow-lg shadow-[#0033FF]/25">
                        {account.platform[0]}
                    </div>
                    <div className="min-w-0">
                        <h2 className="truncate font-display text-xl font-bold text-[#030812] dark:text-white">
                            {account.platform}
                        </h2>
                        <p className="truncate text-sm text-slate-500 dark:text-white/50">
                            {email}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-xl border-slate-300 dark:border-white/10"
                        onClick={() => onEdit(account.id)}
                        aria-label="Edit"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-xl border-red-200 text-red-500 hover:bg-red-50 dark:border-red-500/20"
                        onClick={() => onDelete(account.id)}
                        aria-label="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="mt-7 border-t border-slate-200 pt-6 dark:border-white/10">
                <span className="text-xs font-bold tracking-wide text-slate-500 uppercase dark:text-white/50">
                    Password
                </span>
                <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-slate-300/80 bg-slate-100 px-4 py-3.5 dark:border-white/10 dark:bg-white/5">
                    <span className="font-mono text-sm tracking-[0.2em] text-slate-700 dark:text-white/70">
                        {visible
                            ? (revealed ?? '••••••••••••')
                            : '••••••••••••'}
                    </span>
                    <div className="flex shrink-0 gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg text-slate-600 hover:bg-slate-200 dark:text-white/60 dark:hover:bg-white/10"
                            onClick={() => onCopy(account.id)}
                            aria-label="Copy password"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg text-slate-600 hover:bg-slate-200 dark:text-white/60 dark:hover:bg-white/10"
                            onClick={() => onToggleReveal(account.id)}
                            aria-label="Reveal password"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <p className="mt-5 text-xs text-slate-400 dark:text-white/30">
                Added {addedOn}
            </p>
        </div>
    );
}
