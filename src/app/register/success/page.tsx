import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

export default function RegisterSuccessPage() {
  return (
    <div className="bg-secondary/30 relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div
        aria-hidden
        className="bg-success/20 pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
      />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="border-border/70 w-full max-w-sm text-center shadow-lg">
        <CardHeader className="items-center">
          <span className="bg-success/15 text-success flex size-16 items-center justify-center rounded-full">
            <CheckCircle2 className="size-9" />
          </span>
          <CardTitle className="pt-3 text-xl">Cadastro realizado com sucesso!</CardTitle>
          <CardDescription>Agora você já pode entrar com seu e-mail e senha.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/login">Fazer login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
