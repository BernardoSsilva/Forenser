'use client';

import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useLogout } from '@/hooks/use-require-auth';
import { deleteMe } from '@/lib/api/users';
import { extractErrorMessage } from '@/lib/api-client';

const SEX_LABELS: Record<string, string> = { MALE: 'Masculino', FEMALE: 'Feminino' };

function ProfileField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      {value ? <p className="text-base font-medium">{value}</p> : <Skeleton className="mt-1 h-5 w-40" />}
    </div>
  );
}

export default function ProfilePage() {
  const { data: user, isLoading } = useCurrentUser();
  const logout = useLogout();

  const deleteMutation = useMutation({
    mutationFn: deleteMe,
    onSuccess: () => {
      toast.success('Perfil excluído com sucesso.');
      logout();
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, 'Erro ao excluir o perfil.'));
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Meu perfil</h1>
        <p className="text-muted-foreground">Seus dados cadastrais no Forenser</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isLoading ? <Skeleton className="h-7 w-48" /> : user?.name}</CardTitle>
          <CardDescription>Cadastrado em {user ? new Date(user.createdAt).toLocaleDateString('pt-BR') : ''}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <ProfileField label="CPF" value={user?.cpf} />
          <ProfileField label="Sexo" value={user ? SEX_LABELS[user.sex] : undefined} />
          <ProfileField label="E-mail" value={user?.email} />
          <ProfileField label="Telefone" value={user?.phoneNumber} />
        </CardContent>
      </Card>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/profile/edit">
            <Pencil /> Editar perfil
          </Link>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 /> Excluir perfil
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Excluir perfil</DialogTitle>
              <DialogDescription>
                Esta ação é irreversível. Todos os seus dados serão removidos permanentemente do
                Forenser.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Excluindo...' : 'Confirmar exclusão'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
