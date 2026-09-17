import { useMemo } from 'react';

export function usePasswordStrength(password: string): string {
    return useMemo(() => {
        if (!password) return '';

        const missing: string[] = [];

        if (password.length < 14) {
            missing.push('co najmniej 14 znaków');
        }

        if (!/[A-Z]/.test(password)) {
            missing.push('dużą literę');
        }

        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
            missing.push('znak specjalny');
        }

        if (missing.length === 0) return 'Hasło wygląda dobrze.';

        const joined = missing.join(', ').replace(/, ([^,]+)$/, ' i $1');

        return `Hasło będzie silniejsze jeśli dodasz ${joined}.`;
    }, [password]);
}
