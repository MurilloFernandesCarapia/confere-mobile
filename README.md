# Confere — Aplicativo Mobile
 
**Global Solution 2026/2 · CitizenTech · Mobile Application Development · FIAP 2TDSPW**
 
Aplicativo React Native que ajuda o cidadão, principalmente o idoso, a descobrir se uma mensagem recebida por WhatsApp, SMS, e-mail ou ligação é golpe ou oficial antes de clicar, pagar ou desistir de um direito. Integrado à API Java do Confere (autenticação e verificações) e à API .NET (alertas regionais), as duas publicadas na Azure, e distribuído pelo Firebase App Distribution.
 
## 🎥 Vídeo de apresentação

*https://youtu.be/lqc-IkzOcis*
 
 
O vídeo mostra o aplicativo publicado no Firebase App Distribution com o professor como testador, a instalação pelo convite por e-mail e o fluxo completo: cadastro, login, conferência de mensagem, resultado com leitura em voz alta, feedback, histórico com filtro e exclusão, perfil com tema e LGPD, e a tela Sobre o App com o commit de referência.
 
## 📲 Versão publicada
 
| Item | Valor |
|---|---|
| Distribuição | Firebase App Distribution |
| Package Android | `br.fiap.confere.rm564969` |
| Versão | `1.0.0` (build 3) |
| Perfil de build | `preview` (APK independente do Metro) |
| Commit de referência | `1003d53` |
| Tester cadastrado | `proffelipe.oliveira@fiap.com.br` |
 
O APK foi gerado pelo EAS Build a partir do commit `1003d53`. Dentro do app, **Perfil → Sobre o app** exibe a versão e o hash do commit da build, que é o mesmo informado acima. Commits posteriores a esse alteram apenas documentação.
 
**Conta de teste:** `cida@confere.app` / `Senha@123` (já com o consentimento de análise aceito). Também é possível criar uma conta nova pelo próprio app.
 
---
 
## Integrantes
 
| Nome | RM | Turma |
|---|---|---|
| João Vitor Lacerda | 565565 | 2TDSPW |
| Kauan Vieira de Lima | 565403 | 2TDSPW |
| Murillo Fernandes Carapia | 564969 | 2TDSPW |
| Pedro de Matos Previtali | 564184 | 2TDSPW |
 
---
 
## Índice
 
