import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import DashboardBackground from '@/components/dashboard/dashboard-background';
import Heading from '@/components/heading';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: null,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <>
            <div className="fixed inset-0 z-0 overflow-hidden bg-[#F5F8FF] dark:bg-[#00033D]">
                <DashboardBackground />
            </div>

            <div className="relative z-10 min-h-[calc(100vh-3.5rem)]">
                <div className="mx-auto max-w-5xl p-6 lg:p-10">
                    <Heading
                        title="Settings"
                        description="Manage your profile and account settings"
                    />

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                        <aside className="w-full rounded-3xl border border-slate-300/70 bg-white/95 p-3 shadow-xl shadow-slate-900/10 lg:w-56 lg:shrink-0 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
                            <nav
                                className="flex flex-col gap-1"
                                aria-label="Settings"
                            >
                                {sidebarNavItems.map((item, index) => {
                                    const isActive = isCurrentOrParentUrl(
                                        item.href,
                                    );

                                    return (
                                        <Link
                                            key={`${toUrl(item.href)}-${index}`}
                                            href={item.href}
                                            className={cn(
                                                'flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                                                isActive
                                                    ? 'bg-[#977DFF]/15 text-[#030812] dark:bg-[#977DFF]/15 dark:text-white'
                                                    : 'text-slate-500 hover:bg-slate-100 dark:text-white/50 dark:hover:bg-white/10',
                                            )}
                                        >
                                            {item.icon && (
                                                <item.icon className="h-4 w-4" />
                                            )}
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </aside>

                        <div className="min-w-0 flex-1 rounded-3xl border border-slate-300/70 bg-white/95 p-8 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
                            <section className="max-w-xl space-y-12">
                                {children}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
