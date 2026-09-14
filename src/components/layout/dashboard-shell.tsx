'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, ShieldCheck } from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { SidebarNav, LogoutButton } from './sidebar-nav';
import { useRequireAuth, useLogout } from '@/hooks/use-require-auth';
import type { User } from '@/lib/types';

function initials(name?: string) {
  if (!name) return '';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function BrandLink() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold">
      <ShieldCheck className="size-6 text-primary" />
      Forenser
    </Link>
  );
}

function UserSummary({ user }: { user?: User }) {
  if (!user) {
    return (
      <div className="flex items-center gap-3 px-3 py-2">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <Avatar>
        <AvatarFallback>{initials(user.name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{user.name}</p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useRequireAuth();
  const logout = useLogout();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-card lg:flex">
        <div className="border-b p-4">
          <BrandLink />
        </div>
        <UserSummary user={user} />
        <SidebarNav />
        <div className="border-t p-3">
          <LogoutButton onLogout={logout} className="w-full" />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b bg-card px-4 py-3 lg:hidden">
          <BrandLink />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b">
                <SheetTitle asChild>
                  <BrandLink />
                </SheetTitle>
              </SheetHeader>
              <UserSummary user={user} />
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
              <div className="border-t p-3">
                <LogoutButton onLogout={logout} className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 bg-secondary/30 p-4 sm:p-6 lg:p-8">
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
