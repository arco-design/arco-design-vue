---
name: release-gates
description: Go/no-go checks for shipping skill updates safely
metadata:
  tags: release, quality-gates, governance, process
---

# Release gates for skill changes

## Required pass conditions

- No universal 0% criteria with skill enabled
- No negative delta on critical scenarios
- Benchmark run recorded with date, matrix, and deltas
- Follow-up issues opened for unresolved failures/regressions

## Soft pass conditions

- At least one measurable gain on a target weak model
- No significant context-size increase without measured benefit

## PR checklist

- [ ] Updated `SKILL.md` links for any new/renamed rule file
- [ ] Added/updated benchmark run log entry
- [ ] Included validation command outputs (`test`, `typecheck`, `lint`)
- [ ] Linked tracking issues and remediation notes

## Post-merge loop

- schedule rerun after next model update
- compare against prior run history
- prune stale guidance that no longer moves metrics
