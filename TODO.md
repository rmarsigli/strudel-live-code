# TODO: Strudel Live Code - Planejamento Completo

**Início**: 2025-10-23
**Status**: ⏳ Em planejamento
**Versão Alvo**: 2.0.0

---

## Fase 1: Setup e Configuração Base ✅

### 1.1 Inicialização do Projeto
- [x] Criar backup do projeto atual
- [x] Inicializar novo projeto Vite + React + TypeScript
- [x] Configurar Tailwind CSS v4 (CSS-first)
- [x] Configurar ESLint + Prettier (regras personalizadas)
- [x] Configurar TypeScript estrito (tsconfig.json)
- [x] Instalar dependências core

**Dependências**:
```bash
vite react react-dom
typescript @types/react @types/react-dom
tailwindcss postcss autoprefixer
zustand
@uiw/react-codemirror @codemirror/lang-javascript @codemirror/theme-one-dark
@strudel/core @strudel/mini
ws express
```

**Dev Dependencies**:
```bash
vitest @testing-library/react @testing-library/jest-dom
eslint prettier eslint-config-prettier
@types/ws @types/express
```

---

### 1.2 Configuração de Código
- [x] Criar `.prettierrc` (aspas simples, sem ponto e vírgula)
- [x] Criar `eslint.config.js` (regras personalizadas)
- [ ] Criar `.vscode/settings.json` (auto-format, extensões recomendadas)
- [x] Configurar `vite.config.ts` (aliases, Tailwind plugin)
- [x] Criar estrutura de pastas inicial

**Estrutura**:
```
src/
├── components/
├── hooks/
├── store/
├── lib/
├── types/
├── patterns/
└── styles/
server/
docs/
```

---

### 1.3 shadcn/ui Setup
- [x] Configurar `components.json`
- [x] Instalar dependências (clsx, tailwind-merge, class-variance-authority)
- [x] Criar lib/utils.ts
- [ ] Instalar componentes necessários:
  - [ ] Button
  - [ ] Dialog
  - [ ] Toast/Sonner
  - [ ] Separator
  - [ ] DropdownMenu
  - [ ] ScrollArea
  - [ ] ResizablePanelGroup

---

## Fase 2: TypeScript Types e Interfaces ✅

### 2.1 Tipos Base
- [x] `src/types/pattern.ts` - Pattern, PatternFile, PatternMetadata
- [x] `src/types/websocket.ts` - WSMessage, WSEvent, ConnectionStatus
- [x] `src/types/playback.ts` - PlaybackState, AudioConfig
- [x] `src/types/ui.ts` - LogEntry, ToastType, ModalState
- [x] `src/types/file.ts` - FileInfo, FileOperation
- [x] `src/types/index.ts` - Export barrel

---

### 2.2 Tipos Strudel
- [x] Pattern type como unknown (será refinado com integração Strudel)

---

## Fase 3: Zustand Store ✅

### 3.1 Store Principal
- [x] `src/store/use-strudel.ts` - Store global
  - [x] State: isPlaying, currentPattern, patternCode, volume
  - [x] Actions: play, stop, togglePlay, setPattern
  - [x] Middleware: devtools, persist (volume, patternCode)

---

### 3.2 Stores Específicos
- [x] `src/store/use-connection.ts` - WebSocket connection state
  - [x] State: status, ws, reconnectAttempts, lastMessage
  - [x] Actions: setStatus, send, disconnect, incrementReconnectAttempts

- [x] `src/store/use-files.ts` - File management
  - [x] State: files, currentFile, isLoading
  - [x] Actions: setFiles, addFile, removeFile, updateFile, renameFile

- [x] `src/store/use-ui.ts` - UI state
  - [x] State: logs, modals, toasts
  - [x] Actions: addLog, openModal, closeModal, showToast

- [x] `src/store/index.ts` - Export barrel

---

### 3.3 Libs e Helpers
- [x] `src/lib/constants.ts` - Constantes do projeto
- [x] `src/lib/validation.ts` - Funções de validação e formatação
- [x] `src/lib/utils.ts` - Helper cn() para shadcn/ui

---

## Fase 4: Backend (WebSocket Server) ✅

### 4.1 Servidor Express
- [x] `server/index.ts` - HTTP + WebSocket server
  - [x] WebSocket server setup (porta 3001)
  - [x] File watcher (chokidar)
  - [x] Error handling
  - [x] Message handling (get-files, create-file, delete-file, etc)
  - [x] Broadcast to all clients
  - [x] Graceful shutdown (SIGINT)

---

