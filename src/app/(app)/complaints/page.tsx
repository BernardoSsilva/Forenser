'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { complaintSchema, type ComplaintFormValues } from '@/lib/validations/complaint';
import { createComplaint } from '@/lib/api/complaints';
import { extractErrorMessage } from '@/lib/api-client';

export default function ComplaintsPage() {
  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: { reporterName: '', location: '', description: '' },
  });

  const mutation = useMutation({
    mutationFn: createComplaint,
    onSuccess: () => {
      toast.success('Denúncia registrada com sucesso');
      form.reset();
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, 'Não foi possível registrar a denúncia'));
    },
  });

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Denúncia anônima</CardTitle>
          <CardDescription>
            Relate uma suspeita ou crime. Suas informações ajudam a polícia civil a agir.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="reporterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localidade do ocorrido</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua, número, ponto de referência" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição detalhada da denúncia</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Ocorrido, material de denúncia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Enviando...' : 'Registrar denúncia'}
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
