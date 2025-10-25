# TODO: Strudel Studio - Roadmap Completo

**Início**: 2025-10-23
**Última Análise**: 2025-10-24
**Status Atual**: ⭐ **Projeto Nota 88/100** - Pronto para melhorias finais
**Versão Atual**: 1.0.0
**Versão Alvo**: 2.0.0 (após melhorias)

> Ver `ANALYSIS.md` para análise completa do projeto

---

## 📊 Status Geral do Projeto

### ✅ Concluído (Fases 1-8)
- [x] Setup e configuração base
- [x] TypeScript types e interfaces
- [x] Zustand stores
- [x] Backend WebSocket server
- [x] Componentes core
- [x] Custom hooks
- [x] Integração Strudel
- [x] Visualizador inteligente de código

### 🎯 Em Andamento
- [ ] Testes (96.2% coverage, mas falta parser/lexer/interpreter)
- [ ] Documentação (README OK, falta CONTRIBUTING.md, CHANGELOG.md)

### 📋 Planejado
- [ ] Polimento e UX
- [ ] Build e Deploy
- [ ] Features avançadas (v2.0)

---

## 🚀 MELHORIAS PRIORITÁRIAS (Baseado em ANALYSIS.md)

### 🔴 Alta Prioridade (Para chegar a 95+/100)

#### 1. Adicionar Testes para Parser/Lexer/Interpreter
**Status**: ⏳ Pendente
**Tempo estimado**: 4-6 horas
**Prioridade**: CRÍTICA
**Impacto na nota**: +3 pontos

**Arquivos a criar**:
- [ ] `src/lib/strudel-lexer.test.ts`
  - [ ] Testar tokenização básica
  - [ ] Testar todos os tipos de tokens
  - [ ] Testar edge cases (comentários, strings, números)
  - [ ] Coverage alvo: 95%+

- [ ] `src/lib/strudel-parser.test.ts`
  - [ ] Testar parsing de mini-notation
  - [ ] Testar stack, cat, slowcat, fastcat
  - [ ] Testar subgrupos, alternation, euclidean
  - [ ] Testar modifiers (fast, slow, gain, etc)
  - [ ] Testar error handling
  - [ ] Coverage alvo: 95%+

- [ ] `src/lib/strudel-interpreter.test.ts`
  - [ ] Testar geração de eventos
  - [ ] Testar timings corretos
  - [ ] Testar tipos de som
  - [ ] Testar modifiers aplicados
  - [ ] Testar euclidean rhythm
  - [ ] Coverage alvo: 95%+

**Exemplos de testes**:
```typescript
describe('strudel-lexer', () => {
  it('should tokenize basic sound pattern', () => {
    const tokens = tokenize('s("bd sd hh")')
    expect(tokens).toMatchSnapshot()
  })

  it('should handle modifiers', () => {
    const tokens = tokenize('s("bd").fast(2).gain(0.8)')
    expect(tokens[2].type).toBe('FUNCTION')
    expect(tokens[2].value).toBe('fast')
  })
})
```

---

#### 2. Documentar API com JSDoc
**Status**: ⏳ Pendente
**Tempo estimado**: 3-4 horas
**Prioridade**: ALTA
**Impacto na nota**: +2 pontos

**Arquivos a documentar**:
- [ ] `src/lib/strudel-lexer.ts`
  ```typescript
  /**
   * Tokenizes Strudel code into an array of tokens
   * @param code - The Strudel code to tokenize
   * @returns Array of tokens representing the code structure
   * @example
   * ```ts
   * const tokens = tokenize('s("bd sd")')
   * // Returns: [{ type: 'FUNCTION', value: 's', ... }, ...]
   * ```
   */
  export function tokenize(code: string): Token[]
  ```

- [ ] `src/lib/strudel-parser.ts`
  ```typescript
  /**
   * Parses tokens into an Abstract Syntax Tree (AST)
   * @param tokens - Array of tokens from lexer
   * @returns PatternNode representing the AST, or null if parsing fails
   * @throws {Error} If tokens are malformed
   */
  export function parse(tokens: Token[]): ParseResult
  ```

- [ ] `src/lib/strudel-interpreter.ts`
  ```typescript
  /**
   * Interprets AST into audio events for visualization
   * @param ast - The pattern AST to interpret
   * @param cps - Cycles per second (tempo)
   * @returns Array of audio events with timing information
   */
  export function interpret(ast: PatternNode | null, cps: number): AudioEvent[]
  ```

