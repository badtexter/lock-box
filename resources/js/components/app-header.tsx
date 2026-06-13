import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, LogOut, Menu, Settings, User } from 'lucide-react';
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
import { useInitials } from '@/hooks/use-initials';
import { dashboard } from '@/routes';

type Props = {
    breadcrumbs?: Array<{ label: string; href?: string }>;
};


export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();

    return (
        <>
            <div className="sticky top-0 z-50 backdrop-blur-2xl bg-white/60 dark:bg-[#00033D]/60 border-b border-white/10 dark:border-white/5">
                <div className="mx-auto flex h-16 items-center justify-between px-4 md:max-w-7xl">

                    {/* LEFT - BRAND */}
                    <Link
                        href={dashboard()}
                        prefetch
                        className="flex items-center gap-3 font-semibold text-[#030812] dark:text-white"
                    >
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0033FF] to-[#977DFF]" />
                        <span className="text-lg tracking-tight">
                            LockBox
                        </span>
                    </Link>

                    {/* CENTER - NAV */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href={dashboard()}
                            className="
                                px-4 py-2 rounded-xl text-sm font-medium
                                bg-white/40 dark:bg-white/5
                                hover:bg-white/60 dark:hover:bg-white/10
                                transition
                                text-[#030812] dark:text-white
                            "
                        >
                            <LayoutGrid className="inline w-4 h-4 mr-2" />
                            Dashboard
                        </Link>
                    </div>

                    {/* RIGHT - USER + MOBILE MENU */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <Sheet>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-white/90 dark:bg-[#0b0f2f]/90 backdrop-blur-xl">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <div className="mt-4 space-y-2">
                                    <Link
                                        href={dashboard()}
                                        className="
                                            flex items-center gap-2
                                            px-3 py-2 rounded-lg
                                            text-sm
                                            text-[#030812] dark:text-white
                                            hover:bg-white/60 dark:hover:bg-white/10
                                            transition
                                        "
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Avatar / User Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={(auth.user as any)?.avatar_url} alt={(auth.user as any)?.name} />
                                        <AvatarFallback className="bg-gradient-to-br from-[#0033FF] to-[#977DFF] text-white">
                                            {getInitials((auth.user as any)?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="
                                    w-56
                                    p-2
                                    bg-white/90 dark:bg-[#0b0f2f]/90
                                    backdrop-blur-xl
                                    border border-white/10
                                "
                            >
                                {/* USER INFO */}
                                <div className="px-3 py-2 border-b border-white/10 mb-2">
                                    <p className="text-sm font-medium text-[#030812] dark:text-white">
                                        {(auth.user as any)?.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-white/60">
                                        {(auth.user as any)?.email}
                                    </p>
                                </div>

                                {/* PROFILE */}
                                <Link
                                    href="/profile"
                                    className="
                                        flex items-center gap-2
                                        px-3 py-2 rounded-lg
                                        text-sm
                                        text-[#030812] dark:text-white
                                        hover:bg-white/60 dark:hover:bg-white/10
                                        transition
                                    "
                                >
                                    <User className="w-4 h-4" />
                                    Profile
                                </Link>

                                {/* SETTINGS */}
                                <Link
                                    href="/settings"
                                    className="
                                        flex items-center gap-2
                                        px-3 py-2 rounded-lg
                                        text-sm
                                        text-[#030812] dark:text-white
                                        hover:bg-white/60 dark:hover:bg-white/10
                                        transition
                                    "
                                >
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </Link>

                                {/* LOGOUT */}
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="
                                        flex items-center gap-2
                                        px-3 py-2 rounded-lg
                                        text-sm text-red-500
                                        hover:bg-red-500/10
                                        transition
                                        w-full text-left
                                    "
                                >
                                    <LogOut className="w-4 h-4" />
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