### 4.2 Protocolo WebSocket
- [x] Mensagens implementadas:
  - [x] `pattern-update` - arquivo mudou
  - [x] `file-list` - lista de arquivos
  - [x] `file-content` - conteúdo de arquivo
  - [x] `file-created` - novo arquivo
  - [x] `file-deleted` - arquivo removido
  - [x] `file-renamed` - arquivo renomeado
  - [x] `connection-status` - status da conexão
  - [x] `error` - erros do servidor

---

### 4.3 File System Operations
- [x] `server/file-manager.ts`
  - [x] listFiles() - listar patterns/
  - [x] readFile() - ler arquivo
  - [x] writeFile() - criar/editar arquivo
  - [x] deleteFile() - deletar arquivo
  - [x] renameFile() - renomear arquivo
  - [x] watchFiles() - observar mudanças (chokidar)
  - [x] ensurePatternsDir() - criar pasta se não existir

---

## Fase 5: Componentes Core ✅ (Básico implementado)

### 5.1 Layout Principal
- [x] app.tsx - Container principal
  - [x] Header (título, status, GitHub link)
  - [x] Editor principal
  - [x] Control Panel (Play/Stop/Volume)

---

### 5.2 Header
- [x] `src/components/header.tsx`
  - [x] Logo/título com gradiente
  - [x] Status indicator (verde/vermelho/amarelo)
  - [x] GitHub link button

---

### 5.3 Sidebar (File Browser)
- [ ] `src/components/file-browser.tsx` - Pendente para próxima fase
  - [ ] Lista de arquivos patterns/
  - [ ] Botão "Novo Arquivo"
  - [ ] Item de arquivo (nome, ícone, ativo)

---

### 5.4 Editor
- [x] `src/components/pattern-editor.tsx`
  - [x] CodeMirror wrapper
  - [x] JavaScript syntax highlighting
  - [x] Dark theme (one-dark)
  - [x] Auto-save integration
  - [ ] Keyboard shortcuts (próxima fase)

---

### 5.5 Visualizer
- [ ] `src/components/visualizer.tsx` - Pendente para próxima fase
  - [ ] Canvas setup
  - [ ] Waveform/spectrum analyzer
  - [ ] Animation loop

---

### 5.6 Controls
- [x] `src/components/control-panel.tsx`
  - [x] Play button
  - [x] Stop button
  - [x] Volume slider
  - [x] Keyboard shortcuts hints

---

### 5.7 Modais
- [ ] Pendente para próxima fase
  - [ ] Create file modal
  - [ ] Delete file modal
  - [ ] Rename file modal
  - [ ] Error modal

---

### 5.8 UI Components
- [x] `src/components/ui/button.tsx` - Button component
- [x] `src/components/ui/dialog.tsx` - Dialog component
- [x] `src/components/ui/sonner.tsx` - Toast (Sonner)
- [x] `src/components/ui/input.tsx` - Input component
- [x] `src/components/ui/label.tsx` - Label component

---

## Fase 6: Custom Hooks ✅ (Básico implementado)

### 6.1 Hooks de Integração Strudel
- [ ] `src/hooks/use-strudel-engine.ts` - Pendente para próxima fase
  - [ ] Inicializar @strudel/core
  - [ ] evalScope wrapper
  - [ ] play/stop pattern
  - [ ] Error handling

---

### 6.2 Hooks de WebSocket
- [x] `src/hooks/use-websocket.ts`
  - [x] Conectar/reconectar automaticamente
  - [x] Send/receive messages
  - [x] Connection status tracking
  - [x] Exponential backoff (MAX_RECONNECT_ATTEMPTS)
  - [x] Integrado com Zustand store

---

### 6.3 Hooks de File System
- [ ] `src/hooks/use-file-operations.ts` - Pendente para próxima fase
  - [ ] Integração com WebSocket
  - [ ] loadFiles()
  - [ ] saveFile()
  - [ ] createFile()
  - [ ] deleteFile()

---

### 6.4 Hooks de Keyboard
- [x] `src/hooks/use-keyboard-shortcuts.ts`
  - [x] Ctrl+Enter - play
  - [x] Ctrl+. - stop
  - [x] Ctrl+S - prevenir default
  - [x] Integrado com Zustand store

---

## Fase 7: Lib/Utilities ✅

### 7.1 Utilities
- [x] `src/lib/utils.ts` - Helper cn() para shadcn/ui
- [ ] `src/lib/strudel-helpers.ts` - Pendente para integração Strudel
- [x] `src/lib/validation.ts` - Validação de nomes, formatação
- [x] `src/lib/constants.ts` - Todas as constantes do projeto

---

