import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function RegisterSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader className="items-center">
          <CheckCircle2 className="size-14 text-success" />
          <CardTitle className="pt-2 text-xl">Cadastro realizado com sucesso!</CardTitle>
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
