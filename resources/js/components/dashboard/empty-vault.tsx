import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type EmptyVaultProps = {
    onAdd: () => void;
};

const GHOST_ROWS = [0, 1, 2, 3];

export default function EmptyVault({ onAdd }: EmptyVaultProps) {
    return (
        <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-5">
            <div className="relative mb-3">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    disabled
                    placeholder="Search platform or email"
                    className="h-10 rounded-[6px] bg-muted pl-9"
                />
            </div>

            <div className="space-y-1.5">
                {GHOST_ROWS.map((row) => (
                    <div
                        key={row}
                        className="flex items-center gap-3 rounded-[6px] px-2.5 py-2"
                    >
                        <div className="h-9 w-9 shrink-0 rounded-[6px] bg-muted" />
                        <div className="min-w-0 flex-1 space-y-1.5">
                            <div className="h-3 w-2/5 rounded-[2px] bg-muted" />
                            <div className="h-2.5 w-3/5 rounded-[2px] bg-muted" />
                        </div>
                    </div>
                ))}
            </div>

            <Button
                onClick={onAdd}
                className="mt-3 h-10 w-full justify-center gap-2 rounded-[6px] text-sm font-medium"
            >
                <Plus className="h-4 w-4" />
                Add your first password
            </Button>
        </div>
    );
}
