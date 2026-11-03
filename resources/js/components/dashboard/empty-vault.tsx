import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type EmptyVaultProps = {
    onAdd: () => void;
};

const GHOST_ROWS = [0, 1, 2, 3];

export default function EmptyVault({ onAdd }: EmptyVaultProps) {
    return (
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-300/70 bg-white/95 p-6 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
            <div className="relative mb-4">
                <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-300 dark:text-white/20" />
                <Input
                    disabled
                    placeholder="Search platform or email"
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-11 dark:border-white/10 dark:bg-white/[0.02]"
                />
            </div>

            <div className="space-y-2">
                {GHOST_ROWS.map((row) => (
                    <div
                        key={row}
                        className="flex animate-pulse items-center gap-4 rounded-2xl px-4 py-3.5"
                        style={{ animationDelay: `${row * 200}ms` }}
                    >
                        <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-200 dark:bg-white/10" />
                        <div className="min-w-0 flex-1 space-y-2">
                            <div className="h-3.5 w-2/5 rounded-full bg-slate-200 dark:bg-white/10" />
                            <div className="h-3 w-3/5 rounded-full bg-slate-100 dark:bg-white/5" />
                        </div>
                    </div>
                ))}
            </div>

            <Button
                onClick={onAdd}
                className="mt-4 h-14 w-full justify-center gap-2 rounded-2xl text-base font-semibold text-white shadow-lg transition-all hover:brightness-110"
                style={{
                    background: 'linear-gradient(135deg,#2B5CFF,#8A5CFF)',
                }}
            >
                <Plus className="h-5 w-5" />
                Add your first password
            </Button>
        </div>
    );
}
