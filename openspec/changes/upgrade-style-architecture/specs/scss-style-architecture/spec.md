## ADDED Requirements

### Requirement: Component style sources SHALL be migrated from Less to Scss

The system SHALL replace Less source files with Scss source files for theming-related component styles while preserving existing public component APIs.

#### Scenario: Build with migrated Scss source

- **WHEN** style build runs after migration
- **THEN** style artifacts are generated from Scss sources and public component API remains unchanged

### Requirement: Build pipeline MUST support Scss-based style generation

The system MUST provide style build tasks and dependency configuration to compile Scss sources into distributable style artifacts.

#### Scenario: Execute style build task

- **WHEN** maintainer runs style build command
- **THEN** build pipeline compiles Scss inputs successfully and outputs expected style artifacts

### Requirement: Migration SHALL provide temporary compatibility mapping

The system SHALL provide a temporary compatibility mapping from legacy Less token names to the new token model during the migration window.

#### Scenario: Resolve legacy token reference during migration

- **WHEN** a migrated style path still references a legacy token alias
- **THEN** compatibility mapping resolves to the corresponding new token value
