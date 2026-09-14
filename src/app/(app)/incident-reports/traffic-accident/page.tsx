'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  trafficAccidentSchema,
  type TrafficAccidentFormValues,
} from '@/lib/validations/incident-report';
import { createTrafficAccidentReport } from '@/lib/api/incident-reports';
import { extractErrorMessage } from '@/lib/api-client';
import { LOCATION_TYPE_LABELS } from '@/lib/incident-report-labels';

export default function TrafficAccidentReportPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<TrafficAccidentFormValues>({
    resolver: zodResolver(trafficAccidentSchema),
    defaultValues: {
      occurredAt: '',
      occurredTime: '',
      locationType: undefined,
      address: '',
      informantName: '',
      driverName: '',
      vehiclesInvolved: '',
      narrative: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createTrafficAccidentReport,
    onSuccess: () => {
      toast.success('Boletim cadastrado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['incident-reports'] });
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, 'Não foi possível registrar o boletim'));
    },
  });

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Acidente de trânsito sem vítima</CardTitle>
          <CardDescription>Preencha os dados do acidente ocorrido</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="occurredAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data da ocorrência</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occurredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário da ocorrência</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de local</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(LOCATION_TYPE_LABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="sm:col-span-2">
                <h3 className="text-sm font-semibold text-muted-foreground">Envolvidos</h3>
              </div>

              <FormField
                control={form.control}
                name="informantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comunicante</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="driverName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motorista</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehiclesInvolved"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Veículos envolvidos</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Informe placa, modelo e ano dos veículos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="narrative"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Relato do fato</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Registrando...' : 'Registrar boletim'}
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
