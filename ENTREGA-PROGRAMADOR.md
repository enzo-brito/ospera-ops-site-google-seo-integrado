# Entrega para finalização — Site Óspera Ops

## O que já está pronto

- Landing page responsiva e mobile-first;
- Identidade visual final da Óspera Ops, com o ícone aprovado em `assets/ospera-ops-icone-final.png`;
- Copy de conversão e CTAs de diagnóstico;
- Jornada comercial: tráfego → site → diagnóstico → reunião;
- Jornada do hotel cliente: Google → reserva → pré-check-in → estadia → checkout → avaliação → reputação → novos hóspedes;
- Formulário com campos comerciais, UTMs e eventos preparados;
- Estrutura de SEO básico, incluindo título, descrição e dados estruturados de software.

## Não alterar sem validação da marca

- Ícone final da Óspera Ops;
- Cores: azul `#071930`, verde `#1BD08E`, dourado `#DBB546`, fundo `#F7FAFA`;
- Assinatura: **A operação do hotel, sob controle.**

## O que falta para publicar

### 1. Hospedagem e domínio

- Publicar a pasta em Vercel, Netlify, Cloudflare Pages ou hospedagem equivalente;
- Conectar o domínio oficial;
- Habilitar HTTPS;
- Configurar redirecionamento de `www` para o domínio principal (ou o inverso).

### 2. Formulário → CRM comercial

No arquivo `config.js`, preencher:

```js
leadEndpoint: "URL_DO_WEBHOOK"
scheduleUrl: "URL_DO_AGENDAMENTO"
```

O webhook pode ser criado no Make, n8n, Zapier ou Apps Script. Ele deve receber JSON e criar uma oportunidade no CRM comercial da Óspera Ops.

### 3. Mapeamento obrigatório do CRM

Criar ou atualizar uma linha na aba **Pipeline** do CRM com:

- Nome;
- Hotel / empresa;
- Cargo;
- WhatsApp;
- Cidade / UF;
- Principal desafio;
- UTM source, medium, campaign e content;
- Data/hora de entrada;
- Etapa inicial: `Novo lead`;
- Origem e criativo do anúncio.

Após registrar o lead, o comercial deve definir responsável, próxima ação e data da próxima ação. Nenhuma oportunidade pode permanecer sem isso.

### 4. Agendamento

- Conectar Calendly, Google Agenda, Cal.com ou ferramenta escolhida;
- Após o envio do formulário, abrir a página de agenda;
- A reunião deve entrar como `Diagnóstico agendado` no CRM.

### 5. Mensuração

Adicionar Google Tag Manager e configurar Meta Pixel/Conversions API.

Eventos que já existem no site:

- `ospera_page_view`;
- `ospera_cta_click`;
- `ospera_form_start`;
- `ospera_lead_submit`.

Mapeamento recomendado:

- Visita: PageView;
- Clique em CTA: ViewContent ou evento personalizado;
- Início do formulário: LeadStart;
- Formulário enviado: Lead;
- Reunião marcada: Schedule.

### 6. SEO e compartilhamento

- Inserir domínio oficial em canonical URL;
- Criar `sitemap.xml` e `robots.txt`;
- Criar imagem Open Graph para WhatsApp, Instagram e LinkedIn;
- Vincular Google Search Console;
- Criar ou revisar o Perfil da Empresa no Google da Óspera Ops;
- Inserir Política de Privacidade e tratamento de dados LGPD no rodapé/formulário.

### 7. Validação final

- Testar em Android, iPhone e desktop;
- Testar todos os CTAs;
- Enviar um lead de teste e confirmar chegada no CRM;
- Confirmar UTMs no CRM;
- Testar agendamento;
- Conferir carregamento, acessibilidade e mensagens de erro.

## Estratégia de mídia já definida

- Criativo 01: **Seu hotel ainda opera no escuro?** — público frio;
- Criativo 09: **Caixa, receita e operação conversando.** — donos e decisores;
- Criativo 12: **Seu hotel pode operar em outro nível.** — remarketing e diagnóstico.

O tráfego ideal deve ir **direto para o site**, com UTMs. O Instagram funciona como prova de marca e aprofundamento da solução; não deve ser a única ponte entre anúncio e reunião.