- [ ] `src/hooks/use-strudel-visualizer.ts` (package)
- [ ] `src/hooks/use-strudel-engine.ts`
- [ ] `src/hooks/use-websocket.ts`

---

#### 3. Criar CONTRIBUTING.md
**Status**: ⏳ Pendente
**Tempo estimado**: 2 horas
**Prioridade**: ALTA
**Impacto na nota**: +2 pontos

**Conteúdo a incluir**:
- [ ] Como fazer setup do ambiente de desenvolvimento
- [ ] Como rodar o projeto localmente
- [ ] Como rodar os testes
- [ ] Code style e convenções (referência ao CLAUDE.md)
- [ ] Como criar uma pull request
- [ ] Como reportar bugs
- [ ] Roadmap de features

**Template**:
```markdown
# Contributing to Strudel Studio

## Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy environment: `cp .env.example .env`
4. Run server: `pnpm run server`
5. Run dev: `pnpm run dev`

## Code Style

See [CLAUDE.md](./CLAUDE.md) for complete code style guide.

- Kebab-case for files
- Single quotes
- No semicolons
- No code comments (use JSDoc)

## Running Tests

...
```

---

#### 4. Criar CHANGELOG.md
**Status**: ⏳ Pendente
**Tempo estimado**: 1 hora
**Prioridade**: ALTA
**Impacto na nota**: +1 ponto

**Formato** (Keep a Changelog):
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-24

### Added
- Live coding music interface with Strudel
- Real-time audio visualization
- WebSocket-based hot reload
- Custom parser/lexer/interpreter for Strudel syntax
- Package @strudel-studio/visualizer (npm-ready)
- 96.2% test coverage
- CI/CD with GitHub Actions

### Fixed
- Audio playback issues
- Visualizer sync with patterns
- Silence handling in parser

...
```

---

### 🟡 Média Prioridade

#### 5. Testes E2E com Playwright
**Status**: ⏳ Pendente
**Tempo estimado**: 6-8 horas
**Prioridade**: MÉDIA

**Setup**:
- [ ] Instalar Playwright: `pnpm add -D @playwright/test`
- [ ] Criar `playwright.config.ts`
- [ ] Criar pasta `e2e/`

**Testes a criar**:
- [ ] `e2e/play-pattern.spec.ts`
  - [ ] Carregar app
  - [ ] Escrever pattern no editor
  - [ ] Clicar em Play
  - [ ] Verificar que visualizador está animando
  - [ ] Clicar em Stop

- [ ] `e2e/websocket.spec.ts`
  - [ ] Verificar conexão WebSocket
  - [ ] Verificar status indicator (verde)
  - [ ] Simular desconexão
  - [ ] Verificar reconexão

- [ ] `e2e/keyboard-shortcuts.spec.ts`
  - [ ] Ctrl+Enter para play
  - [ ] Ctrl+. para stop
  - [ ] Verificar que funcionam

**Exemplo**:
```typescript
import { test, expect } from '@playwright/test'

test('should play pattern with Ctrl+Enter', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.fill('[data-testid="editor"]', 's("bd sd hh cp")')
  await page.keyboard.press('Control+Enter')
  await expect(page.locator('[data-testid="visualizer"]')).toBeVisible()
})
```

---

#### 6. Configurar Dependabot
**Status**: ⏳ Pendente
**Tempo estimado**: 30 minutos
**Prioridade**: MÉDIA

**Arquivo a criar**: `.github/dependabot.yml`
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10

  - package-ecosystem: "npm"
    directory: "/packages/visualizer"
    schedule:
      interval: "weekly"
```

---

#### 7. Feature Flags
**Status**: ⏳ Pendente
**Tempo estimado**: 2-3 horas
**Prioridade**: MÉDIA

**Implementação**:
- [ ] Criar `src/lib/feature-flags.ts`
  ```typescript
  export const FEATURES = {
    EXPERIMENTAL_VISUALIZER: import.meta.env.VITE_FEATURE_EXPERIMENTAL_VIZ === 'true',
    AUDIO_CAPTURE: import.meta.env.VITE_FEATURE_AUDIO_CAPTURE === 'true',
    PATTERN_SHARE: import.meta.env.VITE_FEATURE_PATTERN_SHARE === 'true'
  }
  ```

- [ ] Usar em componentes:
  ```typescript
  {FEATURES.EXPERIMENTAL_VISUALIZER && <ExperimentalVisualizer />}
  ```

- [ ] Adicionar em `.env.example`

---

#### 8. Storybook para Componentes UI
**Status**: ⏳ Pendente
**Tempo estimado**: 4-6 horas
**Prioridade**: MÉDIA

