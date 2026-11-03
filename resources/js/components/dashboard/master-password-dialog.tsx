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
            <DialogContent className="max-w-md rounded-lg">
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-lg font-semibold">
                        Confirm master password
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Enter your account password to continue.
                    </p>
                </DialogHeader>

                <form onSubmit={onConfirm} className="space-y-4 py-2">
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
                            className="h-10 rounded-[6px]"
                        />
                        <InputError message={prompt.error} />
                    </div>

                    <DialogFooter className="justify-end gap-2">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="rounded-[6px]"
                            type="button"
                            disabled={prompt.loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={prompt.loading}
                            className="rounded-[6px] px-5 font-medium"
                        >
                            {prompt.loading ? 'Confirming...' : 'Confirm'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
