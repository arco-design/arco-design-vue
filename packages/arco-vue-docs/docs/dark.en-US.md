```yaml
meta:
  type: Developer Guide
title: Dark mode
description: The dark theme is built in the component library, and you can easily switch to dark.
```

*Auto translate by google.*

## Switch to dark mode

The component library uses the arco-theme attribute on the body tag to indicate the current theme, so you only need to modify this attribute to complete the theme switch.

```ts
// Set as dark theme
document.body.setAttribute('arco-theme', 'dark')

// Restore light theme
document.body.removeAttribute('arco-theme');
```

## Principle and built-in colors

Refer to [Dark Mode](https://arco.design/react/docs/palette) and [Color](https://arco.design/react/docs/palette)