**Setup**:
- [ ] Instalar Storybook: `npx storybook@latest init`
- [ ] Configurar Vite integration
- [ ] Criar stories para componentes

**Stories a criar**:
- [ ] `src/components/ui/button.stories.tsx`
- [ ] `src/components/ui/input.stories.tsx`
- [ ] `src/components/ui/dialog.stories.tsx`
- [ ] `src/components/control-panel.stories.tsx`
- [ ] `src/components/visualizer.stories.tsx`

---

### 🟢 Baixa Prioridade

#### 9. Branch Protection Rules (GitHub)
**Status**: ⏳ Pendente
**Tempo estimado**: 15 minutos
**Prioridade**: BAIXA

**Configurar no GitHub**:
- [ ] Settings → Branches → Add rule
- [ ] Branch name pattern: `main`
- [ ] Require pull request reviews (1 approval)
- [ ] Require status checks (CI)
- [ ] Require branches to be up to date

---

#### 10. Pull Request Template
**Status**: ⏳ Pendente
**Tempo estimado**: 30 minutos
**Prioridade**: BAIXA

**Arquivo a criar**: `.github/pull_request_template.md`
```markdown
## Description
<!-- Describe your changes -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] My code follows the code style (CLAUDE.md)
- [ ] I have added tests
- [ ] All tests are passing
- [ ] I have updated the documentation
```

---

#### 11. Arquivo de Constants Centralizados
**Status**: ✅ JÁ EXISTE
**Arquivo**: `src/lib/constants.ts`

**Melhorias**:
- [ ] Mover mais magic numbers para constants
- [ ] Adicionar documentação JSDoc

---

## ✅ FASE 1-8: COMPLETO

<details>
<summary>Ver detalhes das fases concluídas</summary>

### Fase 1: Setup e Configuração Base ✅
- [x] Projeto Vite + React + TypeScript
- [x] Tailwind CSS
- [x] ESLint + Prettier
- [x] TypeScript strict
- [x] Dependências instaladas

### Fase 2: TypeScript Types ✅
- [x] Types em `src/types/`
- [x] Barrel exports

### Fase 3: Zustand Store ✅
- [x] use-strudel.ts
- [x] use-connection.ts
- [x] use-files.ts
- [x] use-ui.ts

### Fase 4: Backend WebSocket ✅
- [x] Express + WebSocket server
- [x] File watcher
- [x] Protocolo de mensagens

### Fase 5: Componentes Core ✅
- [x] Header
- [x] Pattern Editor
- [x] Control Panel
- [x] Visualizer
- [x] UI components (shadcn)

### Fase 6: Custom Hooks ✅
- [x] use-strudel-engine
- [x] use-websocket
- [x] use-keyboard-shortcuts

### Fase 7: Lib/Utilities ✅
- [x] Constants
- [x] Validation
- [x] Utils (cn)

### Fase 8: Integração Strudel ✅
- [x] Auto-init
- [x] Pattern evaluation
- [x] Play/Stop control
- [x] Volume control

</details>

---

## 🎯 Fase 9: Testes (Atualizado)

### 9.1 Setup de Testes ✅
- [x] Vitest configurado
- [x] Testing Library configurado
- [x] Coverage com v8

### 9.2 Testes de Store ✅
- [x] use-strudel.test.ts
- [x] use-connection.test.ts
- [x] use-files.test.ts
- [x] use-ui.test.ts

### 9.3 Testes de Hooks ⏳
- [x] use-strudel-engine (básico)
- [x] use-websocket (básico)
- [ ] use-file-operations (não implementado)
- [x] use-keyboard-shortcuts (básico)

### 9.4 Testes de Componentes ⏳
- [x] Button
- [x] Input
- [ ] Header
- [ ] FileBrowser
- [ ] PatternEditor
- [ ] ControlPanel
- [ ] Visualizer

### 9.5 Testes de Parser/Lexer/Interpreter 🔴
- [ ] strudel-lexer.test.ts (CRÍTICO)
- [ ] strudel-parser.test.ts (CRÍTICO)
- [ ] strudel-interpreter.test.ts (CRÍTICO)

### 9.6 Testes E2E 🟡
- [ ] Playwright setup
- [ ] Play/Stop flow
- [ ] WebSocket flow
- [ ] Keyboard shortcuts

### 9.7 Cobertura ✅
- [x] Coverage atual: **96.2%**
- [x] Relatório HTML gerado
- [x] CI rodando testes

**Meta**: Manter 96%+ após adicionar testes de parser

---

