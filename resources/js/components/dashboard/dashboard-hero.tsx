import { Plus } from 'lucide-react';
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
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Your passwords
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {itemCount} {itemCount === 1 ? 'credential' : 'credentials'}{' '}
                    stored
                    {latestPlatform ? ` · latest: ${latestPlatform}` : ''}
                </p>
            </div>

            <Button
                onClick={onAdd}
                className="h-9 rounded-[6px] px-4 text-sm font-medium"
            >
                <Plus className="mr-1.5 h-4 w-4" />
                Add password
            </Button>
        </div>
    );
}
