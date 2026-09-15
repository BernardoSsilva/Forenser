import Link from 'next/link';
import { ShieldCheck, FileText, Calendar, Sparkles, Siren, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

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
      <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5 text-lg font-bold">
            <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg shadow-sm">
              <ShieldCheck className="size-4.5" />
            </span>
            <span className="tracking-tight">Forenser</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
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
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="bg-brand-gradient pointer-events-none absolute inset-0 -z-10 opacity-[0.07] dark:opacity-[0.14]"
          />
          <div
            aria-hidden
            className="bg-primary/20 pointer-events-none absolute -top-32 left-1/2 -z-10 h-96 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
          />
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
            <span className="bg-secondary/80 text-secondary-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm">
              <ShieldCheck className="text-primary size-3.5" />
              Portal digital da Polícia Civil
            </span>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Serviços policiais essenciais,{' '}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                disponíveis 24 horas por dia
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg text-pretty">
              O Forenser aproxima o cidadão da Polícia Civil, digitalizando o registro de
              ocorrências, denúncias e agendamentos, e reduzindo a necessidade de deslocamento até
              uma delegacia.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button size="lg" asChild>
                <Link href="/register">
                  Criar minha conta <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Já tenho uma conta</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 border-t">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-semibold sm:text-3xl">O que você pode fazer</h2>
              <p className="text-muted-foreground mt-2">
                Quatro serviços essenciais, reunidos em um só lugar.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((feature) => (
                <Card
                  key={feature.title}
                  className="group border-border/70 hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader>
                    <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-12 items-center justify-center rounded-xl transition-colors">
                      <feature.icon className="size-6" />
                    </span>
                    <CardTitle className="pt-3 text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">Quem somos?</h2>
          <p className="text-muted-foreground mt-4 text-pretty">
            O Forenser é uma iniciativa para modernizar e unificar serviços digitais da polícia
            civil, permitindo que cidadãos realizem procedimentos importantes de forma remota,
            segura e acessível — reduzindo a burocracia e o desconforto de vítimas em situações
            sensíveis.
          </p>
        </section>
      </main>

      <footer className="text-muted-foreground border-t py-6 text-center text-sm">
        © {new Date().getFullYear()} Forenser — Portal da Polícia Civil.
      </footer>
    </div>
  );
}
