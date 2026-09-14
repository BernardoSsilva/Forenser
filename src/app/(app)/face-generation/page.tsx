'use client';

import * as React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Sparkles, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FacialAttributeField } from '@/components/faces/facial-attribute-field';
import { DEFAULT_FACIAL_ATTRIBUTES } from '@/lib/facial-attribute-options';
import { INCIDENT_REPORT_TYPE_LABELS } from '@/lib/incident-report-labels';
import { listIncidentReports } from '@/lib/api/incident-reports';
import { generateFace, saveFace } from '@/lib/api/faces';
import { extractErrorMessage } from '@/lib/api-client';
import type { FacialAttributes } from '@/lib/types';

const ATTRIBUTE_ORDER: (keyof FacialAttributes)[] = [
  'sex',
  'ageGroup',
  'ethnicity',
  'skinColor',
  'bodyType',
  'headShape',
  'faceShape',
  'chinShape',
  'hairHeight',
  'hairType',
  'hairColor',
  'hairStyle',
  'beard',
  'beardStyle',
  'eyeShape',
  'eyeColor',
  'noseShape',
  'mouthShape',
  'earShape',
  'accessories',
  'facialMarks',
];

export default function FaceGenerationPage() {
  return (
    <React.Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <FaceGenerationContent />
    </React.Suspense>
  );
}

function FaceGenerationContent() {
  const searchParams = useSearchParams();
  const preselectedReportId = searchParams.get('incidentReportId') ?? undefined;

  const [attributes, setAttributes] = React.useState<FacialAttributes>(
    DEFAULT_FACIAL_ATTRIBUTES,
  );
  const [generated, setGenerated] = React.useState<{ imageUrl: string; description: string }>();
  const [selectedReportId, setSelectedReportId] = React.useState<string | undefined>(
    preselectedReportId,
  );

  const queryClient = useQueryClient();
  const { data: reports, isLoading: isLoadingReports } = useQuery({
    queryKey: ['incident-reports'],
    queryFn: listIncidentReports,
  });

  const availableReports = reports?.filter((report) => !report.face);

  const generateMutation = useMutation({
    mutationFn: () => generateFace(attributes),
    onSuccess: setGenerated,
    onError: (error) => {
      toast.error(extractErrorMessage(error, 'Não foi possível gerar a imagem'));
    },
  });

  const saveMutation = useMutation({
    mutationFn: () => {
      if (!generated || !selectedReportId) {
        throw new Error('Selecione um boletim antes de salvar');
      }
      return saveFace({
        imageUrl: generated.imageUrl,
        description: generated.description,
        incidentReportId: selectedReportId,
      });
    },
    onSuccess: () => {
      toast.success('Informações salvas com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['incident-reports'] });
      setSelectedReportId(undefined);
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, 'Erro ao salvar informações.'));
    },
  });

  function updateAttribute(key: keyof FacialAttributes, value: string) {
    setAttributes((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card>
        <CardHeader>
          <CardTitle>Retrato falado com IA</CardTitle>
          <CardDescription>
            Selecione as características físicas observadas para gerar uma imagem aproximada
            com o modelo DALL·E 3.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ATTRIBUTE_ORDER.map((key) => (
            <FacialAttributeField
              key={key}
              attributeKey={key}
              value={attributes[key]}
              onChange={(value) => updateAttribute(key, value)}
            />
          ))}
        </CardContent>
        <CardContent>
          <Button onClick={() => generateMutation.mutate()} disabled={generateMutation.isPending}>
            <Sparkles /> {generateMutation.isPending ? 'Gerando imagem...' : 'Gerar imagem'}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border bg-muted">
              {generateMutation.isPending ? (
                <Skeleton className="size-full" />
              ) : generated ? (
                <Image
                  src={generated.imageUrl}
                  alt="Retrato falado gerado por IA"
                  width={512}
                  height={512}
                  unoptimized
                  className="size-full object-cover"
                />
              ) : (
                <p className="p-6 text-center text-sm text-muted-foreground">
                  A imagem gerada aparecerá aqui
                </p>
              )}
            </div>

            <p className="rounded-md border bg-secondary/50 p-3 text-xs text-muted-foreground">
              <strong>Atenção:</strong> nenhuma das imagens aqui geradas são 100% condizentes com
              a realidade. São apenas imagens aproximadas para iniciar o processo de
              reconhecimento facial.
            </p>

            <div className="grid gap-1.5">
              <Label htmlFor="boletimSelect">Vincular a um boletim de ocorrência</Label>
              <Select value={selectedReportId} onValueChange={setSelectedReportId}>
                <SelectTrigger id="boletimSelect" className="w-full">
                  <SelectValue
                    placeholder={isLoadingReports ? 'Carregando...' : 'Selecione um boletim'}
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableReports?.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {INCIDENT_REPORT_TYPE_LABELS[report.type]} — {report.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {availableReports?.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Todos os seus boletins já possuem um retrato falado vinculado.
                </p>
              )}
            </div>

            <Button
              className="w-full"
              variant="secondary"
              disabled={!generated || !selectedReportId || saveMutation.isPending}
              onClick={() => saveMutation.mutate()}
            >
              <Save /> {saveMutation.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