### 7.2 Pattern Templates
- [x] Templates em `src/lib/constants.ts`:
  - [x] blank - pattern vazio
  - [x] techno - techno kick + hihat + bass
  - [x] ambient - pads + reverb + delay
  - [x] drum-bass - breakbeat rápido
  - [x] melodic - melodia + piano + filtros

---

## Fase 8: Integração Strudel ✅

### 8.1 Inicialização
- [x] `src/hooks/use-strudel-engine.ts` - Hook principal
- [x] Carregar @strudel/core dinamicamente
- [x] Carregar Dirt-Samples (GitHub)
- [x] Inicialização automática no mount
- [x] Logs de inicialização

---

### 8.2 Pattern Evaluation
- [x] Processar código (remover comentários)
- [x] evalScope com tratamento de erros completo
- [x] Capturar erros de sintaxe e runtime
- [x] Mostrar erros via toast e logs
- [x] Estados: loading, playing, stopped

---

### 8.3 Playback Control
- [x] Play pattern com auto-inicialização
- [x] Stop pattern e cleanup
- [x] Volume control (0-100%)
- [x] Integração com Zustand store
- [x] Play/Stop via keyboard shortcuts

---

## Fase 9: Testes

### 9.1 Setup de Testes
- [ ] Configurar Vitest
- [ ] Configurar Testing Library
- [ ] Mocks para WebSocket
- [ ] Mocks para File System

---

### 9.2 Testes de Store
- [ ] Testes para use-strudel.ts
- [ ] Testes para use-connection.ts
- [ ] Testes para use-files.ts
- [ ] Testes para use-ui.ts

---

### 9.3 Testes de Hooks
- [ ] use-strudel-engine
- [ ] use-websocket
- [ ] use-file-operations
- [ ] use-keyboard-shortcuts

---

### 9.4 Testes de Componentes
- [ ] Header
- [ ] FileBrowser
- [ ] PatternEditor
- [ ] ControlPanel
- [ ] Modals (CreateFile, DeleteFile, etc)

---

### 9.5 Testes de Integração
- [ ] WebSocket connection flow
- [ ] File create/edit/delete flow
- [ ] Pattern play/stop flow
- [ ] Hot reload flow (VSCode → browser)

---

### 9.6 Cobertura
- [ ] Verificar 80%+ coverage
- [ ] Gerar relatório HTML
- [ ] Configurar CI para rodar testes

---

## Fase 10: Documentação

### 10.1 README.md
- [ ] Introdução (1 parágrafo sobre o projeto)
- [ ] Features principais (bullet points)
- [ ] Instalação (npm install, npm run dev)
- [ ] Como usar (3-5 passos simples)
- [ ] Screenshots (opcional)
- [ ] Link para docs/ e GitHub

---

### 10.2 docs/architecture.md
- [ ] Diagrama de arquitetura
- [ ] Stack tecnológica
- [ ] Estrutura de pastas explicada
- [ ] Fluxo de dados (Zustand, WebSocket)

---

### 10.3 docs/websocket-protocol.md
- [ ] Tipos de mensagens
- [ ] Exemplos de payloads
- [ ] Fluxo de conexão/reconexão
- [ ] Error handling

---

### 10.4 docs/strudel-integration.md
- [ ] Como o @strudel/core é usado
- [ ] Pattern evaluation pipeline
- [ ] Tratamento de erros
- [ ] Extensibilidade

---

### 10.5 docs/contributing.md
- [ ] Como contribuir
- [ ] Setup de desenvolvimento
- [ ] Rodar testes
- [ ] Code style (CLAUDE.md)
- [ ] Processo de PR

---

### 10.6 docs/testing.md
- [ ] Como rodar testes
- [ ] Como escrever novos testes
- [ ] Estrutura de testes
- [ ] Mocking strategies

---

## Fase 11: Polimento e UX

### 11.1 Animações e Transições
- [ ] Fade in/out para modais
- [ ] Smooth scroll em file browser
- [ ] Loading states animados
- [ ] Toast slide in/out

---

### 11.2 Responsividade
- [ ] Mobile layout (opcional, mas testar)
- [ ] Tablet layout
- [ ] Resize panels fluido
- [ ] Breakpoints Tailwind

---

### 11.3 Error Handling
- [ ] WebSocket disconnect recovery
- [ ] File operation errors (permissões)
- [ ] Strudel evaluation errors
- [ ] Network errors

---

### 11.4 Loading States
- [ ] Skeleton loaders
- [ ] Spinners em ações assíncronas
- [ ] Disabled states durante loading

---

### 11.5 Acessibilidade
- [ ] Keyboard navigation completa
- [ ] ARIA labels
- [ ] Focus indicators
- [ ] Contraste de cores WCAG AA

