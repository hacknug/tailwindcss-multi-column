# Tailwind CSS Multi-Column Plugin

This plugin adds utilities to use all multi-column properties with Tailwind CSS.

## Installation

Add this plugin to your project:

```bash
# Install using pnpm
pnpm install --save-dev tailwindcss-multi-column

# Install using npm
npm install --save-dev tailwindcss-multi-column

# Install using yarn
yarn add -D tailwindcss-multi-column
```

## Usage

By default the plugin uses the `borderColors` and `borderWidths` properties from the config file to generate the rules classes. You can change that to whatever, just keep in mind if you have a `default` key in both objects, `.column-rule` will set both the `column-rule-color` and `column-rule-width` of the element.

```js
require('tailwindcss-multi-column')({
  counts: [1, 2],
  gaps: {
    'sm': '1rem',
    'md': '1.5rem',
    'lg': '2rem',
  },
  widths: {
    'sm': '120px',
    'md': '240px',
    'lg': '360px',
  },
  rules: {
    colors: {
      'red': 'red',
      'lime': 'lime',
      'blue': 'blue',
    },
    widths: {
      default: '1px',
      'sm': '2px',
      'md': '3px',
    },
  },
  variants: [],
}),
```

```css
.col-count-1 { column-count: 1; }
.col-count-2 { column-count: 2; }
.col-count-3 { column-count: 3; }

.col-gap-sm { column-gap: 1rem; }
.col-gap-md { column-gap: 1.5rem; }
.col-gap-lg { column-gap: 2rem; }

.col-w-sm { column-width: 120px; }
.col-w-md { column-width: 240px; }
.col-w-lg { column-width: 360px; }

.col-rule-red { column-rule-color: red; }
.col-rule-lime { column-rule-color: lime; }
.col-rule-blue { column-rule-color: blue; }

.col-rule { column-rule-width: 1px; }
.col-rule-sm { column-rule-width: 2px; }
.col-rule-md { column-rule-width: 3px; }

.col-rule-none { column-rule-style: none; }
.col-rule-hidden { column-rule-style: hidden; }
.col-rule-dotted { column-rule-style: dotted; }
.col-rule-dashed { column-rule-style: dashed; }
.col-rule-solid { column-rule-style: solid; }
.col-rule-double { column-rule-style: double; }
.col-rule-groove { column-rule-style: groove; }
.col-rule-ridge { column-rule-style: ridge; }
.col-rule-inset { column-rule-style: inset; }
.col-rule-outset { column-rule-style: outset; }

.col-auto { column-fill: auto; }
.col-balance { column-fill: balance; }
.col-balance-all { column-fill: balance-all; }

.col-none { column-span: none; }
.col-all { column-span: all; }
```

## Credits

This plugin was inspired by [@LoganDark](https://github.com/LoganDark) and [@codytooker](https://github.com/codytooker) discussion here: https://github.com/tailwindcss/tailwindcss/issues/540
