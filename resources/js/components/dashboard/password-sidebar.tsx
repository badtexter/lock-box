import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Account } from '@/types';

type PasswordSidebarProps = {
    items: Account[];
    filteredItems: Account[];
    selectedId: number | null;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onSelect: (id: number) => void;
};

export default function PasswordSidebar({
    items,
    filteredItems,
    selectedId,
    searchTerm,
    onSearchChange,
    onSelect,
}: PasswordSidebarProps) {
    return (
        <div className="min-w-[280px] flex-[1_1_320px] rounded-lg border border-border bg-card p-3">
            <div className="relative mb-2">
                <label htmlFor="password-search" className="sr-only">
                    Search
                </label>
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    id="password-search"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search platform or email"
                    className="h-9 rounded-[6px] pl-9"
                />
            </div>

            {items.length > 0 && filteredItems.length === 0 ? (
                <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                    No credentials match your search.
                </p>
            ) : (
                <div className="space-y-0.5">
                    {filteredItems.map((item) => {
                        const isSelected = item.id === selectedId;
                        const email = item.username ?? item.email ?? '';

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => onSelect(item.id)}
                                aria-current={isSelected}
                                className={`flex w-full items-center gap-3 rounded-[6px] px-2.5 py-2 text-left transition-colors ${
                                    isSelected
                                        ? 'bg-secondary'
                                        : 'hover:bg-accent'
                                }`}
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-secondary text-sm font-medium text-secondary-foreground">
                                    {item.platform[0]}
                                </div>
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-medium text-foreground">
                                        {item.platform}
                                    </div>
                                    <div className="truncate text-xs text-muted-foreground">
                                        {email}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
