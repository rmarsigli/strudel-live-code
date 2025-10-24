# Regras do Projeto - Strudel Live Code

## Convenções de Nomenclatura

### Arquivos e Pastas
- **Todos os arquivos**: `kebab-case`
  - Componentes: `pattern-editor.tsx`
  - Hooks: `use-strudel.ts`
  - Utils: `strudel-helpers.ts`
  - Pastas: `src/components/`, `docs/`

### Código
- **Componentes React**: `PascalCase` (ex: `PatternEditor`)
- **Funções/variáveis**: `camelCase` (ex: `playPattern`)
- **Constantes**: `SCREAMING_SNAKE_CASE` (ex: `DEFAULT_PATTERN`)

## Regras de TypeScript/TSX

### Obrigatório
- ✅ **Aspas simples** sempre: `import { useState } from 'react'`
- ✅ **NUNCA usar ponto e vírgula** (`;`)
- ✅ **NUNCA comentários no código** (apenas em `.md`)

### Exemplos
```typescript
import { useState } from 'react'

function playPattern(code: string) {
  const pattern = evalScope(code)
  pattern.play()
}
```

## Estrutura do Projeto

```
src/
├── components/    # React components (.tsx)
├── hooks/        # Custom hooks (.ts)
├── store/        # Zustand stores (.ts)
├── lib/          # Utils e helpers (.ts)
├── types/        # TypeScript types (.ts)
├── patterns/     # Arquivos .strudel
└── styles/       # Global CSS

docs/             # Documentação técnica
```

## Documentação

### README.md
- **Público-alvo**: Entusiastas Strudel (não experts em código)
- **Objetivo**: Plug and play - simples e direto
- **Conteúdo máximo**:
  - 1 parágrafo sobre o projeto
  - 3 comandos de instalação
  - 5 passos de como usar
  - Link para docs/

### docs/
- **Tom**: Técnico mas conciso (sem prolixidade)
- **Arquivos** (em `kebab-case`):
  - `architecture.md`
  - `websocket-protocol.md`
  - `strudel-integration.md`
  - `contributing.md`
  - `testing.md`

## UI/UX

### Regras de Interface
- ❌ **NUNCA** usar `alert()`, `confirm()`, `prompt()`
- ✅ **SEMPRE** usar modais (shadcn/ui Dialog)
- ✅ **Toast** para notificações
- ✅ **Modais** para confirmações e inputs

### Componentes shadcn/ui
- Dialog (modais)
- Button
- Toast/Sonner
- Separator
- DropdownMenu
- ScrollArea
- ResizablePanelGroup

## Features Obrigatórias

### Gerenciamento de Arquivos
- Listar arquivos de `patterns/`
- Criar arquivo (via modal)
- Deletar arquivo (confirmação via modal)
- Renomear arquivo
- Abrir no editor ao clicar

### Editor
- CodeMirror 6
- Syntax highlighting (JavaScript/Strudel)
- Auto-save com debounce (1000ms)
- Keyboard shortcuts:
  - `Ctrl+Enter` = Play
  - `Ctrl+.` = Stop

### Hot Reload
- Editar no VSCode (ou qualquer editor) ou no site
- Salvar arquivo
- Atualizar automaticamente no browser via WebSocket

### Header
- Título do projeto
- Status de conexão (verde/vermelho/amarelo)
- Link do GitHub: `github.com/rmarsigli/strudel-live-code`

## TypeScript Estrito

### tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## Testes

### Requisitos
- Cobertura mínima: **80%**
- Todos hooks testados
- Componentes críticos testados
- Stores testados

### Framework
- Vitest
- Testing Library

## Git

### Repositório
- `github.com/rmarsigli/strudel-live-code`
- Alternativa sugerida: `strudel-studio`

### Commits
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
- Mensagens em inglês
- Atomic commits

## Decisões do Projeto

### Pasta de Patterns
- **Nome**: `patterns/` (consistente com comunidade Strudel)
- **Extensão**: `.strudel`

### Stack
- Vite + React + TypeScript
- Tailwind CSS
- Zustand (state management)
- CodeMirror 6
- shadcn/ui
- @strudel/core

---

**Atualização**: Sempre que completar uma tarefa do TODO.md, marcar como concluída.
**Modificações**: Sempre que alterar algo, marcar no TODO.md.
