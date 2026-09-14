import Link from 'next/link';
import { ShieldCheck, FileText, Calendar, Sparkles, Siren } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const FEATURES = [
  {
    icon: FileText,
    title: 'Boletim de ocorrência',
    description:
      'Registre acidentes de trânsito, roubos, furtos e casos de violência doméstica sem sair de casa.',
  },
  {
    icon: Siren,
    title: 'Denúncia anônima',
    description: 'Relate uma suspeita ou crime com total praticidade e agilidade.',
  },
  {
    icon: Calendar,
    title: 'Agendamento de atendimento',
    description: 'Marque um horário presencial na delegacia mais próxima quando for necessário.',
  },
  {
    icon: Sparkles,
    title: 'Retrato falado com IA',
    description:
      'Gere uma imagem aproximada de um suspeito a partir de características físicas, usando inteligência artificial.',
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-bold">
            <ShieldCheck className="size-6 text-primary" />
            Forenser
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Registrar-se</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
          <span className="rounded-full border bg-secondary px-4 py-1 text-sm text-secondary-foreground">
            Portal digital da Polícia Civil
          </span>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Serviços policiais essenciais, disponíveis 24 horas por dia
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
            O Forenser aproxima o cidadão da Polícia Civil, digitalizando o registro de
            ocorrências, denúncias e agendamentos, e reduzindo a necessidade de deslocamento até
            uma delegacia.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/register">Criar minha conta</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Já tenho uma conta</Link>
            </Button>
          </div>
        </section>

        <section className="border-t bg-secondary/40">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-center text-2xl font-semibold">O que você pode fazer</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <feature.icon className="size-8 text-primary" />
                    <CardTitle className="pt-2 text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold">Quem somos?</h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            O Forenser é uma iniciativa para modernizar e unificar serviços digitais da polícia
            civil, permitindo que cidadãos realizem procedimentos importantes de forma remota,
            segura e acessível — reduzindo a burocracia e o desconforto de vítimas em situações
            sensíveis.
          </p>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Forenser — Portal da Polícia Civil.
      </footer>
    </div>
  );
}
