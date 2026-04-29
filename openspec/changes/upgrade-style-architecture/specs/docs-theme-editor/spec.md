## ADDED Requirements

### Requirement: Documentation site SHALL provide a theme editor page

The documentation site SHALL provide a dedicated theme editor page where users can adjust theme parameters and preview results in real time.

#### Scenario: Open theme editor page

- **WHEN** user navigates to the theme editor route
- **THEN** page renders editable theme controls and a live preview area

### Requirement: Theme editor MUST support import and export of JSON themes

The theme editor MUST allow users to upload a theme JSON file and download the current theme as JSON using a versioned schema.

#### Scenario: Import valid theme JSON

- **WHEN** user uploads a valid theme JSON file
- **THEN** editor loads theme values and updates preview accordingly

### Requirement: Theme editor SHALL validate theme schema compatibility

The theme editor SHALL validate uploaded JSON against the supported schema version and provide actionable feedback for incompatible payloads.

#### Scenario: Upload incompatible schema version

- **WHEN** user uploads theme JSON with unsupported schema version
- **THEN** editor rejects the payload and displays compatibility guidance
