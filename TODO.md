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

## Fase 2: TypeScript Types e Interfaces

### 2.1 Tipos Base
- [ ] `src/types/pattern.ts` - Pattern, PatternFile, PatternMetadata
- [ ] `src/types/websocket.ts` - WSMessage, WSEvent, ConnectionStatus
- [ ] `src/types/playback.ts` - PlaybackState, AudioConfig
- [ ] `src/types/ui.ts` - LogEntry, ToastType, ModalState
- [ ] `src/types/file.ts` - FileInfo, FileOperation

---

### 2.2 Tipos Strudel
- [ ] Criar declarações de tipo para @strudel/core
- [ ] Estender tipos para pattern API
- [ ] Tipos para evalScope, controls, samples

---

## Fase 3: Zustand Store

### 3.1 Store Principal
- [ ] `src/store/use-strudel.ts` - Store global
  - [ ] State: isPlaying, currentPattern, patterns, selectedFile
  - [ ] Actions: play, stop, setPattern, loadPattern
  - [ ] Middleware: devtools, persist (selectedFile, settings)

---

### 3.2 Stores Específicos
- [ ] `src/store/use-connection.ts` - WebSocket connection state
  - [ ] State: status, reconnectAttempts, lastMessage
  - [ ] Actions: connect, disconnect, send

- [ ] `src/store/use-files.ts` - File management
  - [ ] State: files, currentFile, isLoading
  - [ ] Actions: loadFiles, createFile, deleteFile, renameFile

- [ ] `src/store/use-ui.ts` - UI state
  - [ ] State: logs, modals, toasts
  - [ ] Actions: addLog, openModal, showToast

---

## Fase 4: Backend (WebSocket Server)

### 4.1 Servidor Express
- [ ] `server/index.ts` - HTTP + WebSocket server
  - [ ] Servir build do Vite
  - [ ] WebSocket server setup
  - [ ] File watcher (chokidar)
  - [ ] Error handling

---

### 4.2 Protocolo WebSocket
- [ ] Definir mensagens do protocolo
  - [ ] `pattern-update` - arquivo mudou
  - [ ] `file-list` - lista de arquivos
  - [ ] `file-created` - novo arquivo
  - [ ] `file-deleted` - arquivo removido
  - [ ] `connection-status` - status da conexão

---

### 4.3 File System Operations
- [ ] `server/lib/file-manager.ts`
  - [ ] listFiles() - listar patterns/
  - [ ] readFile() - ler arquivo
  - [ ] writeFile() - criar/editar arquivo
  - [ ] deleteFile() - deletar arquivo
  - [ ] watchFiles() - observar mudanças

---

## Fase 5: Componentes Core

### 5.1 Layout Principal
- [ ] `src/components/app-layout.tsx` - Container principal
  - [ ] Header (título, status, GitHub link)
  - [ ] ResizablePanels (sidebar, editor, visualizer)
  - [ ] Footer (controles)

---

### 5.2 Header
- [ ] `src/components/header.tsx`
  - [ ] Logo/título com gradiente
  - [ ] Status indicator (verde/vermelho/amarelo)
  - [ ] GitHub link button
  - [ ] Theme toggle (opcional)

---

### 5.3 Sidebar (File Browser)
- [ ] `src/components/file-browser.tsx`
  - [ ] Lista de arquivos patterns/
  - [ ] Botão "Novo Arquivo"
  - [ ] Item de arquivo (nome, ícone, ativo)
  - [ ] Context menu (renomear, deletar)

- [ ] `src/components/file-item.tsx`
  - [ ] Highlight arquivo selecionado
  - [ ] Click handler
  - [ ] Context menu trigger

---

### 5.4 Editor
- [ ] `src/components/pattern-editor.tsx`
  - [ ] CodeMirror wrapper
  - [ ] JavaScript/Strudel syntax
  - [ ] Dark theme (one-dark)
  - [ ] Auto-save (debounce 1000ms)
  - [ ] Keyboard shortcuts

---

