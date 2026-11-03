import { RefreshCw } from 'lucide-react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
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
            <DialogContent className="max-w-xl overflow-hidden rounded-lg">
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-lg font-semibold">
                        {editingId ? 'Edit Password' : 'Add New Password'}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Store a new credential securely in your vault.
                    </p>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4 py-2">
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
                            className="h-10 rounded-[6px]"
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
                            placeholder="me@example.com" // taste-skill-ignore: input format hint (IANA example domain), not displayed data
                            required
                            className="h-10 rounded-[6px]"
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
                                className="h-8 rounded-[6px] px-3 text-sm"
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
                            className="h-10 rounded-[6px] font-mono" // taste-skill-ignore: a password field, not prose
                        />
                        <InputError message={formErrors.password} />
                        {passwordStrengthHint ? (
                            <p className="text-sm text-muted-foreground">
                                {passwordStrengthHint}
                            </p>
                        ) : null}
                    </div>

                    <DialogFooter className="justify-end gap-2">
                        <Button
                            variant="ghost"
                            onClick={onCancel}
                            className="rounded-[6px]"
                            type="button"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="rounded-[6px] px-5 font-medium"
                        >
                            Save Password
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
