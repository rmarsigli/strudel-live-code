# Guia de Análise da API Strudel

## 📊 Visão Geral

- **Arquivo**: `API.md`
- **Linhas**: 7,324
- **Funções**: 599
- **Objetivo**: Mapear 100% da API para visualizações precisas

## 🎯 Metodologia de Análise

### 1. Dividir em Partes Gerenciáveis

A API será analisada em **4 partes alfabéticas**:

| Parte | Letras | Funções (~) | Linhas | Tempo Est. |
|-------|--------|-------------|--------|------------|
| 1 | A-E | 150 | 1-1500 | 1.5h |
| 2 | F-N | 150 | 1501-3500 | 1.5h |
| 3 | O-S | 150 | 3501-5500 | 1.5h |
| 4 | T-Z | 149 | 5501-7324 | 1.5h |

### 2. Categorizar Cada Função

Para cada função encontrada, determinar:

#### 🔴 TIMING (CRÍTICO)
**Pergunta**: Esta função afeta QUANDO os eventos acontecem?

Exemplos:
- ✅ `fast(2)` - multiplica velocidade
- ✅ `every(4, ...)` - condicional temporal
- ✅ `stut(3, ...)` - repetições com delay

#### 🟡 AUDIO (ALTO)
**Pergunta**: Esta função afeta VOLUME ou FREQUÊNCIAS?

Exemplos:
- ✅ `gain(0.5)` - volume
- ✅ `lpf(1000)` - filtro low-pass
- ✅ `crush(4)` - bitcrusher

#### 🟢 VISUAL (MÉDIO)
**Pergunta**: Esta função afeta apenas aparência visual?

Exemplos:
- ✅ `color()` - cor
- ✅ `pshift()` - pitch shift visual
- ✅ `sometimes()` - probabilidade (pode afetar opacity)

#### ⚪ IGNORE (BAIXO)
**Pergunta**: Esta função NÃO tem impacto em áudio/visual?

Exemplos:
- ✅ `absoluteOrientationX` - sensor de dispositivo
- ✅ `evaluate()` - execução de código
- ✅ `ccn()` - MIDI control

### 3. Documentar Impacto Visual

Para cada função **TIMING** ou **AUDIO**, especificar:

```markdown
### fast(n)
- **Categoria**: TIMING 🔴
- **Prioridade**: CRÍTICA
- **Impacto**: Multiplica frequência de eventos por n
- **Implementação**: `duration = baseDuration / n`
- **Exemplo**: `s('bd').fast(2)` → toca 2x mais rápido
- **Visualizer**: Eventos aparecem 2x mais frequentemente
```

### 4. Criar Tabela Mestre

Consolidar todas as funções em uma tabela:

| Função | Cat. | Prio. | Impacto | Status |
|--------|------|-------|---------|--------|
| fast | 🔴 | CRIT | duration/n | ✅ Implementado |
| lpf | 🟡 | ALTA | Reduz freq>n | ⏳ Pendente |
| color | 🟢 | MED | Cor | ❌ Ignorado |

## 🔧 Processo de Análise

### Passo a Passo

1. **Abrir API.md** no intervalo de linhas
2. **Ler cada função** (`### nomeFuncao`)
3. **Ler descrição e exemplos**
4. **Categorizar** (TIMING/AUDIO/VISUAL/IGNORE)
5. **Anotar** impacto visual
6. **Marcar** prioridade (CRÍTICA/ALTA/MÉDIA/BAIXA)
7. **Adicionar** à tabela

### Ferramentas

```bash
# Ver função específica
grep -A 20 "### fast" API.md

# Contar funções por letra
grep "^### [A-E]" API.md | wc -l

# Extrair apenas nomes
grep "^### " API.md | sed 's/### //' > functions.txt
```

## 📝 Output Esperado

### docs/api-analysis-1.md (A-E)
```markdown
# Análise API: A-E

## Estatísticas
- Total: 150 funções
- TIMING: 15 (10%)
- AUDIO: 35 (23%)
- VISUAL: 20 (13%)
- IGNORE: 80 (54%)

## Top 10 Críticas
1. accelerate - AUDIO - Afeta pitch
2. add - TIMING - Aritmética de patterns
3. amp - AUDIO - Volume
...

## Tabela Completa
| Função | Cat | Prio | Impacto | Notas |
|--------|-----|------|---------|-------|
| accelerate | 🟡 | ALTA | Modula freq | ... |
```

## 🎯 Critérios de Sucesso

### Análise Completa
- [ ] Todas as 599 funções categorizadas
- [ ] Top 50 funções TIMING documentadas
- [ ] Top 50 funções AUDIO documentadas
- [ ] Tabela mestre consolidada

### Implementação Pronta
- [ ] Lista de funções CRÍTICAS para implementar primeiro
- [ ] Mapeamento função → código (pseudocódigo)
- [ ] Casos de teste para cada função
- [ ] Priorização clara

## 🚀 Próximos Passos Após Análise

1. **Implementar TIMING** (funções críticas)
   - Parser: reconhecer sintaxe
   - Interpreter: calcular timings
   - Testes: validar precisão

2. **Implementar AUDIO** (funções altas)
   - Frequency mapper: aplicar filtros
   - Dynamics: calcular amplitudes
   - Testes: verificar ranges

3. **Otimizar** (DRY)
   - Refatorar duplicação
   - Criar helpers
   - Memoizar parsing

## 📚 Referências

- **API.md**: Fonte primária de verdade
- **CLAUDE.md**: Regras de código
- **TODO.md**: Roadmap completo
- **Strudel Docs**: https://strudel.cc/learn

---

**Versão**: 1.0.0
**Data**: 2025-10-24
**Status**: Pronto para análise
