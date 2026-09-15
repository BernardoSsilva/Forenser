'use client';

import type { ElementType } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { FileText, Sparkles, CalendarClock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCurrentUser } from '@/hooks/use-current-user';
import { listIncidentReports } from '@/lib/api/incident-reports';
import { listAppointments } from '@/lib/api/appointments';
import { INCIDENT_REPORT_TYPE_LABELS, formatDate } from '@/lib/incident-report-labels';

function StatCard({
  icon: Icon,
  label,
  value,
  isLoading,
}: {
  icon: ElementType;
  label: string;
  value: number | string;
  isLoading?: boolean;
}) {
  return (
    <Card className="border-border/70">
      <CardContent className="flex items-center gap-4">
        <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {label}
          </p>
          {isLoading ? (
            <Skeleton className="mt-1 h-6 w-10" />
          ) : (
            <p className="text-2xl font-semibold tabular-nums">{value}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: user } = useCurrentUser();
  const { data: reports, isLoading } = useQuery({
    queryKey: ['incident-reports'],
    queryFn: listIncidentReports,
  });
  const { data: appointments, isLoading: isLoadingAppointments } = useQuery({
    queryKey: ['appointments'],
    queryFn: listAppointments,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bem-vindo(a){user ? `, ${user.name}` : ''}</h1>
        <p className="text-muted-foreground">
          Acompanhe aqui os boletins de ocorrência registrados por você.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={FileText}
          label="Boletins registrados"
          value={reports?.length ?? 0}
          isLoading={isLoading}
        />
        <StatCard
          icon={Sparkles}
          label="Retratos gerados"
          value={reports?.filter((report) => report.face).length ?? 0}
          isLoading={isLoading}
        />
        <StatCard
          icon={CalendarClock}
          label="Agendamentos ativos"
          value={appointments?.length ?? 0}
          isLoading={isLoadingAppointments}
        />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
          <div>
            <CardTitle>Meus boletins de ocorrência</CardTitle>
            <CardDescription>Histórico de registros realizados na plataforma</CardDescription>
          </div>
          <Button asChild size="sm">
            <Link href="/incident-reports">
              <FileText /> Novo boletim
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : reports && reports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Comunicante</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Retrato falado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <Badge variant="secondary">{INCIDENT_REPORT_TYPE_LABELS[report.type]}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(report.occurredAt)}</TableCell>
                    <TableCell>{report.informantName}</TableCell>
                    <TableCell className="max-w-56 truncate">{report.address}</TableCell>
                    <TableCell>
                      {report.face ? (
                        <Image
                          src={report.face.imageUrl}
                          alt="Retrato falado"
                          width={48}
                          height={48}
                          unoptimized
                          className="size-12 rounded-md object-cover"
                        />
                      ) : (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/face-generation?incidentReportId=${report.id}`}>
                            <Sparkles /> Gerar
                          </Link>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground py-8 text-center text-sm">
              Nenhum boletim disponível. Que tal registrar o primeiro?
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
