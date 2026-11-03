import { KeyRound, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type DashboardHeroProps = {
    itemCount: number;
};

export default function DashboardHero({ itemCount }: DashboardHeroProps) {
    return (
        <div className="mb-10">
            <p className="mb-3 text-sm font-medium tracking-[0.25em] text-[#977DFF] uppercase">
                LockBox Vault
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-[#030812] md:text-5xl dark:text-white">
                Manage your passwords
                <br />
                securely.
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600 dark:text-white/60">
                Store, organize and access all your credentials from one secure
                place.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge
                    variant="outline"
                    className="gap-1.5 rounded-full border-slate-200 bg-white/80 px-3 py-1.5 text-slate-600 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60"
                >
                    <KeyRound className="h-3.5 w-3.5 text-[#2B5CFF] dark:text-[#977DFF]" />
                    {itemCount} credentials stored
                </Badge>

                <Badge
                    variant="outline"
                    className="gap-1.5 rounded-full border-slate-200 bg-white/80 px-3 py-1.5 text-slate-600 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60"
                >
                    <ShieldCheck className="h-3.5 w-3.5 text-[#2B5CFF] dark:text-[#977DFF]" />
                    Protected by encryption
                </Badge>
            </div>
        </div>
    );
}
