# Forenser

Portal digital de serviços da polícia civil. Frontend reescrito em **Next.js (App Router)** com **TypeScript**, **Tailwind CSS v4** e **shadcn/ui**, substituindo a versão anterior em Vite + React (disponível no histórico do repositório).

## O que o portal oferece

- Registro de boletins de ocorrência (acidente de trânsito, roubo/furto, violência doméstica)
- Denúncia anônima
- Agendamento de atendimento presencial (criar, listar, editar e excluir)
- Geração de retrato falado com IA (**DALL·E 3**, via [API do backend](https://github.com/BernardoSsilva/Forenser-backend))
- Autenticação (registro/login com JWT) e gerenciamento de perfil

## Stack

- **Next.js 16** (App Router, Server e Client Components)
- **Tailwind CSS v4** + **shadcn/ui** (componentes acessíveis com Radix UI)
- **React Hook Form** + **Zod** para formulários e validação
- **TanStack Query** para busca e cache de dados da API
- **Axios** como cliente HTTP

## Arquitetura do frontend

```
src/
├── app/                 # rotas (App Router)
│   ├── (app)/            # área autenticada — layout com sidebar
│   ├── login/, register/ # páginas públicas
│   └── page.tsx           # landing page
├── components/
│   ├── ui/               # componentes shadcn/ui (button, form, dialog, table, ...)
│   ├── layout/            # shell do dashboard, navegação
│   └── faces/             # componentes específicos do retrato falado
├── hooks/                # hooks de autenticação e dados do usuário
├── lib/
│   ├── api/               # funções que chamam a API do backend, por domínio
│   ├── validations/        # schemas Zod por formulário
│   └── api-client.ts        # instância axios com interceptor de autenticação
└── middleware.ts          # protege rotas autenticadas a partir do cookie do token
```

A autenticação é feita via JWT emitido pelo backend: o token é salvo em cookie e anexado
automaticamente às requisições pelo `apiClient`. O middleware bloqueia o acesso às páginas do
dashboard quando não há token, e o hook `useCurrentUser` mantém os dados do usuário sincronizados
via TanStack Query.

## Rodando localmente

```bash
cp .env.example .env.local
npm install
npm run dev
```

Por padrão a aplicação espera a API em `http://localhost:3001` (ver
[Forenser-backend](https://github.com/BernardoSsilva/Forenser-backend)). Ajuste
`NEXT_PUBLIC_API_URL` em `.env.local` caso a API esteja em outro endereço.

## Scripts

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run lint     # eslint
```
