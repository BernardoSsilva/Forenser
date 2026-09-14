'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { FileText, Sparkles } from 'lucide-react';

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
import { INCIDENT_REPORT_TYPE_LABELS, formatDate } from '@/lib/incident-report-labels';

export default function DashboardPage() {
  const { data: user } = useCurrentUser();
  const { data: reports, isLoading } = useQuery({
    queryKey: ['incident-reports'],
    queryFn: listIncidentReports,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bem-vindo(a){user ? `, ${user.name}` : ''}</h1>
        <p className="text-muted-foreground">
          Acompanhe aqui os boletins de ocorrência registrados por você.
        </p>
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
            <p className="py-8 text-center text-sm text-muted-foreground">
              Nenhum boletim disponível. Que tal registrar o primeiro?
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
