import { useMemo } from 'react';

export function usePasswordStrength(password: string): string {
    return useMemo(() => {
        if (!password) return '';

        const missing: string[] = [];

        if (password.length < 14) {
            missing.push('at least 14 characters');
        }

        if (!/[A-Z]/.test(password)) {
            missing.push('an uppercase letter');
        }

        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
            missing.push('a special character');
        }

        if (missing.length === 0) return 'Looks good.';

        const joined = missing.join(', ').replace(/, ([^,]+)$/, ' and $1');

        return `Add ${joined} to make it stronger.`;
    }, [password]);
}
