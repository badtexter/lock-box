import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Navbar */}
            <AppHeader breadcrumbs={breadcrumbs} />
            
            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden">
                {children}
            </div>
        </div>
    );
}
