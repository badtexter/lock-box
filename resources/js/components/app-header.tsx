import { Link, usePage } from '@inertiajs/react';
import { LogOut, Moon, Settings, Sun } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { useInitials } from '@/hooks/use-initials';
import { dashboard } from '@/routes';

export function AppHeader() {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className="sticky top-3 z-50 mx-auto mt-3 w-full max-w-md px-4">
            <div className="flex h-12 items-center justify-between rounded-full border border-border bg-card px-4 shadow-sm">
                {/* LEFT - BRAND */}
                <Link
                    href={dashboard()}
                    prefetch
                    className="flex items-center gap-2.5 text-foreground"
                >
                    <span className="brand-gradient flex h-6 w-6 items-center justify-center rounded-[4px] text-[11px] font-semibold text-white">
                        L
                    </span>
                    <span className="text-[15px] font-medium tracking-tight">
                        LockBox
                    </span>
                </Link>

                {/* RIGHT - USER + MOBILE MENU */}
                <div className="flex items-center gap-1">
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                            updateAppearance(
                                appearance === 'light' ? 'dark' : 'light',
                            )
                        }
                        title="Toggle theme"
                    >
                        {appearance === 'light' ? (
                            <Sun className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Moon className="h-4 w-4 text-muted-foreground" />
                        )}
                    </Button>

                    {/* Avatar / User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-7 w-7">
                                    <AvatarImage
                                        src={(auth.user as any)?.avatar_url}
                                        alt={(auth.user as any)?.name}
                                    />
                                    <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
                                        {getInitials((auth.user as any)?.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {/* USER INFO */}
                            <div className="mb-2 border-b border-border px-3 py-2">
                                <p className="text-sm font-medium text-foreground">
                                    {(auth.user as any)?.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {(auth.user as any)?.email}
                                </p>
                            </div>

                            {/* SETTINGS */}
                            <Link
                                href="/settings"
                                className="flex items-center gap-2 rounded-[6px] px-3 py-2 text-sm hover:bg-accent"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>

                            {/* LOGOUT */}
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-left text-sm text-[#c4242a] hover:bg-[#ffedea] dark:text-[#e5566f] dark:hover:bg-[#2c1a20]"
                            >
                                <LogOut className="h-4 w-4" />
                                Log out
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
