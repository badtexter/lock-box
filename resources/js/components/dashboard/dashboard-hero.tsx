import { Clock, KeyRound, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type DashboardHeroProps = {
    itemCount: number;
    latestPlatform?: string;
    onAdd: () => void;
};

export default function DashboardHero({
    itemCount,
    latestPlatform,
    onAdd,
}: DashboardHeroProps) {
    return (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
                <p className="mb-1 text-xs font-bold tracking-[0.25em] text-[#6D3FFF] uppercase dark:text-[#977DFF]">
                    LockBox Vault
                </p>

                <h1 className="text-3xl font-extrabold tracking-tight text-[#030812] dark:text-white">
                    Your passwords
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                    <Badge
                        variant="outline"
                        className="gap-1.5 rounded-full border-slate-300/80 bg-white px-3 py-1.5 font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70"
                    >
                        <KeyRound className="h-3.5 w-3.5 text-[#2B5CFF] dark:text-[#977DFF]" />
                        {itemCount}{' '}
                        {itemCount === 1 ? 'credential' : 'credentials'} stored
                    </Badge>

                    {latestPlatform ? (
                        <Badge
                            variant="outline"
                            className="gap-1.5 rounded-full border-slate-300/80 bg-white px-3 py-1.5 font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70"
                        >
                            <Clock className="h-3.5 w-3.5 text-[#2B5CFF] dark:text-[#977DFF]" />
                            Latest: {latestPlatform}
                        </Badge>
                    ) : null}
                </div>
            </div>

            <Button
                onClick={onAdd}
                className="h-[46px] rounded-full px-6 font-semibold text-white shadow-[0_10px_25px_rgba(43,92,255,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(43,92,255,0.45)]"
                style={{
                    background: 'linear-gradient(135deg,#2B5CFF,#8A5CFF)',
                }}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Password
            </Button>
        </div>
    );
}
