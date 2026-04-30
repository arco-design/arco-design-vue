## ADDED Requirements

### Requirement: Theme docs demos SHALL share one runtime theme contract

The `ConfigProvider` local-theme demo, home preview switcher, and theme editor MUST consume the same runtime theme contract structure so that one payload produces equivalent visual behavior.

#### Scenario: Same preset payload renders consistently

- **WHEN** the same preset payload (mode + theme object) is applied in all three docs entry points
- **THEN** core visual tokens (primary color, surface background, text contrast) SHALL be consistent across the three views

### Requirement: Theme editor JSON import/export SHALL be schema-safe

Theme editor JSON import/export MUST validate schema version and payload shape before applying changes to runtime previews.

#### Scenario: Valid payload applies and exports

- **WHEN** user imports a JSON payload with supported `schemaVersion` and valid `tokens`/`components`
- **THEN** the editor SHALL apply the payload to preview components and SHALL export a JSON payload preserving supported fields

#### Scenario: Invalid payload is rejected with fallback

- **WHEN** user imports a JSON payload with unsupported `schemaVersion` or invalid token value types
- **THEN** the editor MUST reject the payload, surface validation feedback, and keep the last valid preview state

### Requirement: ConfigProvider local-theme documentation SHALL describe behavior boundaries

The documentation page MUST clearly describe when to use `ConfigProvider(theme-mode)` versus dedicated `ThemeProvider`, including subtree scope behavior and limitations.

#### Scenario: Reader can distinguish usage boundaries

- **WHEN** reader checks the ConfigProvider local theme section and FAQ
- **THEN** documentation SHALL explicitly state subtree scope behavior and recommended usage differences from global body-level theme switching
