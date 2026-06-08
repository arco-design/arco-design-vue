---
name: context-budget
description: Keep skills compact while preserving high-value behavior
metadata:
  tags: context, tokens, compression, relevance
---

# Context budget optimization

## Compression priorities

Keep:

- trigger lists
- decision tables
- short checklists
- one integrated example per high-value scenario

Trim:

- repeated background explanations
- duplicate examples with the same lesson
- low-signal prose that does not change behavior

## Layering strategy

- `SKILL.md`: high-signal overview, activation cues, links
- `rules/*.md`: deeper procedures and examples

Only promote details to `SKILL.md` when repeated eval failures show they are being missed.

## Budget checks

Before shipping a skill update, ask:

1. Which added lines are behavior-critical?
2. Could this section be expressed as a checklist/table?
3. Does each example teach a unique failure mode?

## Safe simplifications

- Convert paragraphs to bullet checklists
- Merge similar examples and annotate variants
- Move deep rationale into one explanation section and cross-link to it
