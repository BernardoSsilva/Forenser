'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';
import { login } from '@/lib/api/auth';
import { setToken } from '@/lib/auth-token';
import { extractErrorMessage } from '@/lib/api-client';
import { CURRENT_USER_QUERY_KEY } from '@/hooks/use-current-user';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken, user }) => {
      setToken(accessToken);
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, user);
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, 'Usuário ou senha inválidos'));
    },
  });

  return (
    <div className="bg-secondary/30 relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden
        className="bg-primary/20 pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
      />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="border-border/70 w-full max-w-sm shadow-lg">
        <CardHeader className="items-center text-center">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-xl shadow-sm">
              <ShieldCheck className="size-5.5" />
            </span>
          </Link>
          <CardTitle className="pt-3 text-xl">Entrar na sua conta</CardTitle>
          <CardDescription>Acesse os serviços do portal da polícia civil</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="voce@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? 'Entrando...' : 'Entrar'}
              </Button>
              <p className="text-muted-foreground text-sm">
                Ainda não possui uma conta?{' '}
                <Link href="/register" className="text-primary font-medium hover:underline">
                  Registre-se
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