---

## Fase 12: Build e Deploy

### 12.1 Build de Produção
- [ ] Otimizar bundle (code splitting)
- [ ] Minificar CSS/JS
- [ ] Gerar sourcemaps
- [ ] Analisar bundle size

---

### 12.2 Docker (opcional)
- [ ] Dockerfile
- [ ] docker-compose.yml
- [ ] .dockerignore

---

### 12.3 CI/CD (opcional)
- [ ] GitHub Actions para testes
- [ ] GitHub Actions para build
- [ ] Deploy automático (Vercel/Netlify)

---

### 12.4 Versionamento
- [ ] Tag v2.0.0
- [ ] CHANGELOG.md
- [ ] Release notes no GitHub

---

## Fase 13: Migração de Dados

### 13.1 Backup
- [ ] Backup dos patterns/ atuais
- [ ] Backup do README.md original

---

### 13.2 Migração
- [ ] Copiar patterns/ para novo projeto
- [ ] Verificar compatibilidade dos patterns
- [ ] Testar cada pattern no novo sistema

---

### 13.3 Limpeza
- [ ] Remover arquivos antigos (public/index.html, server.js)
- [ ] Atualizar .gitignore
- [ ] Limpar node_modules e reinstalar

---

## Checklist Final

### Pré-lançamento
- [ ] Todos os testes passando
- [ ] Code coverage >= 80%
- [ ] Sem warnings do TypeScript
- [ ] Sem warnings do ESLint
- [ ] Build de produção funcionando
- [ ] README.md completo
- [ ] docs/ completa
- [ ] Screenshots/GIFs para README

---

### Verificação de Features
- [ ] ✅ Listar arquivos patterns/
- [ ] ✅ Criar novo arquivo
- [ ] ✅ Deletar arquivo
- [ ] ✅ Renomear arquivo
- [ ] ✅ Editar no CodeMirror
- [ ] ✅ Auto-save funcional
- [ ] ✅ Hot reload (VSCode → browser)
- [ ] ✅ WebSocket conectando
- [ ] ✅ Play/Stop funcionando
- [ ] ✅ Visualizer animando
- [ ] ✅ Modais ao invés de alerts
- [ ] ✅ Status de conexão (verde/vermelho)
- [ ] ✅ GitHub link no header
- [ ] ✅ Keyboard shortcuts

---

### Verificação de Regras
- [ ] ✅ Arquivos em kebab-case
- [ ] ✅ Aspas simples em TS/TSX
- [ ] ✅ Sem ponto e vírgula
- [ ] ✅ Sem comentários no código
- [ ] ✅ README simples e direto
- [ ] ✅ docs/ técnico mas conciso

---

## Notas de Desenvolvimento

### Decisões Tomadas
1. **Pasta de patterns**: `patterns/` (consistente com comunidade Strudel)
2. **Nome do repo**: `strudel-live-code` ou sugerir `strudel-studio`
3. **Modais**: shadcn/ui Dialog (não window.alert)
4. **Editor**: CodeMirror 6 (moderno, leve, extensível)

---

### Próximos Passos (Fase 2 - Futuro)
- Compartilhamento de patterns (gerar link)
- Multi-file tabs
- Pattern recording (export WAV/MP3)
- VSCode extension oficial
- Collaboration mode (múltiplos usuários)
- Pattern history (git-like)

---

**Estimativa de Tempo**: 2-3 semanas (desenvolvimento full-time)
**Complexidade**: 🔴 Alta (projeto completo, full-stack, testes)

---

## 🚀 PRÓXIMA SESSÃO - Tarefas Prioritárias

**Data Planejada**: 2025-10-25
**Status**: ⏳ Aguardando execução

### 1. Visualizador de Áudio REAL ⚡
**Prioridade**: 🔴 Alta
**Tempo estimado**: 2-3 horas

#### Problema Atual
- Barras de áudio são procedurais/simuladas
- Não refletem o áudio real tocando
- Tentamos usar AnalyserNode mas Strudel não expõe os nós de áudio

#### Solução: MediaStream Capture API
Capturar o áudio da aba do navegador usando a Web Audio API.

**Implementação**:

1. **Criar novo hook: `use-audio-capture.ts`**
   ```typescript
   - Solicitar permissão do usuário (navigator.mediaDevices.getDisplayMedia)
   - Capturar o stream de áudio da aba
   - Criar MediaStreamSource + AnalyserNode
   - Expor frequencyData via ref ou state
   ```

2. **Atualizar `visualizer.tsx`**
   ```typescript
   - Consumir frequencyData do hook
   - Remover lógica procedural
   - Usar getByteFrequencyData() real
   - Manter decaimento suave (0.85)
   ```

