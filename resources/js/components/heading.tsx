export default function Heading({
    title,
    description,
    variant = 'default',
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    return (
        <header className={variant === 'small' ? '' : 'mb-6 space-y-1'}>
            <h2
                className={
                    variant === 'small'
                        ? 'mb-0.5 font-display text-base font-bold text-[#030812] dark:text-white'
                        : 'font-display text-3xl font-bold tracking-tight text-[#030812] dark:text-white'
                }
            >
                {title}
            </h2>
            {description && (
                <p className="text-sm text-slate-500 dark:text-white/50">
                    {description}
                </p>
            )}
        </header>
    );
}
