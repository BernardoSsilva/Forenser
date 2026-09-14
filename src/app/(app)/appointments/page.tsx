'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CalendarPlus, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { appointmentSchema, type AppointmentFormValues } from '@/lib/validations/appointment';
import {
  createAppointment,
  deleteAppointment,
  listAppointments,
  updateAppointment,
} from '@/lib/api/appointments';
import { extractErrorMessage } from '@/lib/api-client';
import type { Appointment } from '@/lib/types';

const APPOINTMENTS_QUERY_KEY = ['appointments'];

function toDateInputValue(value: string) {
  return value.slice(0, 10);
}

export default function AppointmentsPage() {
  const queryClient = useQueryClient();
  const { data: appointments, isLoading } = useQuery({
    queryKey: APPOINTMENTS_QUERY_KEY,
    queryFn: listAppointments,
  });

  const [dialogState, setDialogState] = React.useState<
    { mode: 'create' } | { mode: 'edit'; appointment: Appointment } | null
  >(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Appointment | null>(null);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: APPOINTMENTS_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success('Agendamento concluído');
      setDialogState(null);
      invalidate();
    },
    onError: (error) => toast.error(extractErrorMessage(error, 'Não foi possível agendar')),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: AppointmentFormValues }) =>
      updateAppointment(id, values),
    onSuccess: () => {
      toast.success('Agendamento alterado com sucesso');
      setDialogState(null);
      invalidate();
    },
    onError: (error) => toast.error(extractErrorMessage(error, 'Não foi possível alterar')),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      toast.success('Agendamento excluído');
      setDeleteTarget(null);
      invalidate();
    },
    onError: (error) => toast.error(extractErrorMessage(error, 'Não foi possível excluir')),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Agendamento de atendimento</h1>
          <p className="text-muted-foreground">
            Marque um horário presencial na Polícia Civil quando for necessário.
          </p>
        </div>
        <Button onClick={() => setDialogState({ mode: 'create' })}>
          <CalendarPlus /> Agendar atendimento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meus agendamentos</CardTitle>
          <CardDescription>Horários marcados para atendimento presencial</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : appointments && appointments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.requesterName}</TableCell>
                    <TableCell>
                      {new Date(appointment.scheduledDate).toLocaleDateString('pt-BR', {
                        timeZone: 'UTC',
                      })}
                    </TableCell>
                    <TableCell>{appointment.scheduledTime}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDialogState({ mode: 'edit', appointment })}
                      >
                        <Pencil /> Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteTarget(appointment)}
                      >
                        <Trash2 /> Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Nenhum agendamento cadastrado.
            </p>
          )}
        </CardContent>
      </Card>

      <AppointmentDialog
        state={dialogState}
        onClose={() => setDialogState(null)}
        onCreate={(values) => createMutation.mutate(values)}
        onUpdate={(id, values) => updateMutation.mutate({ id, values })}
        isPending={createMutation.isPending || updateMutation.isPending}
      />

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir agendamento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o agendamento de {deleteTarget?.requesterName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
            >
              {deleteMutation.isPending ? 'Excluindo...' : 'Confirmar exclusão'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AppointmentDialog({
  state,
  onClose,
  onCreate,
  onUpdate,
  isPending,
}: {
  state: { mode: 'create' } | { mode: 'edit'; appointment: Appointment } | null;
  onClose: () => void;
  onCreate: (values: AppointmentFormValues) => void;
  onUpdate: (id: string, values: AppointmentFormValues) => void;
  isPending: boolean;
}) {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    values:
      state?.mode === 'edit'
        ? {
            requesterName: state.appointment.requesterName,
            scheduledDate: toDateInputValue(state.appointment.scheduledDate),
            scheduledTime: state.appointment.scheduledTime,
          }
        : { requesterName: '', scheduledDate: '', scheduledTime: '' },
  });

  function handleSubmit(values: AppointmentFormValues) {
    if (state?.mode === 'edit') {
      onUpdate(state.appointment.id, values);
    } else {
      onCreate(values);
    }
  }

  return (
    <Dialog open={!!state} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {state?.mode === 'edit' ? 'Editar agendamento' : 'Agendamento de atendimento'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="requesterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scheduledTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Salvando...' : state?.mode === 'edit' ? 'Salvar' : 'Agendar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
