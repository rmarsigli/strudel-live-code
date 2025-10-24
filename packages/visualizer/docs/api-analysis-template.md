# API Analysis Template

Use este template para cada parte da análise (1, 2, 3, 4).

## Categorias

- **TIMING** 🔴: Afeta QUANDO as barras aparecem
- **AUDIO** 🟡: Afeta ALTURA e INTENSIDADE das barras
- **VISUAL** 🟢: Afeta APARÊNCIA mas não timing/volume
- **IGNORE** ⚪: Não afeta visualizer de áudio

## Tabela de Análise

| Função | Categoria | Impacto Visual | Prioridade | Implementação | Notas |
|--------|-----------|----------------|------------|---------------|-------|
| `fast(n)` | TIMING 🔴 | Multiplica eventos por n | CRÍTICA | `duration / n` | Acelera pattern |
| `gain(n)` | AUDIO 🟡 | Altura das barras * n | ALTA | `amplitude * n` | Volume |
| `color()` | VISUAL 🟢 | Cor das barras | BAIXA | Ignorar | Apenas visual |
| `absOriX` | IGNORE ⚪ | Nenhum | IGNORAR | - | Sensor orientation |

## Top 20 Funções Críticas

Liste as 20 funções mais importantes para o visualizer desta seção:

1. `fast()` - TIMING - Multiplicador de velocidade
2. `slow()` - TIMING - Divisor de velocidade
3. ...

## Descobertas Importantes

- Padrão encontrado: funções `*cat` são sempre TIMING
- Funções de filtro (lpf, hpf) são AUDIO
- Sensors (orientation, accel) são sempre IGNORE

## Próximos Passos

- [ ] Implementar top 10 funções TIMING
- [ ] Mapear ranges de frequência para AUDIO
- [ ] Criar testes

## Estatísticas

- Total de funções analisadas: X
- TIMING: X funções
- AUDIO: X funções
- VISUAL: X funções
- IGNORE: X funções
