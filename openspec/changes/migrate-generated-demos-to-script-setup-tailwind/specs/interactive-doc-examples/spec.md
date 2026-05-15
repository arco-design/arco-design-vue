## MODIFIED Requirements

### Requirement: Demo source fidelity MUST be preserved

The system MUST preserve each demo's title, Chinese description, and runtime behavior during migration while allowing the generated Vue source shown in docs to be normalized to the current example conventions.

#### Scenario: Demo metadata is migrated

- **WHEN** the migration pipeline converts a legacy demo into packages/sd-vue-docs/src/components/generated
- **THEN** it stores the demo title, description, and a generated Vue source file that preserves the original example behavior while normalizing the code to the approved script and styling conventions

#### Scenario: Demo source is shown to the reader

- **WHEN** a reader opens an interactive example block
- **THEN** the editor content matches the normalized generated source from the docs package rather than an outdated pre-normalization script/style structure

#### Scenario: A normalized generated demo is previewed

- **WHEN** the interactive example block renders a generated demo that now uses script setup lang="ts" and Tailwind utility classes
- **THEN** the live preview preserves the intended demo behavior and visual presentation without requiring the reader to manually patch the source