### 5.5 Visualizer
- [ ] `src/components/visualizer.tsx`
  - [ ] Canvas setup
  - [ ] Waveform/spectrum analyzer
  - [ ] Animation loop (requestAnimationFrame)
  - [ ] Responsive resize

---

### 5.6 Controls
- [ ] `src/components/control-panel.tsx`
  - [ ] Play button (Ctrl+Enter)
  - [ ] Stop button (Ctrl+.)
  - [ ] Volume slider
  - [ ] BPM display (se possível extrair)

---

### 5.7 Modais
- [ ] `src/components/modals/create-file-modal.tsx`
  - [ ] Input para nome do arquivo
  - [ ] Validação (.strudel extension)
  - [ ] Template selector (blank, techno, ambient, etc)

- [ ] `src/components/modals/delete-file-modal.tsx`
  - [ ] Confirmação de exclusão
  - [ ] Avisar se é o arquivo atual

- [ ] `src/components/modals/rename-file-modal.tsx`
  - [ ] Input com nome atual
  - [ ] Validação de nome

- [ ] `src/components/modals/error-modal.tsx`
  - [ ] Exibir erros de avaliação
  - [ ] Stack trace formatado
  - [ ] Sugestões de correção

---

### 5.8 UI Auxiliar
- [ ] `src/components/toast-provider.tsx` - Toast notifications
- [ ] `src/components/log-panel.tsx` - Console de logs (opcional)
- [ ] `src/components/loading-spinner.tsx` - Loading states

---

## Fase 6: Custom Hooks

### 6.1 Hooks de Integração Strudel
- [ ] `src/hooks/use-strudel-engine.ts`
  - [ ] Inicializar @strudel/core
  - [ ] evalScope wrapper
  - [ ] play/stop pattern
  - [ ] Error handling

---

### 6.2 Hooks de WebSocket
- [ ] `src/hooks/use-websocket.ts`
  - [ ] Conectar/reconectar
  - [ ] Send/receive messages
  - [ ] Connection status
  - [ ] Exponential backoff

---

### 6.3 Hooks de File System
- [ ] `src/hooks/use-file-operations.ts`
  - [ ] loadFiles()
  - [ ] saveFile()
  - [ ] createFile()
  - [ ] deleteFile()
  - [ ] Error handling

---

### 6.4 Hooks de Keyboard
- [ ] `src/hooks/use-keyboard-shortcuts.ts`
  - [ ] Ctrl+Enter - play
  - [ ] Ctrl+. - stop
  - [ ] Ctrl+S - save (prevenir default)
  - [ ] Ctrl+N - novo arquivo

---

## Fase 7: Lib/Utilities

### 7.1 Utilities
- [ ] `src/lib/utils.ts` - Helpers gerais (cn, formatDate, etc)
- [ ] `src/lib/strudel-helpers.ts` - Helpers específicos Strudel
- [ ] `src/lib/validation.ts` - Validação de nomes, patterns
- [ ] `src/lib/constants.ts` - Constantes (DEFAULT_PATTERN, WS_URL, etc)

---

### 7.2 Pattern Templates
- [ ] `src/lib/templates.ts`
  - [ ] blank - pattern vazio
  - [ ] techno - techno kick + hihat
  - [ ] ambient - pads + reverb
  - [ ] drum-bass - breakbeat
  - [ ] melodic - melodia + acordes

---

## Fase 8: Integração Strudel

### 8.1 Inicialização
- [ ] Carregar @strudel/core
- [ ] Registrar ZZFX synth sounds
- [ ] Carregar Dirt-Samples
- [ ] Configurar Web Audio context

---

### 8.2 Pattern Evaluation
- [ ] Processar código (remover //, extrair $:)
- [ ] evalScope com tratamento de erros
- [ ] Capturar erros de sintaxe
- [ ] Capturar erros de runtime

---

### 8.3 Playback Control
- [ ] Play com verificação de Audio Context
- [ ] Stop e cleanup
- [ ] Volume control
- [ ] Prevenir múltiplos patterns simultâneos

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

## Log de Alterações

### 2025-10-23
- ✅ TODO.md criado
- ✅ CLAUDE.md criado
- ⏳ Aguardando início da implementação
