## ADDED Requirements

### Requirement: Generated demos SHALL use modern Vue SFC conventions

The system SHALL emit generated component demo files as Vue single-file components that use script setup lang="ts" whenever script logic is required.

#### Scenario: A generated demo contains script logic

- **WHEN** a generated demo needs reactive state, event handlers, computed values, watchers, or helper functions
- **THEN** the output file uses a script setup lang="ts" block instead of a legacy Options API or plain script block

#### Scenario: A generated demo has no script logic

- **WHEN** a generated demo only needs template markup
- **THEN** the output file remains a template-only Vue SFC and does not add an empty legacy script block

### Requirement: Generated demo presentation styles MUST use Tailwind utilities

The system MUST express generated demo presentation styles with the sd-vue-docs Tailwind utility conventions instead of SFC style blocks.

#### Scenario: A generated demo currently uses a style block

- **WHEN** a generated demo includes local style or scoped style definitions for spacing, layout, border, color, sizing, or typography
- **THEN** those presentation rules are migrated into Tailwind utility classes and the generated file no longer contains a style tag

#### Scenario: A generated demo currently uses simple inline presentation styles

- **WHEN** a generated demo uses inline style attributes only for static or display-oriented styling
- **THEN** those styles are replaced with Tailwind utility classes in the generated template

### Requirement: Generated demos SHALL remain renderable in both docs preview environments

The system SHALL provide the Tailwind utility stylesheet support required for generated demos to render consistently in both the component page preview and the interactive example editor preview.

#### Scenario: A component page renders a generated demo

- **WHEN** a generated demo uses approved Tailwind utility classes
- **THEN** the in-page docs preview renders those utilities correctly during local development and site build output

#### Scenario: A reader opens the interactive editor for a generated demo

- **WHEN** the editor loads the normalized generated source
- **THEN** the REPL preview also has access to the Tailwind utility styles needed for that demo to render as intended
