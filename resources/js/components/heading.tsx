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
                        ? 'mb-0.5 text-base font-semibold text-foreground'
                        : 'text-2xl font-semibold tracking-tight text-foreground'
                }
            >
                {title}
            </h2>
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </header>
    );
}
