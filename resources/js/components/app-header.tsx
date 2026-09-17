import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, LogOut, Menu, Moon, Settings, User } from 'lucide-react';
import { SunIcon } from '@/components/sun-icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance';
import { useInitials } from '@/hooks/use-initials';
import { dashboard } from '@/routes';

type Props = {
    breadcrumbs?: Array<{ label: string; href?: string }>;
};

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { appearance, updateAppearance } = useAppearance();

    return (
        <>
            <div className="sticky top-0 z-50 border-b border-white/10 bg-white/60 backdrop-blur-2xl dark:border-white/5 dark:bg-[#00033D]/60">
                <div className="mx-auto flex h-16 items-center justify-between px-4 md:max-w-7xl">
                    {/* LEFT - BRAND */}
                    <Link
                        href={dashboard()}
                        prefetch
                        className="flex items-center gap-3 font-semibold text-[#030812] dark:text-white"
                    >
                        <span className="text-lg tracking-tight">LockBox</span>
                    </Link>

                    {/* RIGHT - USER + MOBILE MENU */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                updateAppearance(
                                    appearance === 'light' ? 'dark' : 'light',
                                )
                            }
                            title="Toggle theme"
                        >
                            {appearance === 'light' ? (
                                <SunIcon className="h-5 w-5 text-amber-500" />
                            ) : (
                                <Moon className="h-5 w-5 text-white" />
                            )}
                        </Button>

                        {/* Avatar / User Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={(auth.user as any)?.avatar_url}
                                            alt={(auth.user as any)?.name}
                                        />
                                        <AvatarFallback className="bg-gradient-to-br from-[#0033FF] to-[#977DFF] text-white">
                                            {getInitials(
                                                (auth.user as any)?.name,
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 border border-white/10 bg-white/90 p-2 backdrop-blur-xl dark:bg-[#0b0f2f]/90"
                            >
                                {/* USER INFO */}
                                <div className="mb-2 border-b border-white/10 px-3 py-2">
                                    <p className="text-sm font-medium text-[#030812] dark:text-white">
                                        {(auth.user as any)?.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-white/60">
                                        {(auth.user as any)?.email}
                                    </p>
                                </div>

                                {/* PROFILE - not active yet*/}
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#030812] transition hover:bg-white/60 dark:text-white dark:hover:bg-white/10"
                                >
                                    <User className="h-4 w-4" />
                                    Profile
                                </Link>

                                {/* SETTINGS */}
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#030812] transition hover:bg-white/60 dark:text-white dark:hover:bg-white/10"
                                >
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </Link>

                                {/* LOGOUT */}
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 transition hover:bg-red-500/10"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </>
    );
}
