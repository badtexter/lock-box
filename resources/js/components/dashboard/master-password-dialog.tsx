import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { MasterPromptState } from '@/types';

type MasterPasswordDialogProps = {
    prompt: MasterPromptState;
    onClose: () => void;
    onConfirm: (event: FormEvent<HTMLFormElement>) => void;
    onPasswordChange: (value: string) => void;
};

export default function MasterPasswordDialog({
    prompt,
    onClose,
    onConfirm,
    onPasswordChange,
}: MasterPasswordDialogProps) {
    return (
        <Dialog
            open={!!prompt.action}
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogContent className="max-w-md rounded-3xl border-slate-300/80 bg-white shadow-2xl shadow-slate-900/20 dark:border-white/10 dark:bg-[#0b0f2f]">
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-xl font-extrabold">
                        Confirm master password
                    </DialogTitle>
                    <p className="text-sm text-slate-500 dark:text-white/50">
                        Enter your account password to continue.
                    </p>
                </DialogHeader>

                <form onSubmit={onConfirm} className="space-y-5 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="master-password">Master password</Label>
                        <Input
                            id="master-password"
                            name="master_password"
                            type="password"
                            value={prompt.password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                            autoFocus
                            disabled={prompt.loading}
                            className="h-12 rounded-xl border-slate-300 bg-white dark:border-white/10 dark:bg-white/[0.03]"
                        />
                        <InputError message={prompt.error} />
                    </div>

                    <DialogFooter className="justify-end gap-3">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="rounded-full"
                            type="button"
                            disabled={prompt.loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={prompt.loading}
                            className="rounded-full px-6 font-semibold text-white shadow-[0_10px_25px_rgba(43,92,255,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(43,92,255,0.45)]"
                            style={{
                                background:
                                    'linear-gradient(135deg,#2B5CFF,#8A5CFF)',
                            }}
                        >
                            {prompt.loading ? 'Confirming...' : 'Confirm'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
