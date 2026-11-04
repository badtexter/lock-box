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
        <div className="min-w-0 flex-[999_1_560px] rounded-lg border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] bg-secondary text-lg font-medium text-secondary-foreground">
                        {account.platform[0]}
                    </div>
                    <div className="min-w-0">
                        <h2 className="truncate text-lg font-semibold text-foreground">
                            {account.platform}
                        </h2>
                        <p className="truncate text-sm text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-[6px]"
                        onClick={() => onEdit(account.id)}
                        aria-label="Edit"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-[6px] border-[#ffedea] text-[#c4242a] hover:bg-[#ffedea] dark:border-[#2c1a20] dark:text-[#e5566f] dark:hover:bg-[#2c1a20]"
                        onClick={() => onDelete(account.id)}
                        aria-label="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="mt-6 border-t border-border pt-5">
                <span className="text-sm font-medium text-foreground">
                    Password
                </span>
                <div className="mt-2 flex items-center justify-between gap-3 rounded-[6px] border border-border bg-muted px-3 py-2.5">
                    <span className="font-mono text-sm tracking-[0.1em] text-foreground">
                        {/* taste-skill-ignore: a password field, not prose */}
                        {visible
                            ? (revealed ?? '••••••••••••')
                            : '••••••••••••'}
                    </span>
                    <div className="flex shrink-0 gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-[6px]"
                            onClick={() => onCopy(account.id)}
                            aria-label="Copy password"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-[6px]"
                            onClick={() => onToggleReveal(account.id)}
                            aria-label="Reveal password"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
                Added {addedOn}
            </p>
        </div>
    );
}