## 📖 Fase 10: Documentação (Atualizado)

### 10.1 README.md ✅
- [x] Introdução
- [x] Features
- [x] Instalação
- [x] Como usar
- [x] Screenshots/banner

### 10.2 docs/architecture.md ⏳
- [ ] Diagrama de arquitetura
- [ ] Stack tecnológica
- [ ] Estrutura de pastas
- [ ] Fluxo de dados

### 10.3 docs/websocket-protocol.md ⏳
- [ ] Tipos de mensagens
- [ ] Exemplos de payloads
- [ ] Error handling

### 10.4 docs/strudel-integration.md ⏳
- [ ] Como @strudel/core é usado
- [ ] Pattern evaluation
- [ ] Extensibilidade

### 10.5 CONTRIBUTING.md 🔴
- [ ] Como contribuir (ALTA PRIORIDADE)
- [ ] Setup de desenvolvimento
- [ ] Code style
- [ ] Processo de PR

### 10.6 docs/testing.md ✅
- [x] Como rodar testes
- [x] Estrutura de testes
- [x] Coverage

### 10.7 CHANGELOG.md 🔴
- [ ] Formato Keep a Changelog (ALTA PRIORIDADE)
- [ ] Versionamento semântico
- [ ] Release notes

### 10.8 ANALYSIS.md ✅
- [x] Análise completa do projeto (2025-10-24)
- [x] Nota: 88/100
- [x] Breakdown por categoria
- [x] Roadmap de melhorias

---

## 🎨 Fase 11: Polimento e UX

### 11.1 Animações ⏳
- [ ] Fade in/out modais
- [ ] Smooth transitions
- [ ] Loading states

### 11.2 Responsividade ⏳
- [ ] Mobile layout
- [ ] Tablet layout
- [ ] Breakpoints

### 11.3 Error Handling ✅
- [x] WebSocket disconnect
- [x] File operation errors
- [x] Strudel evaluation errors

### 11.4 Loading States ⏳
- [ ] Skeleton loaders
- [ ] Spinners
- [ ] Disabled states

### 11.5 Acessibilidade ⏳
- [ ] Keyboard navigation
- [ ] ARIA labels
- [ ] Focus indicators
- [ ] Contraste WCAG AA

---

## 🚀 Fase 12: Build e Deploy

### 12.1 Build de Produção ✅
- [x] Bundle otimizado
- [x] CSS/JS minificado
- [x] Sourcemaps
- [ ] Análise de bundle (pendente otimização)

**Nota**: Bundle atual 855KB (warning Vite). Não otimizar agora conforme solicitado.

### 12.2 CI/CD ✅
- [x] GitHub Actions
- [x] Testes automáticos
- [x] Build automático
- [x] Type check
- [x] Codecov

### 12.3 Versionamento ⏳
- [ ] Tag v1.0.0
- [ ] CHANGELOG.md
- [ ] Release notes

### 12.4 Dependabot 🟡
- [ ] Configurar .github/dependabot.yml (MÉDIA PRIORIDADE)

---

## 📦 Package @strudel-studio/visualizer ✅

### Status: COMPLETO
- [x] Estrutura de package npm
- [x] Build dual (CJS + ESM)
- [x] TypeScript declarations
- [x] README completo
- [x] PUBLISHING guide
- [x] Zero dependencies
- [x] MIT license
- [x] Build: 29KB (CJS), 28KB (ESM)

### Próximos Passos
- [ ] Publicar no npm
- [ ] Adicionar badge npm version
- [ ] Criar exemplos de uso
- [ ] Análise profunda da API (TODO.md da package)

---

## 📋 Checklist de Qualidade

### Código ✅
- [x] Zero erros TypeScript
- [x] Zero erros ESLint
- [x] TypeScript strict mode
- [x] Aspas simples
- [x] Sem ponto e vírgula
- [x] Kebab-case

### Testes ⏳
- [x] 96.2% coverage (excelente!)
- [ ] Testes de parser/lexer/interpreter (PENDENTE)
- [ ] Testes E2E (PENDENTE)

### Documentação ⏳
- [x] README completo
- [x] ANALYSIS.md criado
- [ ] CONTRIBUTING.md (PENDENTE)
- [ ] CHANGELOG.md (PENDENTE)
- [ ] JSDoc em funções críticas (PENDENTE)

### DevOps ✅
- [x] CI/CD funcionando
- [x] Todos os checks passando
- [x] Coverage report
- [ ] Dependabot (PENDENTE)

---

## 🎖️ Métricas de Qualidade