- [O problema](#o-problema)
- [A solução](#a-solução)
- [Telas](#telas)
- [Funcionalidades](#funcionalidades)
- [Requisitos da disciplina](#requisitos-da-disciplina)
- [Integração com as APIs](#integração-com-as-apis)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Como executar](#como-executar)
- [Publicação](#publicação)
- [Limitações conhecidas](#limitações-conhecidas)
- [Uso de inteligência artificial](#uso-de-inteligência-artificial)
---
 
## O problema
 
Golpes por mensagem, como falsa prova de vida do INSS, falso benefício liberado e falso boleto, atingem principalmente idosos e pessoas com pouca familiaridade digital. A pessoa recebe uma mensagem com urgência, um link e o nome de um órgão oficial, e não tem a quem perguntar se aquilo é verdade.
 
## A solução
 
O Confere funciona como um "semáforo" para mensagens. A pessoa cola o texto ou o link, ou envia o print, e recebe um resultado simples: **Golpe**, **Suspeito**, **Oficial**, **Direito seu** ou **Inconclusivo**. O resultado vem com frases curtas, o que fazer agora, os sinais encontrados na mensagem, links oficiais e leitura em voz alta. Tudo foi pensado para quem tem dificuldade de leitura: letras grandes, áudio, botões grandes e tema escuro.
 
---
 
## Telas
 
São 8 telas navegáveis com Expo Router, além da tela Sobre o App.
 
| Tela | Rota | Acesso |
|---|---|---|
| Boas-vindas (acessibilidade e termo) | `/(auth)/boas-vindas` | Pública |
| Login | `/(auth)/login` | Pública |
| Cadastro | `/(auth)/cadastro` | Pública |
| Início (alertas da cidade) | `/(tabs)/inicio` | Logado |
| Conferir mensagem | `/conferir` | Logado |
| Resultado da conferência | `/verificacao/[id]` | Logado |
| Histórico | `/(tabs)/historico` | Logado |
| Perfil | `/(tabs)/perfil` | Logado |
| Sobre o App | `/sobre` | Pública |
 
As rotas logadas ficam dentro de `Stack.Protected` e só existem quando há sessão. Ao sair, o histórico de navegação é descartado e não é possível voltar para as telas internas.
 
---
 
## Funcionalidades
 
### Autenticação
- Cadastro com validação de todos os campos (nome, e-mail, telefone com máscara, data de nascimento com idade mínima, cidade e senha forte).
- Login na API Java, que devolve um token JWT.
- O token fica guardado no **expo-secure-store** e é enviado em todas as requisições por um interceptor do Axios.
- Sessão expirada (resposta 401) faz logout automático e volta para o login.
- Indicador de carregamento em todos os envios e mensagens de erro em português.
### Conferências — CRUD completo na API Java
| Operação | Onde | Rota |
|---|---|---|
| **Create** | Conferir mensagem (texto, link, print ou foto) | `POST /api/verificacoes` |
| **Read** | Resultado e histórico paginado com filtro | `GET /api/verificacoes/{id}` e `GET /api/verificacoes` |
| **Update** | "Isso te ajudou?": utilidade, desfecho e valor evitado | `PUT /api/verificacoes/{id}/feedback` |
| **Delete** | Lixeira no histórico, com confirmação | `DELETE /api/verificacoes/{id}` |
 
### Resultado acessível
- Semáforo com cor, ícone e rótulo por veredito.
- Frases curtas, "O que fazer agora", sinais detectados e fontes oficiais.
- Leitura em voz alta com **expo-speech**, automática quando o áudio está ligado.
### LGPD
- Termo aceito nas boas-vindas.
- Antes da primeira análise, a API exige o consentimento de análise por IA. O app mostra o pedido e reenvia a mensagem depois do aceite.
- No Perfil a pessoa vê, autoriza ou cancela cada consentimento, com data e versão do termo.
### Acessibilidade e aparência
- Letras grandes (escala 1,25×) e leitura em voz alta, salvas no aparelho e na conta (`PUT /api/usuarios/me`).
- Tema claro, escuro ou igual ao celular.
- Áreas de toque de no mínimo 48dp e `accessibilityLabel` em todos os botões.
---
 
## Requisitos da disciplina
 
| Requisito | Como foi atendido |
|---|---|
| 1. Telas e navegação | 8 telas com Expo Router: Stack, Tabs, grupos `(auth)` e `(tabs)` e rotas protegidas |
| 2. CRUD com a API | CRUD completo de conferências na API Java com Axios e tratamento de erros |
| 3. Autenticação | Cadastro, login com JWT, logout, rotas protegidas, validação e carregamento |
| 4. Estilização | Paleta própria em `constants/Colors.ts`, fonte Nunito em `assets/fonts`, logo e splash próprios, tema claro e escuro |
| 5. Arquitetura | Pastas por responsabilidade, ESLint + Prettier, TypeScript e um hook por operação |
| 6. Vídeo | Link no topo deste README e no .txt da entrega |
| 7. Publicação | Firebase App Distribution com o professor como tester e tela Sobre o App com o hash do commit |
 
---
 
## Integração com as APIs
 
| API | Endereço | Uso no app |
|---|---|---|
| Java (Spring Boot) | `https://confere-java-rm564969.azurewebsites.net` · [Swagger](https://confere-java-rm564969.azurewebsites.net/swagger-ui.html) | Cadastro, login, canais, consentimentos, conferências, feedback e perfil |
| .NET | `https://confere-rm564969.azurewebsites.net` · [Swagger](https://confere-rm564969.azurewebsites.net/swagger) | Alertas regionais da tela Início, com o mesmo token emitido pela API Java |
 
- Os endereços ficam em `EXPO_PUBLIC_JAVA_API_URL` e `EXPO_PUBLIC_DOTNET_API_URL` (`.env` no desenvolvimento e `eas.json` na build).
- Toda resposta é validada com **Zod** antes de chegar às telas.
- Erros seguem o formato ProblemDetails da API e são traduzidos para mensagens simples em `lib/erros.ts`.
- A análise de uma mensagem passa por IA e LLM na API e leva cerca de 25 segundos, por isso o cliente espera até 60 segundos.
---
 
## Tecnologias
 
| Biblioteca | Para quê |
|---|---|
| Expo SDK 58 + React Native 0.88 | Base do app, com React Compiler ligado |
| Expo Router | Navegação por arquivos, Tabs, Stack e `Stack.Protected` |
| Axios | Cliente HTTP com interceptor de token e logout no 401 |
| TanStack Query | Cache, carregamento, paginação infinita e atualização da tela após mutações |
| React Hook Form + Zod | Formulários com validação declarativa; Zod também valida as respostas da API |
| expo-secure-store | Sessão (token JWT) guardada de forma criptografada |
| AsyncStorage | Preferências do aparelho (tema, letras grandes, áudio) |
| expo-speech | Leitura do resultado em voz alta |
| expo-image-picker | Print da galeria ou foto pela câmera |
| expo-font + Nunito | Fonte própria, legível e arredondada |
| expo-splash-screen / expo-system-ui | Splash e cor de fundo nos temas claro e escuro |
| expo-constants | Versão e hash do commit na tela Sobre |
| ESLint + Prettier | Padrão de código e formatação |
 
---
 
## Arquitetura
 
```
src/
├── app/            Telas e rotas (Expo Router)
│   ├── (auth)/     Boas-vindas, login e cadastro
│   ├── (tabs)/     Início, histórico e perfil
│   ├── verificacao/[id].tsx
│   ├── conferir.tsx
│   └── sobre.tsx
├── components/     Componentes de tela; ui/ tem os componentes genéricos
├── constants/      Cores, fontes, vereditos, termo, cidades e integrantes
├── hooks/          Um hook por consulta ou mutação (TanStack Query)
├── lib/            Cliente Axios, sessão, erros, máscaras e datas
├── providers/      Auth, Tema e Preferências (Context API)
├── schemas/        Zod: api/ para respostas e forms/ para formulários
└── services/       Funções que chamam as APIs
```
 
- **Separação de responsabilidades:** a tela usa um hook, o hook usa um service, o service usa o cliente Axios e valida com Zod. Nenhuma tela chama o Axios diretamente.
- **Estilos:** cada componente cria os estilos com `useThemedStyles(criarEstilos)`, recebendo as cores do tema e a função de tamanho que aplica as letras grandes.
---
 
## Como executar
 
### Pré-requisitos
- Node.js 20 ou superior
- Android Studio com um emulador Android, ou um celular com Expo Go
### Passos
```bash
git clone LINK_DO_REPOSITORIO
cd confere-mobile
npm install
cp .env.example .env
npx expo start -c
```
Depois aperte **a** para abrir no emulador Android.
 
O `.env.example` já aponta para as APIs publicadas na Azure. Para usar as APIs locais, troque para `http://10.0.2.2:8080` (Java) e `http://10.0.2.2:5080` (.NET).
 
### Qualidade
```bash
npm run lint
npm run format
```
 
---
 
## Publicação
 
```bash
npx eas-cli@latest build --platform android --profile preview
```
 
- **`preview`** gera um APK independente, com as URLs das APIs definidas no `eas.json`.
- **`requireCommit: true`** impede a build com alterações sem commit, garantindo que o APK corresponda exatamente a um commit do repositório.
- O `app.config.ts` lê o hash do commit (`EAS_BUILD_GIT_COMMIT_HASH` no EAS ou `git rev-parse` localmente) e o expõe para a tela Sobre o App.
- O APK gerado é enviado ao **Firebase App Distribution** com o professor como testador.
---
 
## Limitações conhecidas
 
- **Leitura de print e foto:** o app envia a imagem corretamente (a API responde 201), mas a etapa de OCR do serviço de IA no ambiente da Azure devolve texto vazio, e o resultado sai "Inconclusivo". A conferência por texto e por link funciona normalmente.
- **Cidades no cadastro:** a API ainda não expõe a lista de municípios. O app usa as cidades cadastradas no banco (São Paulo, Campinas, Rio de Janeiro, Belo Horizonte e Salvador) e passa a usar a rota automaticamente quando ela existir.
- **Leitura em voz alta:** depende de uma voz em português instalada no aparelho. Quando não há, o app avisa na tela o que configurar.
---
 
## Uso de inteligência artificial
 
Durante o desenvolvimento usamos o Claude (Anthropic) como assistente de programação: para sugerir a estrutura do projeto, escrever e revisar componentes, hooks e schemas, testar a integração com as APIs e redigir este README. Todo o código foi revisado, testado no emulador e commitado pelos integrantes, que são responsáveis pelas decisões técnicas do projeto.
