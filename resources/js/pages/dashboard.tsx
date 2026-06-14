import { Head, router, usePage } from '@inertiajs/react';
import { Copy, Eye, MoreVertical, Plus, RefreshCw, Search } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

type PasswordItem = {
    id: number;
    platform: string;
    email: string;
    password: string;
};

function PasswordCard({
    item,
    revealed,
    visible,
    onCopy,
    onToggleReveal,
    onEdit,
    onDelete,
}: {
    item: PasswordItem;
    revealed?: string | null;
    visible?: boolean;
    onCopy?: (id: number) => void;
    onToggleReveal?: (id: number) => void;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}) {
    return (
        <div
            className="
                group
                w-full
                rounded-3xl
                border
                border-slate-200/70
                dark:border-white/10
                bg-white/80
                dark:bg-white/[0.03]
                p-5
                text-left
                backdrop-blur-xl
                transition-all
                hover:-translate-y-1
                hover:border-[#977DFF]/30
                hover:bg-white
                dark:hover:bg-white/[0.05]
            "
        >
            <div className="flex items-start justify-between">
                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-[#0033FF]
                        to-[#977DFF]
                        font-semibold
                        text-white
                    "
                >
                    {item.platform[0]}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => onEdit?.(item.id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onSelect={() => onDelete?.(item.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="mt-5">
                <h3 className="font-semibold text-[#030812] dark:text-white">
                    {item.platform}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
                    {item.email}
                </p>
            </div>

            <div className="mt-5 flex items-center justify-between">
                <span
                    className="
                        rounded-lg
                        bg-slate-100
                        dark:bg-white/5
                        px-3
                        py-1.5
                        font-mono
                        text-sm
                        text-slate-500
                        dark:text-white/50
                    "
                >
                    {visible ? revealed ?? '••••••••••' : '••••••••••'}
                </span>

                <div className="flex items-center gap-1">
                    <div className="rounded-lg p-2 text-slate-500 dark:text-white/50">
                        <button onClick={() => onCopy?.(item.id)} aria-label="Copy">
                            <Copy className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="rounded-lg p-2 text-slate-500 dark:text-white/50">
                        <button onClick={() => onToggleReveal?.(item.id)} aria-label="Reveal">
                            <Eye className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const page = usePage<any>();
    const items = (page.props && page.props.accounts) ? page.props.accounts : [];
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formValues, setFormValues] = useState({
        platform: '',
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState<{
        platform?: string;
        email?: string;
        password?: string;
    }>({});

    const [revealedPasswords, setRevealedPasswords] = useState<Record<number, string>>({});
    const [visibleIds, setVisibleIds] = useState<Record<number, boolean>>({});
    const [editingId, setEditingId] = useState<number | null>(null);
    const [masterPrompt, setMasterPrompt] = useState<{
        action: 'copy' | 'reveal' | null;
        accountId: number | null;
        password: string;
        error?: string;
        loading: boolean;
    }>({
        action: null,
        accountId: null,
        password: '',
        loading: false,
    });

    const filteredItems = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) {
            return items;
        }

        return items.filter((item: any) => {
            const platform = String(item.platform ?? '').toLowerCase();
            const email = String(item.username ?? item.email ?? '').toLowerCase();

            return platform.includes(query) || email.includes(query);
        });
    }, [items, searchTerm]);

    const generatePassword = () => {
        const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        const lowercase = 'abcdefghijkmnopqrstuvwxyz';
        const numbers = '23456789';
        const symbols = '!@#$%^&*_-+=?';
        const allCharacters = uppercase + lowercase + numbers + symbols;
        const getRandomCharacter = (characters: string) => {
            const randomValues = new Uint32Array(1);
            crypto.getRandomValues(randomValues);

            return characters[randomValues[0] % characters.length];
        };
        const requiredCharacters = [
            getRandomCharacter(uppercase),
            getRandomCharacter(lowercase),
            getRandomCharacter(numbers),
            getRandomCharacter(symbols),
        ];
        const remainingCharacters = Array.from({ length: 16 }, () => getRandomCharacter(allCharacters));
        const password = [...requiredCharacters, ...remainingCharacters]
            .sort(() => {
                const randomValues = new Uint32Array(1);
                crypto.getRandomValues(randomValues);

                return randomValues[0] / 2 ** 32 - 0.5;
            })
            .join('');

        setFormValues((previous) => ({ ...previous, password }));
        setFormErrors((previous) => ({ ...previous, password: undefined }));
        toast.success('Wygenerowano haslo');
    };

    const fetchReveal = async (id: number, masterPassword: string) => {
        const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
        const res = await fetch(`/accounts/${id}/reveal`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': tokenMeta?.content ?? '',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ master_password: masterPassword }),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => null);
            const message = data?.errors?.master_password?.[0] ?? data?.message ?? 'Nie można odsłonić hasła';

            toast.error(message);
            return null;
        }

        const data = await res.json();
        setRevealedPasswords((p) => ({ ...p, [id]: data.password }));
        return data.password;
    };

    const requestMasterPassword = (id: number, action: 'copy' | 'reveal') => {
        setMasterPrompt({
            action,
            accountId: id,
            password: '',
            loading: false,
        });
    };

    const closeMasterPrompt = () => {
        if (masterPrompt.loading) return;

        setMasterPrompt({
            action: null,
            accountId: null,
            password: '',
            loading: false,
        });
    };

    const confirmMasterPassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!masterPrompt.accountId || !masterPrompt.action) return;

        if (!masterPrompt.password) {
            setMasterPrompt((previous) => ({ ...previous, error: 'Podaj hasło główne.' }));
            return;
        }

        setMasterPrompt((previous) => ({ ...previous, error: undefined, loading: true }));
        const pwd = await fetchReveal(masterPrompt.accountId, masterPrompt.password);

        if (!pwd) {
            setMasterPrompt((previous) => ({ ...previous, loading: false }));
            return;
        }

        if (masterPrompt.action === 'copy') {
            try {
                await navigator.clipboard.writeText(pwd);
                toast.success('Skopiowano hasło');
            } catch (e) {
                toast.error('Nie udało się skopiować');
            }
        } else {
            const accountId = masterPrompt.accountId;
            setVisibleIds((p) => ({ ...p, [accountId]: true }));
            setTimeout(() => setVisibleIds((p) => ({ ...p, [accountId]: false })), 10000);
        }

        setMasterPrompt({
            action: null,
            accountId: null,
            password: '',
            loading: false,
        });
    };

    const handleCopy = async (id: number) => {
        requestMasterPassword(id, 'copy');
    };

    const handleToggleReveal = async (id: number) => {
        if (visibleIds[id]) {
            setVisibleIds((p) => ({ ...p, [id]: false }));
            return;
        }

        requestMasterPassword(id, 'reveal');
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

    const openEditModal = (id: number) => {
        const acc = items.find((a: any) => a.id === id);
        if (!acc) return;
        setEditingId(id);
        setFormValues({ platform: acc.platform, email: acc.username ?? acc.email ?? '', password: '' });
        setIsOpen(true);
    };

    const passwordStrengthHint = useMemo(() => {
        const missing: string[] = [];

        if (formValues.password.length > 0 && formValues.password.length < 14) {
            missing.push('co najmniej 14 znaków');
        }

        if (formValues.password.length > 0 && !/[A-Z]/.test(formValues.password)) {
            missing.push('dużą literę');
        }

        if (
            formValues.password.length > 0 &&
            !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formValues.password)
        ) {
            missing.push('znak specjalny');
        }

        if (!formValues.password) {
            return '';
        }

        return missing.length > 0
            ? `Hasło będzie silniejsze jeśli dodasz ${missing
                  .join(', ')
                  .replace(/, ([^,]+)$/, ' i $1')}.`
            : 'Hasło wygląda dobrze.';
    }, [formValues.password]);

    const validateForm = () => {
        const errors: {
            platform?: string;
            email?: string;
            password?: string;
        } = {};

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

        if (!validateForm()) {
            return;
        }

        const payload = {
            platform: formValues.platform,
            email: formValues.email,
            password: formValues.password,
            username: formValues.email,
        };

        if (editingId) {
            router.put(`/accounts/${editingId}`, payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsOpen(false);
                    setEditingId(null);
                    setFormValues({ platform: '', email: '', password: '' });
                    setFormErrors({});
                    toast.success('Updated');
                    router.reload();
                },
                onError: (errors) => setFormErrors(errors as typeof formErrors),
            });
        } else {
            router.post('/accounts', payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsOpen(false);
                    setFormValues({ platform: '', email: '', password: '' });
                    setFormErrors({});
                    toast.success('Saved');
                    router.reload();
                },
                onError: (errors) => setFormErrors(errors as typeof formErrors),
            });
        }
    };

    return (
        <>
            <Head title="Dashboard" />

            <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#F5F8FF] dark:bg-[#00033D]">

                {/* Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">

                    <div
                        className="absolute inset-0 opacity-40 dark:opacity-20"
                        style={{
                            backgroundImage: `
                                radial-gradient(
                                    rgba(151,125,255,0.35) 1px,
                                    transparent 1px
                                )
                            `,
                            backgroundSize: '32px 32px',
                        }}
                    />

                    <div
                        className="
                            absolute
                            right-[-250px]
                            top-[-150px]
                            h-[800px]
                            w-[800px]
                            rounded-full
                        "
                        style={{
                            background: `
                                radial-gradient(
                                    circle,
                                    rgba(151,125,255,.18),
                                    rgba(0,51,255,.08),
                                    transparent 70%
                                )
                            `,
                        }}
                    />

                    <div
                        className="
                            absolute
                            left-[-350px]
                            bottom-[-300px]
                            h-[900px]
                            w-[900px]
                            rounded-full
                        "
                        style={{
                            background: `
                                radial-gradient(
                                    circle,
                                    rgba(0,51,255,.10),
                                    transparent 70%
                                )
                            `,
                        }}
                    />

                </div>

                <div className="relative z-10 p-6 lg:p-10">

                    {/* Hero */}
                    <div className="mb-10">

                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[#977DFF]">
                            LockBox Vault
                        </p>

                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#030812] dark:text-white">
                            Manage your passwords
                            <br />
                            securely.
                        </h1>

                        <p className="mt-4 max-w-2xl text-slate-600 dark:text-white/60">
                            Store, organize and access all your credentials from one secure place.
                        </p>

                        <div className="mt-6 flex items-center gap-6 text-sm text-slate-500 dark:text-white/50">
                            <span>{items.length} credentials stored</span>
                            <span>Protected by encryption</span>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="relative w-full md:max-w-md">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search platform or email"
                                className="
                                    h-12
                                    rounded-xl
                                    border-slate-200
                                    bg-white/80
                                    pl-11
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                "
                            />
                        </div>

                        <Button
                            onClick={() => setIsOpen(true)}
                            className="
                                h-12
                                rounded-xl
                                px-5
                                text-white
                                shadow-lg
                                transition-all
                                hover:brightness-110
                            "
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
                        <div
                            className="
                                rounded-[2rem]
                                border
                                border-white/10
                                bg-white/60
                                dark:bg-white/[0.03]
                                p-10
                                backdrop-blur-xl
                            "
                        >
                            <PlaceholderPattern className="mx-auto mb-6 h-40 w-full max-w-xl" />

                            <p className="text-center text-sm text-slate-500 dark:text-white/50">
                                Your vault is empty. Add your first credential to get started.
                            </p>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div
                            className="
                                rounded-[2rem]
                                border
                                border-white/10
                                bg-white/60
                                dark:bg-white/[0.03]
                                p-10
                                text-center
                                backdrop-blur-xl
                            "
                        >
                            <p className="text-sm text-slate-500 dark:text-white/50">
                                No credentials match your search.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {filteredItems.map((item: any) => (
                                <PasswordCard
                                    key={item.id}
                                    item={{
                                        id: item.id,
                                        platform: item.platform,
                                        email: item.username ?? item.email ?? '',
                                        password: '••••••••••',
                                    }}
                                    revealed={revealedPasswords[item.id]}
                                    visible={!!visibleIds[item.id]}
                                    onCopy={handleCopy}
                                    onToggleReveal={handleToggleReveal}
                                    onEdit={openEditModal}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>

            { /* Add new Password Dialog */ }
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="
                    overflow-hidden
                    max-w-xl
                    border-slate-200/70
                    bg-white/95
                    dark:border-white/10
                    dark:bg-[#07103d]/95
                    backdrop-blur-2xl
                ">
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-xl font-semibold">
                            Add New Password
                        </DialogTitle>
                        <p className="text-sm text-slate-500 dark:text-white/50">
                            Store a new credential securely in your vault.
                        </p>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-5 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="platform">Platform</Label>
                            <Input
                                id="platform"
                                name="platform"
                                value={formValues.platform}
                                onChange={(event) =>
                                    setFormValues((previous) => ({
                                        ...previous,
                                        platform: event.target.value,
                                    }))
                                }
                                placeholder="GitHub"
                                required
                                className="
                                    h-12
                                    rounded-xl
                                    border-slate-200
                                    bg-white
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                "
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
                                onChange={(event) =>
                                    setFormValues((previous) => ({
                                        ...previous,
                                        email: event.target.value,
                                    }))
                                }
                                placeholder="me@example.com"
                                required
                                className="
                                    h-12
                                    rounded-xl
                                    border-slate-200
                                    bg-white
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                "
                            />
                            <InputError message={formErrors.email} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={generatePassword}
                                    className="h-9 rounded-lg px-3 text-sm"
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Generate
                                </Button>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="text"
                                value={formValues.password}
                                onChange={(event) =>
                                    setFormValues((previous) => ({
                                        ...previous,
                                        password: event.target.value,
                                    }))
                                }
                                placeholder="Generated or custom password"
                                required
                                className="
                                    h-12
                                    rounded-xl
                                    border-slate-200
                                    bg-white
                                    font-mono
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                "
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
                                onClick={() => {
                                    setIsOpen(false);
                                    setFormErrors({});
                                }}
                                className="rounded-xl"
                                type="button"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="
                                    rounded-xl
                                    text-white
                                    shadow-lg
                                    transition-all
                                    hover:brightness-110
                                "
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

            <Dialog open={!!masterPrompt.action} onOpenChange={(open) => !open && closeMasterPrompt()}>
                <DialogContent className="
                    max-w-md
                    border-slate-200/70
                    bg-white/95
                    dark:border-white/10
                    dark:bg-[#07103d]/95
                    backdrop-blur-2xl
                ">
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-xl font-semibold">
                            Confirm master password
                        </DialogTitle>
                        <p className="text-sm text-slate-500 dark:text-white/50">
                            Enter your account password to continue.
                        </p>
                    </DialogHeader>

                    <form onSubmit={confirmMasterPassword} className="space-y-5 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="master-password">Master password</Label>
                            <Input
                                id="master-password"
                                name="master_password"
                                type="password"
                                value={masterPrompt.password}
                                onChange={(event) =>
                                    setMasterPrompt((previous) => ({
                                        ...previous,
                                        password: event.target.value,
                                        error: undefined,
                                    }))
                                }
                                autoFocus
                                disabled={masterPrompt.loading}
                                className="
                                    h-12
                                    rounded-xl
                                    border-slate-200
                                    bg-white
                                    dark:border-white/10
                                    dark:bg-white/[0.03]
                                "
                            />
                            <InputError message={masterPrompt.error} />
                        </div>

                        <DialogFooter className="justify-end gap-3">
                            <Button
                                variant="ghost"
                                onClick={closeMasterPrompt}
                                className="rounded-xl"
                                type="button"
                                disabled={masterPrompt.loading}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={masterPrompt.loading}
                                className="
                                    rounded-xl
                                    text-white
                                    shadow-lg
                                    transition-all
                                    hover:brightness-110
                                "
                                style={{
                                    background:
                                        'linear-gradient(135deg,#2B5CFF,#977DFF)',
                                }}
                            >
                                {masterPrompt.loading ? 'Confirming...' : 'Confirm'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