3. **Adicionar UI de permissão**
   ```typescript
   - Modal/Toast solicitando permissão
   - Botão "Ativar visualizador real"
   - Fallback para barras procedurais se não autorizado
   ```

**Arquivos a modificar**:
- `src/hooks/use-audio-capture.ts` (CRIAR)
- `src/components/visualizer.tsx` (ATUALIZAR)
- `src/store/use-ui.ts` (adicionar state para permissão)

**Latência esperada**: 20-50ms (aceitável!)

---

### 2. Corrigir Controle de Volume 🔊
**Prioridade**: 🟡 Média
**Tempo estimado**: 30min - 1 hora

#### Problema Atual
- Slider de volume não afeta o áudio
- Volume está conectado ao store mas não ao Strudel

#### Solução
1. **Investigar `use-strudel-engine.ts`**
   - Verificar se `gainNode` está acessível
   - Conectar `volume` do store ao `gainNode.gain.value`

2. **Atualizar hook de volume**
   ```typescript
   useEffect(() => {
     if (window.strudel?.scheduler?.gainNode) {
       window.strudel.scheduler.gainNode.gain.value = volume
     }
   }, [volume])
   ```

3. **Testar persistência**
   - Volume deve persistir no localStorage
   - Volume deve aplicar ao iniciar

**Arquivos a modificar**:
- `src/hooks/use-strudel-engine.ts` (ATUALIZAR linhas 204-211)
- `src/components/control-panel.tsx` (verificar se onChange está correto)

---

### 3. Console Minimizável 📋
**Prioridade**: 🟢 Baixa
**Tempo estimado**: 1-2 horas

#### Problema Atual
- Log panel sempre visível (ocupa espaço)
- Não há como fechar/minimizar

#### Solução: Implementar toggle de visibilidade

1. **Adicionar state no `use-ui.ts`**
   ```typescript
   isLogPanelOpen: boolean (default: true)
   toggleLogPanel: () => void
   ```

2. **Criar botão de toggle**
   - Ícone: ChevronDown/ChevronUp
   - Posição: canto superior direito do log panel
   - Animação: slide down/up (Tailwind transitions)

3. **Implementar lógica de minimização**
   ```typescript
   - Quando minimizado: mostrar apenas 1 linha com botão de expandir
   - Quando expandido: mostrar log completo
   - Persistir estado no localStorage
   ```

4. **Adicionar atalho de teclado**
   - `Ctrl+L` ou `Ctrl+~` para toggle do console
   - Adicionar em `use-keyboard-shortcuts.ts`

**Arquivos a modificar**:
- `src/store/use-ui.ts` (adicionar state)
- `src/components/log-panel.tsx` (adicionar botão + animação)
- `src/hooks/use-keyboard-shortcuts.ts` (adicionar atalho)
- `src/lib/constants.ts` (adicionar KEYBOARD_SHORTCUTS.TOGGLE_CONSOLE)

---

## Plano de Execução (Ordem)

### Sessão 1 (Manhã - 2-3h)
1. ✅ Implementar `use-audio-capture.ts`
2. ✅ Atualizar `visualizer.tsx` com captura real
3. ✅ Testar e ajustar sensibilidade do analyser

### Sessão 2 (Tarde - 1-2h)
4. ✅ Corrigir volume control
5. ✅ Implementar console minimizável
6. ✅ Testar tudo integrado

### Sessão 3 (Polimento - 30min-1h)
7. ✅ Atualizar README.md com novas features
8. ✅ Criar GIF/screenshot do visualizador real
9. ✅ Commit e push

---

## Notas Técnicas

### MediaStream Capture API
```javascript
// Solicitar captura de tela/áudio
const stream = await navigator.mediaDevices.getDisplayMedia({
  video: false,
  audio: {
    echoCancellation: false,
    noiseSuppression: false,
    autoGainControl: false
  }
})

// Criar source do stream
const audioContext = new AudioContext()
const source = audioContext.createMediaStreamSource(stream)
const analyser = audioContext.createAnalyser()

source.connect(analyser)
// NÃO conectar ao destination (para evitar eco)

// Usar analyser.getByteFrequencyData()
```

### Compatibilidade
- Chrome/Edge: ✅ Suportado
- Firefox: ✅ Suportado
- Safari: ⚠️ Limitado (pode não funcionar)

### Fallback
Se permissão negada ou browser incompatível:
- Manter barras procedurais
- Mostrar toast: "Visualizador real desabilitado, usando simulação"

---

## 🎯 FEATURE IMPLEMENTADA: Visualizador Inteligente de Código Strudel

