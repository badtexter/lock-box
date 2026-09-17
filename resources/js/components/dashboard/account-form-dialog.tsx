import { RefreshCw } from 'lucide-react';
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
import PasswordInput from '@/components/password-input';
import type { AccountFormErrors, AccountFormValues } from '@/types';

type AccountFormDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    formValues: AccountFormValues;
    formErrors: AccountFormErrors;
    editingId: number | null;
    passwordStrengthHint: string;
    onFieldChange: <K extends keyof AccountFormValues>(
        field: K,
        value: AccountFormValues[K],
    ) => void;
    onGeneratePassword: () => string;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
};

export default function AccountFormDialog({
    open,
    onOpenChange,
    formValues,
    formErrors,
    editingId,
    passwordStrengthHint,
    onFieldChange,
    onGeneratePassword,
    onSubmit,
    onCancel,
}: AccountFormDialogProps) {
    const handleGenerate = () => {
        const password = onGeneratePassword();
        onFieldChange('password', password);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl overflow-hidden border-slate-200/70 bg-white/95 backdrop-blur-2xl dark:border-white/10 dark:bg-[#07103d]/95">
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-xl font-semibold">
                        {editingId ? 'Edit Password' : 'Add New Password'}
                    </DialogTitle>
                    <p className="text-sm text-slate-500 dark:text-white/50">
                        Store a new credential securely in your vault.
                    </p>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-5 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Input
                            id="platform"
                            name="platform"
                            value={formValues.platform}
                            onChange={(e) =>
                                onFieldChange('platform', e.target.value)
                            }
                            placeholder="GitHub"
                            required
                            className="h-12 rounded-xl border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]"
                        />
                        <InputError message={formErrors.platform} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formValues.email}
                            onChange={(e) =>
                                onFieldChange('email', e.target.value)
                            }
                            placeholder="me@example.com"
                            required
                            className="h-12 rounded-xl border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]"
                        />
                        <InputError message={formErrors.email} />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleGenerate}
                                className="h-9 rounded-lg px-3 text-sm"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Generate
                            </Button>
                        </div>
                        <PasswordInput
                            id="password"
                            name="password"
                            value={formValues.password}
                            onChange={(e) =>
                                onFieldChange('password', e.target.value)
                            }
                            placeholder="Generated or custom password"
                            required
                            className="h-12 rounded-xl border-slate-200 bg-white font-mono dark:border-white/10 dark:bg-white/[0.03]"
                        />
                        <InputError message={formErrors.password} />
                        {passwordStrengthHint ? (
                            <p className="text-sm text-slate-500 dark:text-white/50">
                                {passwordStrengthHint}
                            </p>
                        ) : null}
                    </div>

                    <DialogFooter className="justify-end gap-3">
                        <Button
                            variant="ghost"
                            onClick={onCancel}
                            className="rounded-xl"
                            type="button"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="rounded-xl text-white shadow-lg transition-all hover:brightness-110"
                            style={{
                                background:
                                    'linear-gradient(135deg,#2B5CFF,#977DFF)',
                            }}
                        >
                            Save Password
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
