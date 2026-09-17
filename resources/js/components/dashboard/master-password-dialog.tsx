import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
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
            <DialogContent className="max-w-md border-slate-200/70 bg-white/95 backdrop-blur-2xl dark:border-white/10 dark:bg-[#07103d]/95">
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-xl font-semibold">
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
                            className="h-12 rounded-xl border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]"
                        />
                        <InputError message={prompt.error} />
                    </div>

                    <DialogFooter className="justify-end gap-3">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="rounded-xl"
                            type="button"
                            disabled={prompt.loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={prompt.loading}
                            className="rounded-xl text-white shadow-lg transition-all hover:brightness-110"
                            style={{
                                background:
                                    'linear-gradient(135deg,#2B5CFF,#977DFF)',
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
