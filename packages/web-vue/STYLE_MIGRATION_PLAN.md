# Component Style Migration Plan (Less -> Scss)

## Batch Strategy

### Batch A: Foundation Components

- button
- icon
- typography
- space
- divider
- tag
- badge

### Batch B: Data Input Components

- input
- input-number
- textarea
- select
- cascader
- tree-select
- date-picker
- time-picker
- checkbox
- radio
- switch
- slider
- rate

### Batch C: Feedback and Overlay Components

- tooltip
- popover
- popconfirm
- modal
- drawer
- message
- notification
- spin
- skeleton

### Batch D: Data Display and Navigation Components

- table
- pagination
- tabs
- menu
- breadcrumb
- descriptions
- timeline
- steps
- tree
- transfer

## Acceptance Checklist (Per Batch)

- Keep component public API unchanged.
- Keep style entry path stable (`style/index.ts`).
- Keep `less` output during transition and add `scss` source.
- Replace theme-sensitive values with CSS variables when possible.
- Add fallback values for critical tokens (`var(--token, fallback)`).
- Validate component-level override priority: global token < component token.
- Run style build and ensure generated css.js imports are valid.
- Run component snapshots and visual regression checks for batch members.

## Exit Criteria

- All batch members migrated to `index.scss`.
- Legacy Less compatibility aliases reduced to zero active usage.
- Style build artifacts include stable css outputs for all components.
