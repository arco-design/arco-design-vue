## ADDED Requirements

### Requirement: ConfigProvider SHALL accept a unified runtime theme object

The system SHALL allow applications to pass a single `theme` object through ConfigProvider, and SHALL normalize this object into a stable runtime token structure that can be consumed by components.

#### Scenario: Pass unified theme object

- **WHEN** application passes a valid `theme` object to ConfigProvider
- **THEN** ConfigProvider normalizes the input and exposes a runtime token map for descendants

### Requirement: Theme updates MUST be applied at runtime without recompilation

The system MUST apply theme updates through runtime token propagation and MUST NOT require Less variable recompilation or style rebuild to take effect.

#### Scenario: Update theme dynamically

- **WHEN** application updates ConfigProvider `theme` object at runtime
- **THEN** rendered components reflect the new theme values without rebuilding styles

### Requirement: Theme object SHALL support component-level override blocks

The system SHALL support optional component-level token overrides in the same theme object while preserving global token fallback behavior.

#### Scenario: Override one component token

- **WHEN** application provides global tokens and a component-specific override token
- **THEN** target component uses override token and other components continue using global tokens
