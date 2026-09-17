import { FormEvent, useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import type { MasterPromptState } from '@/types';

const INITIAL_STATE: MasterPromptState = {
    action: null,
    accountId: null,
    password: '',
    loading: false,
};

const REVEAL_DURATION_MS = 10_000;

async function fetchRevealedPassword(
    id: number,
    masterPassword: string,
): Promise<string | null> {
    const tokenMeta = document.querySelector(
        'meta[name="csrf-token"]',
    ) as HTMLMetaElement | null;

    const res = await fetch(`/accounts/${id}/reveal`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': tokenMeta?.content ?? '',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ master_password: masterPassword }),
    });

    if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message =
            data?.errors?.master_password?.[0] ??
            data?.message ??
            'Nie można odsłonić hasła';
        toast.error(message);
        return null;
    }

    const data = await res.json();
    return data.password;
}

export function useMasterPassword() {
    const [prompt, setPrompt] = useState<MasterPromptState>(INITIAL_STATE);
    const [revealedPasswords, setRevealedPasswords] = useState<
        Record<number, string>
    >({});
    const [visibleIds, setVisibleIds] = useState<Record<number, boolean>>({});
    const timersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

    const requestMasterPassword = useCallback(
        (id: number, action: 'copy' | 'reveal') => {
            setPrompt({
                action,
                accountId: id,
                password: '',
                loading: false,
            });
        },
        [],
    );

    const closePrompt = useCallback(() => {
        setPrompt((prev) => {
            if (prev.loading) return prev;
            return INITIAL_STATE;
        });
    }, []);

    const confirmMasterPassword = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const { accountId, action, password } = prompt;
            if (!accountId || !action) return;

            if (!password) {
                setPrompt((prev) => ({
                    ...prev,
                    error: 'Podaj hasło główne.',
                }));
                return;
            }

            setPrompt((prev) => ({
                ...prev,
                error: undefined,
                loading: true,
            }));

            const pwd = await fetchRevealedPassword(accountId, password);

            if (!pwd) {
                setPrompt((prev) => ({ ...prev, loading: false }));
                return;
            }

            setRevealedPasswords((prev) => ({ ...prev, [accountId]: pwd }));

            if (action === 'copy') {
                try {
                    await navigator.clipboard.writeText(pwd);
                    toast.success('Skopiowano hasło');
                } catch {
                    toast.error('Nie udało się skopiować');
                }
            } else {
                setVisibleIds((prev) => ({ ...prev, [accountId]: true }));

                // Clear any existing timer for this account
                if (timersRef.current[accountId]) {
                    clearTimeout(timersRef.current[accountId]);
                }

                timersRef.current[accountId] = setTimeout(() => {
                    setVisibleIds((prev) => ({
                        ...prev,
                        [accountId]: false,
                    }));
                    delete timersRef.current[accountId];
                }, REVEAL_DURATION_MS);
            }

            setPrompt(INITIAL_STATE);
        },
        [prompt],
    );

    const handleCopy = useCallback(
        (id: number) => requestMasterPassword(id, 'copy'),
        [requestMasterPassword],
    );

    const handleToggleReveal = useCallback(
        (id: number) => {
            if (visibleIds[id]) {
                setVisibleIds((prev) => ({ ...prev, [id]: false }));
                if (timersRef.current[id]) {
                    clearTimeout(timersRef.current[id]);
                    delete timersRef.current[id];
                }
                return;
            }
            requestMasterPassword(id, 'reveal');
        },
        [visibleIds, requestMasterPassword],
    );

    const setPromptPassword = useCallback((value: string) => {
        setPrompt((prev) => ({
            ...prev,
            password: value,
            error: undefined,
        }));
    }, []);

    return {
        prompt,
        revealedPasswords,
        visibleIds,
        closePrompt,
        confirmMasterPassword,
        handleCopy,
        handleToggleReveal,
        setPromptPassword,
    };
}
