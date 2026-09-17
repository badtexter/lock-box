import { toast } from 'sonner';

const CHARSETS = {
    uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    lowercase: 'abcdefghijkmnopqrstuvwxyz',
    numbers: '23456789',
    symbols: '!@#$%^&*_-+=?',
} as const;

const ALL_CHARS = Object.values(CHARSETS).join('');
const PASSWORD_LENGTH = 20;

function secureRandom(max: number): number {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % max;
}

function pickFrom(chars: string): string {
    return chars[secureRandom(chars.length)];
}

export function usePasswordGenerator() {
    const generate = (): string => {
        const required = Object.values(CHARSETS).map(pickFrom);

        const remaining = Array.from(
            { length: PASSWORD_LENGTH - required.length },
            () => pickFrom(ALL_CHARS),
        );

        const password = [...required, ...remaining]
            .sort(() => secureRandom(2) - 0.5)
            .join('');

        toast.success('Wygenerowano hasło');

        return password;
    };

    return { generate };
}
