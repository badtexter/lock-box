import PasswordCard from '@/components/dashboard/password-card';
import type { Account } from '@/types';

type PasswordGridProps = {
    items: Account[];
    filteredItems: Account[];
    revealedPasswords: Record<number, string>;
    visibleIds: Record<number, boolean>;
    onCopy: (id: number) => void;
    onToggleReveal: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

export default function PasswordGrid({
    items,
    filteredItems,
    revealedPasswords,
    visibleIds,
    onCopy,
    onToggleReveal,
    onEdit,
    onDelete,
}: PasswordGridProps) {
    if (items.length > 0 && filteredItems.length === 0) {
        return (
            <div className="rounded-[2rem] border border-white/10 bg-white/60 p-10 text-center backdrop-blur-xl dark:bg-white/[0.03]">
                <p className="text-sm text-slate-500 dark:text-white/50">
                    No credentials match your search.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
                <PasswordCard
                    key={item.id}
                    item={item}
                    revealed={revealedPasswords[item.id]}
                    visible={!!visibleIds[item.id]}
                    onCopy={onCopy}
                    onToggleReveal={onToggleReveal}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
