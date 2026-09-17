import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            {/* Navbar */}
            <AppHeader />

            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden">{children}</div>
        </div>
    );
}
