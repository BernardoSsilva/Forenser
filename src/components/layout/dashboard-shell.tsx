'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, ShieldCheck } from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeToggle } from '@/components/theme-toggle';
import { SidebarNav } from './sidebar-nav';
import { UserMenu } from './user-menu';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { cn } from '@/lib/utils';

function BrandLink({ className }: { className?: string }) {
  return (
    <Link href="/dashboard" className={cn('flex items-center gap-2.5 font-bold', className)}>
      <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg shadow-sm">
        <ShieldCheck className="size-4.5" />
      </span>
      <span className="text-base tracking-tight">Forenser</span>
    </Link>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isLoading } = useRequireAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="bg-secondary/25 dark:bg-background flex min-h-screen">
      <aside className="bg-card hidden w-64 shrink-0 flex-col border-r lg:flex">
        <div className="flex h-16 items-center border-b px-5">
          <BrandLink />
        </div>
        <SidebarNav />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-card/85 supports-[backdrop-filter]:bg-card/60 sticky top-0 z-40 flex h-16 items-center gap-3 border-b px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Abrir menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 gap-0 p-0">
                <SheetHeader className="h-16 flex-row items-center border-b px-5">
                  <SheetTitle asChild>
                    <BrandLink />
                  </SheetTitle>
                </SheetHeader>
                <SidebarNav onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
            <BrandLink />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
