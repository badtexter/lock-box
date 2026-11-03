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
        <div className="min-w-[280px] flex-[1_1_320px] rounded-3xl border border-slate-300/70 bg-white/95 p-4 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
            <div className="relative mb-3">
                <label htmlFor="password-search" className="sr-only">
                    Search
                </label>
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                    id="password-search"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search platform or email"
                    className="h-11 rounded-xl border-slate-300 bg-white pl-10 dark:border-white/10 dark:bg-white/[0.03]"
                />
            </div>

            {items.length > 0 && filteredItems.length === 0 ? (
                <p className="px-2 py-6 text-center text-sm text-slate-500 dark:text-white/50">
                    No credentials match your search.
                </p>
            ) : (
                <div className="space-y-1">
                    {filteredItems.map((item) => {
                        const isSelected = item.id === selectedId;
                        const email = item.username ?? item.email ?? '';

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => onSelect(item.id)}
                                aria-current={isSelected}
                                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-[#977DFF]/10 ${
                                    isSelected
                                        ? 'bg-[#977DFF]/20 shadow-[inset_3px_0_0_0_#6D3FFF]'
                                        : ''
                                }`}
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0033FF] to-[#977DFF] text-sm font-bold text-white">
                                    {item.platform[0]}
                                </div>
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold text-[#030812] dark:text-white">
                                        {item.platform}
                                    </div>
                                    <div className="truncate text-xs text-slate-500 dark:text-white/50">
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