**Prioridade**: 🔴 CRÍTICA
**Tempo estimado**: 4-6 horas (Real: ~1.5 horas)
**Complexidade**: 🔴 Alta
**Status**: ✅ COMPLETO (2025-10-24)

---

### Objetivo

Criar um visualizador que **realmente entenda e reflita o código Strudel** de forma precisa, não apenas um padrão genérico. O visualizador deve **parsear, interpretar e renderizar** o código `.strudel` para gerar visualizações bonitas e precisas.

---

### Problema Atual

- ✅ Parser básico de mini-notation implementado (`"bd sd hh*2"`)
- ✅ Detecção de tipos de som (kick, snare, hihat)
- ❌ **NÃO entende estruturas complexas** do Strudel
- ❌ **NÃO captura todas as nuances** do pattern
- ❌ **Barras não refletem 100% o código** escrito

---

### Solução: Sistema de Análise Profunda de Código Strudel

Implementar um **parser completo** que entenda:

#### 1. **Estruturas de Pattern**
```javascript
// Mini-notation avançada
"bd sd [hh hh*2] cp"           // Subgrupos []
"bd*4 sd:2 hh:0:3"             // Sample selection
"bd@3 sd@1"                     // Pesos/probabilidade
"bd <sd cp>"                    // Alternância <>
"bd(3,8)"                       // Euclidean rhythm
"[bd sd, hh*4, ~ cp]"          // Stack/polifonia

// Funções Strudel
sound("bd").fast(2)             // Modificadores de velocidade
sound("bd").slow(0.5)
sound("bd").rev()               // Reverso
sound("bd").jux(rev)            // Stereo effects
sound("bd").every(4, fast(2))  // Condicionais

// Transformações
sound("bd").cut(1)              // Cut groups
sound("bd").gain(0.8)           // Volume
sound("bd").speed(0.5)          // Pitch
sound("bd").delay(0.5)          // Delay
sound("bd").room(0.8)           // Reverb

// Composição
stack(
  sound("bd*4"),
  sound("hh*8"),
  sound("~ sd")
)
```

#### 2. **Sistema de Parsing em Múltiplas Camadas**

**Camada 1: Lexer (Tokenização)**
```typescript
interface Token {
  type: 'SOUND' | 'FUNCTION' | 'NUMBER' | 'STRING' | 'OPERATOR' | 'GROUP'
  value: string
  position: number
  line: number
}

// Exemplo: "sound('bd').fast(2)"
// Tokens: [
//   { type: 'FUNCTION', value: 'sound', position: 0 },
//   { type: 'STRING', value: 'bd', position: 6 },
//   { type: 'FUNCTION', value: 'fast', position: 12 },
//   { type: 'NUMBER', value: '2', position: 17 }
// ]
```

**Camada 2: Parser (AST - Abstract Syntax Tree)**
```typescript
interface PatternNode {
  type: 'sound' | 'stack' | 'sequence' | 'modifier'
  value?: string
  children?: PatternNode[]
  modifiers?: Modifier[]
  position: number
  duration: number
}

interface Modifier {
  name: 'fast' | 'slow' | 'rev' | 'gain' | 'speed' | 'delay' | 'room' | 'cut' | 'every' | 'jux'
  args: (number | string | PatternNode)[]
}

// Exemplo AST para: sound("bd").fast(2).gain(0.8)
const ast: PatternNode = {
  type: 'sound',
  value: 'bd',
  modifiers: [
    { name: 'fast', args: [2] },
    { name: 'gain', args: [0.8] }
  ],
  position: 0,
  duration: 1
}
```

**Camada 3: Interpreter (Eventos de Áudio)**
```typescript
interface AudioEvent {
  sound: string                    // "bd", "sd", "hh"
  time: number                     // 0.0 - 1.0 (posição no ciclo)
  duration: number                 // 0.0 - 1.0
  type: SoundType                  // kick, snare, hihat, etc
  gain: number                     // 0.0 - 1.0
  speed: number                    // pitch
  effects: {
    delay?: number
    reverb?: number
    cut?: number
  }
  probability: number              // 0.0 - 1.0
  stereo?: 'left' | 'right' | 'center'
}

// Função principal
function parseStrudelToEvents(code: string): AudioEvent[] {
  const tokens = tokenize(code)
  const ast = parse(tokens)
  const events = interpret(ast)
  return events
}
```

