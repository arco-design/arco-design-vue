---
name: benchmark-loop
description: Repeatable process for benchmarking skill behavior across models
metadata:
  tags: benchmark, evals, metrics, deltas, models
---

# Benchmark loop

## Minimum matrix

For each scenario, evaluate:

- Model A/B/C
- Without skill
- With skill

Capture:

- overall score
- per-scenario score
- per-criterion pass/fail
- delta (`with - without`)

## Required scenarios

- One scenario per core capability the skill claims to teach
- One scenario that stresses omission-prone footers/checklists
- One scenario with noisy context to test retrieval under pressure

## Readout structure

Use this format:

```md
| Model | Without | With | Delta |
| ----- | ------- | ---- | ----- |
| ...   | ...     | ...  | ...   |

Universal failures (0% with skill): ... Regressions (negative deltas): ...
```

## Interpretation

- **High baseline + tiny delta**: model already knows it; reduce verbosity or specialize edge-cases
- **Low baseline + high delta**: skill adds strong value; preserve and refine
- **Low baseline + low skill-on**: skill content is weak or unclear
- **Negative delta**: skill introduces confusion; patch immediately
