```yaml
meta:
  type: Developer Guide
title: Dark mode
description: The dark theme is built in the component library, and you can easily switch to dark.
```

*Auto translate by google.*

## Switch to dark mode

The component library uses the arco-theme attribute on the body tag to indicate the current theme, so you only need to modify this attribute to complete the theme switch.

Note: By setting arco-theme as dark, you only switch the component library to dark mode. You also need to use some CSS variables to adjust the overall page style to dark.

```ts
// Set as dark theme
document.body.setAttribute('arco-theme', 'dark')

// Restore light theme
document.body.removeAttribute('arco-theme');
```

Automatically switch following the system theme

```ts
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

darkThemeMq.addListener(e => {
 if (e.matches) {
   document.body.setAttribute('arco-theme', 'dark');
 } else {
    document.body.removeAttribute('arco-theme');
  }
});
```

Adjust background and font

```css
body {
  background-color: var(--color-bg-1);
  color: var(--color-text-1);
}
```

## Theory

ArcoDesign uses [CSS variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*) to build the dark theme. There are two sets of color palettes built into the component, one set is the default bright color palette and the other is the dark one generated from the bright color palette. If you're interested in the current color palette, you can view more here: [ArcoDesign Color](/vue/docs/palette).

Less variables and CSS variables co-exist in ArcoDesign and the color algorithm for bright and dark colors is built-in, which can change the color palette more flexibly.

For example, if you want to change the dominant color, you only need to change the value of @arcoblue-6. The algorithm will automatically generate colors from 1 to 10 for you, and will also automatically generate the inverted colors from 1 to 10 in dark colors, which is very convenient.