**Camada 4: Visualizer Engine (Renderização)**
```typescript
interface VisualizerState {
  bars: Float32Array           // 128 frequências
  events: AudioEvent[]         // Eventos ativos
  cycle: number                // Posição atual no ciclo
  cps: number                  // Ciclos por segundo
  history: EventHistory[]      // Últimos 500ms
}

function renderFrame(state: VisualizerState): Float32Array {
  // 1. Detectar eventos que devem disparar agora
  const activeEvents = getActiveEvents(state.cycle, state.events)

  // 2. Para cada evento, calcular impacto nas frequências
  for (const event of activeEvents) {
    const impact = calculateFrequencyImpact(event)
    applyImpact(state.bars, impact)
  }

  // 3. Aplicar decay natural
  applyDecay(state.bars, 0.85)

  // 4. Aplicar efeitos (delay, reverb)
  applyEffects(state.bars, activeEvents)

  return state.bars
}
```

---

### Implementação Detalhada

#### **Arquivo 1: `src/lib/strudel-lexer.ts`**
```typescript
// Tokenização do código Strudel
export function tokenize(code: string): Token[]
```

#### **Arquivo 2: `src/lib/strudel-parser.ts`**
```typescript
// Parse de tokens → AST
export function parse(tokens: Token[]): PatternNode
```

#### **Arquivo 3: `src/lib/strudel-interpreter.ts`**
```typescript
// AST → AudioEvents
export function interpret(ast: PatternNode, cps: number): AudioEvent[]
```

#### **Arquivo 4: `src/hooks/use-strudel-analyzer.ts`**
```typescript
// Hook principal que integra tudo
export function useStrudelAnalyzer() {
  const { patternCode, isPlaying } = useStrudel()
  const [events, setEvents] = useState<AudioEvent[]>([])

  useEffect(() => {
    try {
      const parsedEvents = parseStrudelToEvents(patternCode)
      setEvents(parsedEvents)
    } catch (error) {
      console.error('Parse error:', error)
    }
  }, [patternCode])

  return { events }
}
```

#### **Arquivo 5: `src/hooks/use-audio-analyzer.ts` (Refatorar)**
```typescript
// Usar eventos parseados para gerar visualização
export function useAudioAnalyzer() {
  const { events } = useStrudelAnalyzer()
  const { isPlaying } = useStrudel()

  // Renderizar baseado em eventos reais
  const renderFrequencyData = useCallback(() => {
    const scheduler = window.strudel?.scheduler
    const cycle = (scheduler?.getTime() || 0) * (scheduler?.cps || 0.5)
    const cycleFrac = cycle % 1

    // Disparar eventos na posição correta
    const activeEvents = events.filter(e =>
      cycleFrac >= e.time &&
      cycleFrac < e.time + e.duration
    )

    // Calcular frequências baseado em eventos
    return calculateFrequencies(activeEvents, cycleFrac)
  }, [events])
}
```

---

### Estruturas Strudel Implementadas

#### ✅ Prioridade Alta - COMPLETO
- [x] Mini-notation básica: `"bd sd hh"`
- [x] Repetições: `hh*4`, `bd*2`
- [x] Silêncios: `~`, `_`
- [x] Subgrupos: `[bd sd] hh`
- [x] Sample selection: `bd:2`, `hh:0:3`
- [x] Stack: `stack(sound("bd"), sound("hh"))`
- [x] `sound()` e `s()`

#### ✅ Prioridade Média - COMPLETO
- [x] Alternância: `<bd sd cp>`
- [x] Euclidean: `bd(3,8)`
- [x] Modificadores: `fast()`, `slow()`, `rev()`
- [x] Efeitos: `gain()`, `speed()`, `delay()`, `room()`
- [x] Probabilidade/peso: `bd@3`

#### ⏳ Prioridade Baixa - Planejado para v2.1
- [ ] Condicionais: `every(4, fast(2))`
- [ ] Stereo: `jux()`, `juxBy()`
- [ ] Cut groups: `cut(1)`
- [ ] Transformações complexas: `bite()`, `chop()`

---

### Testes e Validação

#### Patterns de Teste
```javascript
// 1. Básico
sound("bd sd hh cp")

// 2. Com repetições
sound("bd*4 ~ sd hh*2")

// 3. Com stack
stack(
  sound("bd*4"),
  sound("~ sd ~ sd"),
  sound("hh*8")
)

// 4. Com modificadores
sound("bd sd").fast(2).gain(0.8)

// 5. Com subgrupos
sound("bd [sd cp] hh")

// 6. Euclidean
sound("bd(5,8)")

// 7. Sample selection
sound("bd:2 sd:0 hh:3:1")
```

#### Critérios de Sucesso
- ✅ Parser não quebra com código válido
- ✅ Eventos são gerados nas posições corretas
- ✅ Tipos de som detectados corretamente
- ✅ Modificadores aplicados (fast, slow, gain, etc)
- ✅ Visualizador reflete 90%+ do código escrito
- ✅ Latência < 50ms entre código e visualização

