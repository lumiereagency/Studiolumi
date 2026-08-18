# StudioLumi

Portfólio digital do StudioLumi — produtora audiovisual responsiva e
estratégica. "Do mobile ao cinema. Uma linguagem para cada história."

Construído com Next.js (App Router), TypeScript, Tailwind CSS v4 e Framer
Motion.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

- `src/app/page.tsx` — monta as seções da página na ordem definida pelo
  briefing (hero → experiência audiovisual → identidade → posicionamento →
  portfólio → processo → manifesto → pacotes → contato).
- `src/components/` — uma seção por arquivo (`Hero`, `MotionReel`,
  `LogoReveal`, `Portfolio`, `Packages`, `ContactForm`, etc).
- `src/app/api/contact/route.ts` — endpoint do formulário de agendamento de
  call. Valida os campos e recebe o pedido; falta apenas plugar um serviço
  real de envio (e-mail/CRM) quando o StudioLumi definir qual usar.
- `src/app/globals.css` — tokens de design (cores, tipografia, gradientes de
  marca) usados em todo o site via Tailwind v4 (`@theme inline`).

## Notas sobre os placeholders

- **Vídeos da seção "Experiência audiovisual"**: como ainda não há material
  bruto do estúdio, cada categoria (Mobile, Câmera, Cinema, Drone, Brand
  Film, Social) usa uma composição animada dentro da paleta da marca. O
  componente `ReelCard` já aceita um `videoSrc` opcional — basta apontar
  para o arquivo real quando ele existir, sem mudar mais nada.
- **Logo 3D**: a marca (infinito cromado que revela cor ao passar o cursor)
  foi aproximada com um traçado matemático de duas circunferências
  tangentes, já que o arquivo fonte (PNG/JPEG) do logo oficial ainda não
  está disponível no repositório. Trocar o `d` em `INFINITY_PATH`
  (`src/components/LogoMark.tsx`) por uma versão vetorizada do logo real
  assim que ele for fornecido.
- **Pacotes/preços**: os valores ainda não foram definidos pelo estúdio, por
  isso a seção de pacotes mostra "Sob consulta" e direciona para o
  formulário de contato.
