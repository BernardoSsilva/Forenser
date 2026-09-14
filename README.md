# Forenser

Portal digital de serviços da polícia civil. Frontend reescrito em **Next.js (App Router)** com
**TypeScript**, **Tailwind CSS v4** e **shadcn/ui**, substituindo a versão anterior em Vite +
React (disponível no histórico do repositório).

## O que o portal oferece

- Registro de boletins de ocorrência (acidente de trânsito, roubo/furto, violência doméstica)
- Denúncia anônima
- Agendamento de atendimento presencial (criar, listar, editar e excluir)
- Geração de retrato falado com IA (**DALL·E 3**, via [API do backend](https://github.com/BernardoSsilva/Forenser-backend))
- Autenticação (registro/login com JWT) e gerenciamento de perfil

Este frontend depende da API do
[Forenser-backend](https://github.com/BernardoSsilva/Forenser-backend) — ele não implementa
nenhuma regra de negócio nem chama a OpenAI diretamente, apenas consome os endpoints REST.

## Stack

- **Next.js 16** (App Router, Server e Client Components)
- **Tailwind CSS v4** + **shadcn/ui** (componentes acessíveis com Radix UI, escritos manualmente
  em `src/components/ui`)
- **React Hook Form** + **Zod** para formulários e validação
- **TanStack Query** para busca e cache de dados da API
- **Axios** como cliente HTTP

## Páginas e rotas

| Rota | Acesso | Descrição |
| --- | :---: | --- |
| `/` | público | Landing page institucional |
| `/login` | público | Login |
| `/register` | público | Cadastro de novo usuário |
| `/register/success` | público | Confirmação pós-cadastro |
| `/dashboard` | autenticado | Início: lista os boletins do usuário |
| `/incident-reports` | autenticado | Hub de escolha do tipo de boletim |
| `/incident-reports/traffic-accident` | autenticado | Formulário de acidente de trânsito |
| `/incident-reports/theft` | autenticado | Formulário de roubo/furto |
| `/incident-reports/domestic-violence` | autenticado | Formulário de violência doméstica |
| `/face-generation` | autenticado | Geração de retrato falado com IA |
| `/complaints` | autenticado* | Denúncia anônima |
| `/appointments` | autenticado* | Agendamento de atendimento (CRUD) |
| `/profile`, `/profile/edit` | autenticado | Perfil do usuário e edição |

\* As páginas `/complaints` e `/appointments` ficam atrás do login por estarem dentro do shell do
dashboard, mas o endpoint `POST /complaints` do backend não exige token (a denúncia em si é
anônima).

## Arquitetura do frontend

```
src/
├── app/                    # rotas (App Router)
│   ├── (app)/               # área autenticada — layout com sidebar (não afeta a URL)
│   ├── login/, register/    # páginas públicas
│   └── page.tsx              # landing page
├── components/
│   ├── ui/                  # componentes shadcn/ui (button, form, dialog, table, sheet, ...)
│   ├── layout/               # shell do dashboard, navegação lateral
│   └── faces/                 # componentes específicos do retrato falado
├── hooks/                  # useCurrentUser, useRequireAuth, useLogout
├── lib/
│   ├── api/                  # funções que chamam a API do backend, por domínio
│   ├── validations/           # schemas Zod por formulário
│   ├── api-client.ts           # instância axios com interceptor de autenticação
│   └── auth-token.ts            # leitura/escrita do cookie do token JWT
└── proxy.ts                # protege rotas autenticadas a partir do cookie do token
                              # (renomeado de middleware.ts na convenção do Next.js 16)
```

A autenticação é feita via JWT emitido pelo backend: o token é salvo em cookie
(`forenser_token`) e anexado automaticamente às requisições pelo `apiClient`. O `proxy.ts`
bloqueia o acesso às páginas do dashboard quando não há esse cookie, e o hook `useCurrentUser`
mantém os dados do usuário sincronizados via TanStack Query, buscando `GET /users/me`.

## Rodando localmente

Pré-requisitos: Node.js 20+ e a [API do Forenser-backend](https://github.com/BernardoSsilva/Forenser-backend)
rodando (localmente ou em outro endereço).

```bash
cp .env.example .env.local
npm install
npm run dev
```

A aplicação sobe em `http://localhost:3000` e por padrão espera a API em
`http://localhost:3001`. Ajuste `NEXT_PUBLIC_API_URL` em `.env.local` caso a API esteja em outro
endereço.

### Variáveis de ambiente

Veja também [`.env.example`](./.env.example).

| Variável | Obrigatória | Descrição |
| --- | :---: | --- |
| `NEXT_PUBLIC_API_URL` | não (padrão `http://localhost:3001`) | URL base da API do Forenser-backend. Exposta ao navegador (prefixo `NEXT_PUBLIC_`), então nunca deve conter segredos |

## Scripts

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run start    # serve o build de produção (após `npm run build`)
npm run lint     # eslint
```
