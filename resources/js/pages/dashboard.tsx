import { Head, router, usePage } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import AccountFormDialog from '@/components/dashboard/account-form-dialog';
import DashboardBackground from '@/components/dashboard/dashboard-background';
import DashboardHero from '@/components/dashboard/dashboard-hero';
import EmptyVault from '@/components/dashboard/empty-vault';
import MasterPasswordDialog from '@/components/dashboard/master-password-dialog';
import PasswordGrid from '@/components/dashboard/password-grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAccountForm } from '@/hooks/use-account-form';
import { useMasterPassword } from '@/hooks/use-master-password';
import { usePasswordGenerator } from '@/hooks/use-password-generator';
import { usePasswordStrength } from '@/hooks/use-password-strength';
import type { Account } from '@/types';

export default function Dashboard() {
    const page = usePage<{ accounts: Account[] }>();
    const items = page.props.accounts ?? [];

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const form = useAccountForm(() => setIsOpen(false));
    const master = useMasterPassword();
    const { generate } = usePasswordGenerator();
    const passwordStrengthHint = usePasswordStrength(form.formValues.password);

    const filteredItems = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return items;

        return items.filter((item) => {
            const platform = item.platform.toLowerCase();
            const email = (item.username ?? item.email ?? '').toLowerCase();
            return platform.includes(query) || email.includes(query);
        });
    }, [items, searchTerm]);

    const handleEdit = (id: number) => {
        form.openEditModal(items, id);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (!confirm('Usuń ten wpis?')) return;

        router.delete(`/accounts/${id}`, {
            onSuccess: () => {
                toast.success('Usunięto');
                router.reload();
            },
            onError: () => toast.error('Błąd usuwania'),
        });
    };

    const handleCancel = () => {
        setIsOpen(false);
        form.resetForm();
    };

    return (
        <>
            <Head title="Dashboard" />

            <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#F5F8FF] dark:bg-[#00033D]">
                <DashboardBackground />

                <div className="relative z-10 p-6 lg:p-10">
                    <DashboardHero itemCount={items.length} />

                    {/* Search + Add */}
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="relative w-full md:max-w-md">
                            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search platform or email"
                                className="h-12 rounded-xl border-slate-200 bg-white/80 pl-11 dark:border-white/10 dark:bg-white/[0.03]"
                            />
                        </div>

                        <Button
                            onClick={() => setIsOpen(true)}
                            className="h-12 rounded-xl px-5 text-white shadow-lg transition-all hover:brightness-110"
                            style={{
                                background:
                                    'linear-gradient(135deg,#2B5CFF,#977DFF)',
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Password
                        </Button>
                    </div>

                    {/* Content */}
                    {items.length === 0 ? (
                        <EmptyVault />
                    ) : (
                        <PasswordGrid
                            items={items}
                            filteredItems={filteredItems}
                            revealedPasswords={master.revealedPasswords}
                            visibleIds={master.visibleIds}
                            onCopy={master.handleCopy}
                            onToggleReveal={master.handleToggleReveal}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>

            <AccountFormDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                formValues={form.formValues}
                formErrors={form.formErrors}
                editingId={form.editingId}
                passwordStrengthHint={passwordStrengthHint}
                onFieldChange={form.updateField}
                onGeneratePassword={generate}
                onSubmit={form.handleSubmit}
                onCancel={handleCancel}
            />

            <MasterPasswordDialog
                prompt={master.prompt}
                onClose={master.closePrompt}
                onConfirm={master.confirmMasterPassword}
                onPasswordChange={master.setPromptPassword}
            />
        </>
    );
}
