type DashboardHeroProps = {
    itemCount: number;
};

export default function DashboardHero({ itemCount }: DashboardHeroProps) {
    return (
        <div className="mb-10">
            <p className="mb-3 text-sm font-medium tracking-[0.25em] text-[#977DFF] uppercase">
                LockBox Vault
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-[#030812] md:text-5xl dark:text-white">
                Manage your passwords
                <br />
                securely.
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600 dark:text-white/60">
                Store, organize and access all your credentials from one secure
                place.
            </p>

            <div className="mt-6 flex items-center gap-6 text-sm text-slate-500 dark:text-white/50">
                <span>{itemCount} credentials stored</span>
                <span>Protected by encryption</span>
            </div>
        </div>
    );
}
