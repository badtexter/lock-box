import { router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import type { Account, AccountFormErrors, AccountFormValues } from '@/types';

const EMPTY_FORM: AccountFormValues = {
    platform: '',
    email: '',
    password: '',
};

export function useAccountForm(onClose: () => void) {
    const [formValues, setFormValues] = useState<AccountFormValues>(EMPTY_FORM);
    const [formErrors, setFormErrors] = useState<AccountFormErrors>({});
    const [editingId, setEditingId] = useState<number | null>(null);

    const resetForm = () => {
        setFormValues(EMPTY_FORM);
        setFormErrors({});
        setEditingId(null);
    };

    const updateField = <K extends keyof AccountFormValues>(
        field: K,
        value: AccountFormValues[K],
    ) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
        setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const openEditModal = (accounts: Account[], id: number) => {
        const acc = accounts.find((a) => a.id === id);
        if (!acc) return;

        setEditingId(id);
        setFormValues({
            platform: acc.platform,
            email: acc.username ?? acc.email ?? '',
            password: '',
        });
    };

    const validateForm = (): boolean => {
        const errors: AccountFormErrors = {};

        if (!formValues.platform.trim()) {
            errors.platform = 'To pole jest wymagane.';
        }

        if (!formValues.email.trim()) {
            errors.email = 'To pole jest wymagane.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
            errors.email = 'Wprowadź poprawny adres e-mail.';
        }

        if (!formValues.password) {
            errors.password = 'To pole jest wymagane.';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) return;

        const payload = {
            platform: formValues.platform,
            email: formValues.email,
            password: formValues.password,
            username: formValues.email,
        };

        const onSuccess = () => {
            onClose();
            resetForm();
            toast.success(editingId ? 'Updated' : 'Saved');
            router.reload();
        };

        const onError = (errors: Record<string, string>) =>
            setFormErrors(errors as AccountFormErrors);

        if (editingId) {
            router.put(`/accounts/${editingId}`, payload, {
                preserveScroll: true,
                onSuccess,
                onError,
            });
        } else {
            router.post('/accounts', payload, {
                preserveScroll: true,
                onSuccess,
                onError,
            });
        }
    };

    return {
        formValues,
        formErrors,
        editingId,
        updateField,
        setFormValues,
        resetForm,
        openEditModal,
        handleSubmit,
    };
}
