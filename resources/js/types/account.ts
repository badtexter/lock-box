export type Account = {
    id: number;
    platform: string;
    username?: string;
    email?: string;
    created_at: string;
    updated_at: string;
};

export type AccountFormValues = {
    platform: string;
    email: string;
    password: string;
};

export type AccountFormErrors = Partial<
    Record<keyof AccountFormValues, string>
>;

export type MasterPromptState = {
    action: 'copy' | 'reveal' | null;
    accountId: number | null;
    password: string;
    error?: string;
    loading: boolean;
};
