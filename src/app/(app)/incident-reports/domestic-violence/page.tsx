'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  domesticViolenceSchema,
  type DomesticViolenceFormValues,
} from '@/lib/validations/incident-report';
import { createDomesticViolenceReport } from '@/lib/api/incident-reports';
import { extractErrorMessage } from '@/lib/api-client';
import { LOCATION_TYPE_LABELS } from '@/lib/incident-report-labels';

export default function DomesticViolenceReportPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<DomesticViolenceFormValues>({
    resolver: zodResolver(domesticViolenceSchema),
    defaultValues: {
      occurredAt: '',
      occurredTime: '',
      locationType: undefined,
      address: '',
      informantName: '',
      involvedViolence: undefined,
      victimName: '',
      narrative: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: DomesticViolenceFormValues) =>
      createDomesticViolenceReport({
        ...values,
        involvedViolence: values.involvedViolence === 'true',
      }),
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
          <CardTitle>Violência doméstica</CardTitle>
          <CardDescription>Preencha os dados da ocorrência</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="involvedViolence"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Houve uso de violência durante a ocorrência?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-6 pt-1"
                      >
                        <label className="flex items-center gap-2 text-sm">
                          <RadioGroupItem value="true" /> Sim
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <RadioGroupItem value="false" /> Não
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="victimName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vítima</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
