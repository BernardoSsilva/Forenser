'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/lib/api/users';
import { getToken } from '@/lib/auth-token';

export const CURRENT_USER_QUERY_KEY = ['me'];

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

export function useCurrentUser() {
  const hasToken = React.useSyncExternalStore(
    subscribe,
    () => Boolean(getToken()),
    getServerSnapshot,
  );

  return useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: getMe,
    enabled: hasToken,
    retry: false,
  });
}
