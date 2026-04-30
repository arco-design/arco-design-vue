## ADDED Requirements

### Requirement: ConfigProvider SHALL provide subtree-scoped theme container

When `ConfigProvider` receives local `theme` data or `theme-mode`, it MUST create a subtree-scoped theme container so that CSS variables are resolved from that subtree instead of global `body` only.

#### Scenario: Local mode enables scoped container

- **WHEN** a `ConfigProvider` is rendered with `theme-mode="dark"`
- **THEN** components inside the provider SHALL resolve theme variables from a local container bound to that provider subtree

#### Scenario: No local theme input keeps inherited scope

- **WHEN** a `ConfigProvider` is rendered without local `theme` and without `theme-mode`
- **THEN** it SHALL inherit the parent/global theme scope and MUST NOT create an unnecessary isolated container

### Requirement: Subtree theme inheritance SHALL be deterministic

A nested provider MUST inherit unresolved tokens from its parent provider and MUST apply only its own overrides in the nested subtree.

#### Scenario: Child provider overrides subset of tokens

- **WHEN** parent provider defines a base theme and child provider overrides `primary6` only
- **THEN** child subtree SHALL use overridden `primary6` and inherit all other unresolved tokens from parent

#### Scenario: Child provider unmount does not mutate parent

- **WHEN** a nested provider is unmounted after applying local overrides
- **THEN** parent subtree SHALL keep its original theme values without mutation

### Requirement: Theme mode transitions SHALL update subtree safely

Changing `theme-mode` or local `theme` at runtime MUST update the same subtree scope without cross-scope leakage.

#### Scenario: Runtime mode switch remains scoped

- **WHEN** user toggles `theme-mode` from `light` to `dark` in one provider
- **THEN** only that provider subtree SHALL reflect the mode change and sibling/global scopes SHALL remain unchanged

#### Scenario: Rapid theme updates stay consistent

- **WHEN** multiple local theme updates happen in quick succession
- **THEN** final rendered variables in the subtree SHALL match the latest update with no stale intermediate state
