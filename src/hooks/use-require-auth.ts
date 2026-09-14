'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from './use-current-user';
import { clearToken, getToken } from '@/lib/auth-token';

export function useRequireAuth() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useCurrentUser();

  React.useEffect(() => {
    if (!getToken()) {
      router.replace('/login');
      return;
    }
    if (isError) {
      router.replace('/login');
    }
  }, [isError, router]);

  return { user, isLoading };
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return React.useCallback(() => {
    clearToken();
    queryClient.clear();
    router.push('/');
  }, [queryClient, router]);
}
