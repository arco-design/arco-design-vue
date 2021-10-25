# API documentation generation instructions

## About the parser

Documents are divided into two types: component and interface

This is done by two parsers:
- Components> vue-docgen-api
- interface > parseInterface
  - Use ts-morph to generate ast and convert it to the same structure as vue-docgen-api

## Type annotation

### Component

|Tag name|Description|
|-|-|
|displayName|Component name|
|noBrackets|Don't wrap angle brackets|

### Component Props

|Tag name|Description|
|-|-|
|values|enumerate|
|defaultValue|Default value|
|type|Type|
|vModel|v-model, replace the original model, because it will change the name to `v-model`|

Nothing else is special, just look at the document
[vue-docgen-api](https://vue-styleguidist.github.io/docs/Documenting.html#code-comments)

### Interface
|Tag name|Description|
|-|-|
|defaultValue|Default value|
Other look [JSDoc tags](https://jsdoc.app/)