**Análise completa em:** `ANALYSIS.md`

| Categoria | Nota | Status |
|-----------|------|--------|
| Arquitetura | 18/20 | ✅ Excelente |
| Código | 17/20 | ✅ Muito Bom |
| Testes | 16/20 | ✅ Muito Bom |
| Documentação | 15/20 | ✅ Bom |
| DevOps | 20/20 | ⭐ Perfeito |
| Features | 18/20 | ✅ Excelente |
| Performance | 17/20 | ✅ Muito Bom |
| Dependências | 19/20 | ✅ Excelente |
| Git | 18/20 | ✅ Excelente |
| **TOTAL** | **88/100** | ⭐⭐⭐⭐½ |

**Meta**: Chegar a 95+/100 completando as melhorias de Alta Prioridade

---

## 🗓️ Próximas Sessões

### Sessão 1: Testes de Parser (4-6h)
**Prioridade**: 🔴 CRÍTICA
- [ ] Criar strudel-lexer.test.ts
- [ ] Criar strudel-parser.test.ts
- [ ] Criar strudel-interpreter.test.ts
- [ ] Atingir 95%+ coverage

### Sessão 2: Documentação (3-4h)
**Prioridade**: 🔴 ALTA
- [ ] Adicionar JSDoc completo
- [ ] Criar CONTRIBUTING.md
- [ ] Criar CHANGELOG.md

### Sessão 3: Testes E2E (6-8h)
**Prioridade**: 🟡 MÉDIA
- [ ] Setup Playwright
- [ ] Criar testes E2E principais
- [ ] Integrar no CI

### Sessão 4: Polimento (variável)
**Prioridade**: 🟢 BAIXA
- [ ] Feature flags
- [ ] Storybook
- [ ] Dependabot
- [ ] PR templates

---

## 📝 Log de Alterações

### 2025-10-24 (Noite - Sessão 5: Análise e Roadmap)
- ✅ **CRIADO**: ANALYSIS.md com análise completa do projeto
- ✅ **ATUALIZADO**: TODO.md com roadmap baseado em análise
- ✅ **NOTA DO PROJETO**: 88/100
- ✅ **IDENTIFICADAS**: Melhorias prioritárias para chegar a 95+
- ✅ **ORGANIZADO**: Roadmap por prioridade (Alta/Média/Baixa)
- ✅ Todos os erros de CI/CD corrigidos
- ✅ Build passando: lint, tests, type-check, build

### 2025-10-24 (Tarde - Sessão 4: Package @strudel-studio/visualizer)
- ✅ **CRIADO**: Package npm separado `@strudel-studio/visualizer`
- ✅ Estrutura completa: parser + lexer + interpreter + hook + componente React
- ✅ TypeScript build configurado com tsup (CJS + ESM + types)
- ✅ README completo com exemplos e API documentation
- ✅ Package pronto para publicação no npm
- ✅ .gitignore atualizado para excluir builds
- ✅ Exports: StrudelVisualizer component + useStrudelVisualizer hook + parser utilities
- ✅ Zero dependencies (apenas peerDeps: React 18+)
- ✅ Build bem-sucedido: dist/ gerado com index.js, index.mjs, index.d.ts

### 2025-10-24 (Tarde - Sessão 3: Correções Críticas)
- ✅ **CORRIGIDO**: Silêncios (`~ ~ ~ ~`) agora não geram barras no visualizador
- ✅ **ADICIONADO**: Suporte para `!` (hold/repeat) - exemplo: `bd:5!2`
- ✅ **ADICIONADO**: Suporte para `.cpm()` modifier
- ✅ Parser refatorado: `s('...')` agora faz mini-notation parsing completo
- ✅ TypeScript compilation: 0 errors

### 2025-10-24 (Tarde - Sessão 2)
- ✅ **IMPLEMENTADO**: Visualizador Inteligente de Código Strudel
- ✅ Criado sistema completo de Lexer → Parser → Interpreter → Visualizer
- ✅ Suporte para todas estruturas de prioridade alta e média
- ✅ TypeScript compilation: 0 errors

### 2025-10-23
- ✅ TODO.md criado
- ✅ CLAUDE.md criado
- ✅ Projeto inicializado

---

**Estimativa Total Restante**: 15-25 horas
**Complexidade Restante**: 🟡 Média
**Projeto já está PRODUCTION-READY**: ✅ Sim

---

**Para mais detalhes, ver:**
- `ANALYSIS.md` - Análise completa e breakdown
- `CLAUDE.md` - Regras de código
- `README.md` - Como usar o projeto