---

### Performance

#### Otimizações Necessárias
1. **Memoização de parsing**
   - Cache do AST por código
   - Invalidar apenas quando código muda

2. **Limit de eventos**
   - Máximo 100 eventos simultâneos
   - Descartar eventos antigos (> 500ms)

3. **Web Workers** (fase 2)
   - Parser em background thread
   - Não bloquear UI durante parsing

---

### UI/UX

#### Indicadores Visuais
- **Parser Status**: Badge mostrando "Parsing...", "✓ OK", "⚠ Error"
- **Event Count**: Mostrar quantos eventos foram detectados
- **Debug Mode**: Toggle para mostrar AST/eventos no console

---

### ✅ Arquivos Criados/Modificados

**CRIADO**:
- ✅ `src/lib/strudel-lexer.ts` (270 linhas) - Tokenizador completo
- ✅ `src/lib/strudel-parser.ts` (360 linhas) - Parser com AST
- ✅ `src/lib/strudel-interpreter.ts` (180 linhas) - Interpretador de eventos
- ✅ `src/hooks/use-strudel-analyzer.ts` (55 linhas) - Hook de integração
- ✅ `src/types/strudel-ast.ts` (120 linhas) - Definições de tipos

**MODIFICADO**:
- ✅ `src/hooks/use-audio-analyzer.ts` - Refatorado para usar eventos parseados
- ✅ `src/types/index.ts` - Exportar tipos do AST

**TOTAL**: ~1000 linhas de código novo (50% da estimativa, mais eficiente!)

---

### ✅ Roadmap de Implementação - COMPLETO

#### ✅ Fase 1: Parser Básico (45min - Real)
1. ✅ Implementar lexer para mini-notation
2. ✅ Implementar parser para estruturas simples
3. ✅ Testes com patterns básicos

#### ✅ Fase 2: Interpreter (30min - Real)
1. ✅ Converter AST → AudioEvents
2. ✅ Calcular timings precisos
3. ✅ Detectar tipos de som

#### ✅ Fase 3: Integração (15min - Real)
1. ✅ Conectar parser ao visualizador
2. ✅ Refatorar use-audio-analyzer
3. ✅ Testes end-to-end

#### ⏳ Fase 4: Polimento - Planejado
1. [ ] Debug mode
2. ✅ Error handling (básico)
3. ✅ Performance tuning (memoização)

---

## Log de Alterações

### 2025-10-24 (Tarde - Sessão 3: Correções Críticas)
- ✅ **CORRIGIDO**: Silêncios (`~ ~ ~ ~`) agora não geram barras no visualizador
- ✅ **ADICIONADO**: Suporte para `!` (hold/repeat) - exemplo: `bd:5!2` toca bd:5 por 2 steps
- ✅ **ADICIONADO**: Suporte para `.cpm()` modifier - controla BPM do pattern
- ✅ Parser refatorado: `s('...')` agora faz mini-notation parsing completo
- ✅ Interpreter não gera eventos para nós do tipo 'silence'
- ✅ Lexer suporta operadores `!` e `/`
- ✅ Patterns de teste criados: test-visualizer.strudel, test-silence.strudel
- ✅ TypeScript compilation: 0 errors

### 2025-10-24 (Tarde - Sessão 2)
- ✅ **IMPLEMENTADO**: Visualizador Inteligente de Código Strudel
- ✅ Criado sistema completo de Lexer → Parser → Interpreter → Visualizer
- ✅ Suporte para todas estruturas de prioridade alta e média
- ✅ Integração com visualizador existente
- ✅ Refatoração completa do use-audio-analyzer
- ✅ Suporte para modifiers (fast, slow, gain, speed, delay, room)
- ✅ Suporte para Euclidean rhythms
- ✅ Suporte para alternation, subgroups, sample selection
- ✅ TypeScript compilation: 0 errors

### 2025-10-24 (Tarde - Sessão 1)
- ✅ Implementado parser básico de mini-notation
- ✅ Detecção de tipos de som
- ✅ Sistema de eventos com decay
- 📋 **CRIADA SPEC**: Visualizador inteligente com parser completo

### 2025-10-24 (Manhã)
- ✅ Integração Strudel completa
- ✅ Auto-save funcionando (1000ms debounce)
- ✅ Validação de código com delay (100ms)
- ✅ Barras procedurais implementadas

### 2025-10-23
- ✅ TODO.md criado
- ✅ CLAUDE.md criado
- ⏳ Aguardando início da implementação
