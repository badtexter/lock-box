import { Copy, Eye, MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Account } from '@/types';

type PasswordCardProps = {
    item: Account;
    revealed?: string | null;
    visible?: boolean;
    onCopy?: (id: number) => void;
    onToggleReveal?: (id: number) => void;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
};

export default function PasswordCard({
    item,
    revealed,
    visible,
    onCopy,
    onToggleReveal,
    onEdit,
    onDelete,
}: PasswordCardProps) {
    const displayEmail = item.username ?? item.email ?? '';

    return (
        <div className="group w-full rounded-3xl border border-slate-200/70 bg-white/80 p-5 text-left backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-[#977DFF]/30 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
            <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0033FF] to-[#977DFF] font-semibold text-white">
                    {item.platform[0]}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => onEdit?.(item.id)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            onSelect={() => onDelete?.(item.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="mt-5">
                <h3 className="font-semibold text-[#030812] dark:text-white">
                    {item.platform}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
                    {displayEmail}
                </p>
            </div>

            <div className="mt-5 flex items-center justify-between">
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm text-slate-500 dark:bg-white/5 dark:text-white/50">
                    {visible ? (revealed ?? '••••••••••') : '••••••••••'}
                </span>

                <div className="flex items-center gap-1">
                    <div className="rounded-lg p-2 text-slate-500 dark:text-white/50">
                        <button
                            onClick={() => onCopy?.(item.id)}
                            aria-label="Copy"
                        >
                            <Copy className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="rounded-lg p-2 text-slate-500 dark:text-white/50">
                        <button
                            onClick={() => onToggleReveal?.(item.id)}
                            aria-label="Reveal"
                        >
                            <Eye className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
