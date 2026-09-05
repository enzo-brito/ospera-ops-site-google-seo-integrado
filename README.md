# Site oficial — Óspera Ops

## Abrir localmente

Abra `index.html` em um navegador. Para publicar, envie a pasta inteira para Vercel, Netlify, Cloudflare Pages ou sua hospedagem estática.

## Conectar formulário ao CRM

1. Crie um webhook no Make, Zapier, n8n ou Google Apps Script que receba JSON e registre a oportunidade no CRM.
2. Cole a URL do webhook em `config.js`, no campo `leadEndpoint`.
3. Cole a URL do agendamento (Calendly, Google Agenda ou outra ferramenta) no campo `scheduleUrl`.
4. Publique novamente a pasta.

Enquanto o endpoint não estiver configurado, o formulário funciona localmente e guarda os leads apenas no navegador usado para o teste. Isso evita simular uma integração que ainda não existe.

## Eventos já preparados para mensuração

- `ospera_page_view`
- `ospera_cta_click`
- `ospera_form_start`
- `ospera_lead_submit`

Use-os no Google Tag Manager/Meta Pixel e mantenha as UTMs dos anúncios; elas já são capturadas pelo formulário.
