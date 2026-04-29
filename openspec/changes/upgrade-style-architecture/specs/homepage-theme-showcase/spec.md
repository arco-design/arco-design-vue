## ADDED Requirements

### Requirement: Homepage SHALL provide a theme switch showcase module

The documentation homepage SHALL provide a theme showcase module with multiple preset themes and live preview switching behavior.

#### Scenario: Switch to preset theme

- **WHEN** user selects a preset theme in homepage showcase
- **THEN** preview module updates to selected theme style immediately

### Requirement: Showcase presets MUST reuse runtime theme object contract

The system MUST define homepage preset themes using the same ConfigProvider runtime theme object contract used by the editor and library APIs.

#### Scenario: Apply homepage preset through ConfigProvider

- **WHEN** showcase applies a preset theme
- **THEN** preset object can be directly passed to ConfigProvider without transformation outside contract rules

### Requirement: Showcase SHALL include representative preset set

The homepage showcase SHALL include at least a default preset and additional contrasting presets to demonstrate theming range.

#### Scenario: Display preset options

- **WHEN** homepage showcase is rendered
- **THEN** user can see and select default plus multiple contrasting preset themes
