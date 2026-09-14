import Link from 'next/link';
import { Car, HandCoins, HeartCrack } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const REPORT_TYPES = [
  {
    href: '/incident-reports/traffic-accident',
    icon: Car,
    title: 'Acidente de trânsito sem vítima',
    description: 'Acidente envolvendo veículo automotor sem vítimas.',
  },
  {
    href: '/incident-reports/theft',
    icon: HandCoins,
    title: 'Roubo ou furto',
    description:
      'Furto é subtrair algo de outra pessoa sem permissão, sem violência. Roubo envolve violência ou grave ameaça.',
  },
  {
    href: '/incident-reports/domestic-violence',
    icon: HeartCrack,
    title: 'Violência doméstica',
    description:
      'Qualquer ação ou omissão no âmbito do convívio doméstico onde o agressor conviva ou tenha convivido com a vítima.',
  },
];

export default function IncidentReportsHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Boletim de ocorrência</h1>
        <p className="max-w-2xl text-muted-foreground">
          Este serviço registra ocorrências e as direciona para a delegacia da área do fato,
          oferecendo praticidade e agilidade para evitar deslocamentos desnecessários.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORT_TYPES.map((reportType) => (
          <Link key={reportType.href} href={reportType.href}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <reportType.icon className="size-8 text-primary" />
                <CardTitle className="pt-2">{reportType.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{reportType.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
