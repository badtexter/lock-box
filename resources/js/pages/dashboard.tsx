import { Head, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import AccountFormDialog from '@/components/dashboard/account-form-dialog';
import DashboardHero from '@/components/dashboard/dashboard-hero';
import EmptyVault from '@/components/dashboard/empty-vault';
import MasterPasswordDialog from '@/components/dashboard/master-password-dialog';
import PasswordDetail from '@/components/dashboard/password-detail';
import PasswordSidebar from '@/components/dashboard/password-sidebar';
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
    const [selectedId, setSelectedId] = useState<number | null>(
        items[0]?.id ?? null,
    );

    const form = useAccountForm(() => setIsOpen(false));
    const master = useMasterPassword();
    const { generate } = usePasswordGenerator();
    const passwordStrengthHint = usePasswordStrength(form.formValues.password);

    const filteredItems = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) {
            return items;
        }

        return items.filter((item) => {
            const platform = item.platform.toLowerCase();
            const email = (item.username ?? item.email ?? '').toLowerCase();

            return platform.includes(query) || email.includes(query);
        });
    }, [items, searchTerm]);

    const selected =
        items.find((item) => item.id === selectedId) ?? items[0] ?? null;

    const latest = useMemo(() => {
        if (items.length === 0) {
            return null;
        }

        return items.reduce((latestItem, item) =>
            new Date(item.created_at) > new Date(latestItem.created_at)
                ? item
                : latestItem,
        );
    }, [items]);

    const handleEdit = (id: number) => {
        form.openEditModal(items, id);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (!confirm('Delete this entry?')) {
            return;
        }

        router.delete(`/accounts/${id}`, {
            onSuccess: () => {
                toast.success('Deleted');
                router.reload();
            },
            onError: () => toast.error('Failed to delete'),
        });
    };

    const handleCancel = () => {
        setIsOpen(false);
        form.resetForm();
    };

    const handleAdd = () => {
        form.resetForm();
        setIsOpen(true);
    };

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-[calc(100vh-3.75rem)]">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    <DashboardHero
                        itemCount={items.length}
                        latestPlatform={latest?.platform}
                        onAdd={handleAdd}
                    />

                    {items.length === 0 ? (
                        <EmptyVault onAdd={handleAdd} />
                    ) : (
                        <div className="flex flex-wrap items-start gap-5">
                            <PasswordSidebar
                                items={items}
                                filteredItems={filteredItems}
                                selectedId={selected?.id ?? null}
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                onSelect={setSelectedId}
                            />

                            {selected ? (
                                <PasswordDetail
                                    account={selected}
                                    revealed={
                                        master.revealedPasswords[selected.id]
                                    }
                                    visible={!!master.visibleIds[selected.id]}
                                    onCopy={master.handleCopy}
                                    onToggleReveal={master.handleToggleReveal}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ) : null}
                        </div>
                    )}
                </div>
            </div>

            <AccountFormDialog
                open={isOpen}
                onOpenChange={(open) =>
                    open ? setIsOpen(true) : handleCancel()
                }
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
