---
name: activation-design
description: Patterns that increase skill activation and instruction uptake
metadata:
  tags: activation, salience, retrieval, instruction-design
---

# Activation design

## Make triggers explicit

List concrete user/task signals near the top of the skill:

- domain nouns (e.g. CSV, OAuth callback, Fastify plugin)
- failure cues (timeouts, backpressure, flaky tests)
- output shape cues (commit footer, schema, endpoint)

## Front-load non-negotiables

If behavior is frequently missed, move it into a numbered top-level checklist. Use imperative wording:

- "Use `pipeline(...)`"
- "Include `Refs:` when requested"
- "Do not omit ..."

## Use integrated examples

Add examples that combine multiple rules likely needed together in real tasks. A good integrated example:

- starts from realistic input
- includes critical decision points
- shows final output format

## Avoid ambiguous wording

Replace fuzzy phrasing:

- "consider using"
- "you may want"

With strict phrasing when correctness matters:

- "use"
- "must include"
- "do not omit"

## Activation anti-patterns

- burying critical rules deep in long files
- splitting one core behavior across too many documents
- examples that are toy-only and do not reflect real prompts
