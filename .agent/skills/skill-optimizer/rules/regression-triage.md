---
name: regression-triage
description: Diagnose and correct cases where skills reduce model performance
metadata:
  tags: regressions, triage, diagnostics, fixes
---

# Regression triage

## Detect

Flag any criterion/scenario where `with skill < without skill`. Prioritize regressions on high-frequency tasks and strict-format outputs.

## Classify

Common causes:

- ambiguous instruction collisions
- optional language around mandatory behavior
- over-broad rule that suppresses needed detail
- examples that imply the wrong default

## Fix sequence

1. isolate the exact criterion/regression scenario
2. locate instruction lines likely causing confusion
3. rewrite with explicit must/should boundaries
4. add a small positive+negative example pair
5. rerun the same scenario before broad reruns

## Example fix pattern

Before:

- "Include references when relevant"

After:

- "If task requests a `Refs:` footer, include `Refs: <url>` exactly and do not omit it."

## Exit criteria

- regression removed on affected models
- no new regressions in adjacent scenarios
- issue updated with root cause + diff summary
