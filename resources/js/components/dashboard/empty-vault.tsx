import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export default function EmptyVault() {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/60 p-10 backdrop-blur-xl dark:bg-white/[0.03]">
            <PlaceholderPattern className="mx-auto mb-6 h-40 w-full max-w-xl" />

            <p className="text-center text-sm text-slate-500 dark:text-white/50">
                Your vault is empty. Add your first credential to get started.
            </p>
        </div>
    );
}
