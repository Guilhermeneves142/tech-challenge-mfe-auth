# mfe-auth — FinanceApp

Microfrontend de **autenticação** do FinanceApp (Next.js Multizones). Serve as telas
de **login**, **cadastro** e **recuperação de senha** sob o `basePath` `/auth`, e é
_proxiado_ pelo host (shell) do projeto.

> Faz parte da arquitetura de microfrontends do
> [tech-challenge](https://github.com/Guilhermeneves142/tech-challenge) (host).
> O host orquestra este MFE — normalmente você sobe tudo a partir dele (`npm run dev`).

<br>

## Tecnologias
* **Next.js 16 / React 19 / TypeScript**
* **Tailwind** + Design System `@vandrei/finance-ui`
* **Multizone:** `basePath: "/auth"` ([next.config.ts](./next.config.ts))

<br>

## Estrutura
```bash
src/
├── app/                      # rotas: /login, /cadastro, /recuperar-senha
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── AuthLayout.tsx        # layout com painel lateral + área do formulário
│   └── auth/                 # forms e componentes de autenticação
│       ├── LoginForm.tsx
│       ├── CadastroForm.tsx
│       ├── RecuperarSenhaForm.tsx · RecuperarSenhaSuccess.tsx
│       ├── PasswordInput.tsx
│       └── PasswordStrengthIndicator.tsx
└── lib/                      # auth-api · auth-storage
```

<br>

## ▶️ Como rodar

Em desenvolvimento, suba o projeto **a partir do host** (ele orquestra os MFEs):

```bash
# na pasta do host
npm run dev          # host :3000 + mfe-auth :4001 + mfe-transactions :4002
```

Para rodar **somente** este MFE de forma isolada:

```bash
npm install
npm run dev          # http://localhost:4001/auth/login
```

<br>

## ♿ Acessibilidade

As telas de autenticação seguem boas práticas de a11y para teclado e leitores de tela:

* **HTML semântico:** `main`, `aside` e `form`; o painel lateral decorativo é
  marcado com `aria-hidden`, e um `<h1>` `sr-only` garante um título acessível à página.
* **Formulários:** todo campo tem `<Label htmlFor>` associado e `autoComplete`
  apropriado (`email`, `current-password`, `new-password`).
* **Erros:** mensagens de erro usam `role="alert"` (anunciadas por leitores de tela);
  o campo "Confirmar senha" associa a mensagem via `aria-describedby` + `aria-invalid`.
* **Senha:** o botão de mostrar/ocultar senha tem `aria-label`; o indicador de força
  da senha anuncia mudanças com `aria-live="polite"`.
* **Estados:** a confirmação de "e-mail enviado" usa `role="status"` para ser anunciada.

> Os componentes base (`Input`, `Button`, etc.) vêm da lib `@vandrei/finance-ui`,
> que já fornece foco visível e contraste adequado.
