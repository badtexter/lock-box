import { KeyRound, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type EmptyVaultProps = {
    onAdd: () => void;
};

export default function EmptyVault({ onAdd }: EmptyVaultProps) {
    return (
        <div className="flex flex-col items-center rounded-[2rem] border border-dashed border-slate-200/70 bg-white/60 p-14 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0033FF] to-[#977DFF]">
                <KeyRound className="h-8 w-8 text-white" />
            </div>

            <h3 className="mt-6 text-lg font-semibold text-[#030812] dark:text-white">
                Your vault is empty
            </h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-white/50">
                Add your first credential to start storing and organizing your
                passwords securely.
            </p>

            <Button
                onClick={onAdd}
                className="mt-6 h-11 rounded-xl px-5 text-white shadow-lg transition-all hover:brightness-110"
                style={{
                    background: 'linear-gradient(135deg,#2B5CFF,#977DFF)',
                }}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add your first password
            </Button>
        </div>
    );
}
