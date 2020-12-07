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

By default the plugin uses the `borderColor` and `borderWidth` properties from your theme to generate the `columnRuleColor` and `columnRuleWidth` classes. You can change that to whatever, just keep in mind if you have a `default` key in both objects (also `columnRuleStyle`), `.column-rule` will set both the `column-rule-color` and `column-rule-width` of the element.

This means you won't be able to use `@apply` with those classes. Let me know if that's an issue for you and we can sort it out.

```js
// tailwind.config.js
{
  theme: { // defaults to these values
    columnCount: [ 1, 2, 3 ],
    columnGap: { // will fallback to 'gap' || 'gridGap' values
      // sm: '1rem',
      // md: '1.5rem',
      // lg: '2rem',
    },
    columnWidth: {
      // sm: '120px',
      // md: '240px',
      // lg: '360px',
    },
    columnRuleColor: false, // will fallback to `borderColor` values
    columnRuleWidth: false, // will fallback to `borderWidth` values
    columnRuleStyle: [
      'none', 'hidden', 'dotted', 'dashed', 'solid',
      'double', 'groove', 'ridge', 'inset', 'outset',
    ],
    columnFill: [ 'auto', 'balance', 'balance-all' ],
    columnSpan: [ 'none', 'all' ],
  },

  variants: { // all the following default to ['responsive']
    columnCount: ['responsive'],
    columnGap: ['responsive'],
    columnWidth: ['responsive'],
    columnRuleColor: ['responsive'],
    columnRuleWidth: ['responsive'],
    columnRuleStyle: ['responsive'],
    columnFill: ['responsive'],
    columnSpan: ['responsive'],
  },

  plugins: [
    require('tailwindcss-multi-column')(), // no options to configure
  ],
}
```

```css
.column-count-1 { column-count: 1; }
.column-count-2 { column-count: 2; }
.column-count-3 { column-count: 3; }

.column-gap-sm { column-gap: 1rem; }
.column-gap-md { column-gap: 1.5rem; }
.column-gap-lg { column-gap: 2rem; }

.column-w-sm { column-width: 120px; }
.column-w-md { column-width: 240px; }
.column-w-lg { column-width: 360px; }

.column-rule-red { column-rule-color: red; }
.column-rule-lime { column-rule-color: lime; }
.column-rule-blue { column-rule-color: blue; }

.column-rule { column-rule-width: 1px; }
.column-rule-sm { column-rule-width: 2px; }
.column-rule-md { column-rule-width: 4px; }

.column-rule-none { column-rule-style: none; }
.column-rule-hidden { column-rule-style: hidden; }
.column-rule-dotted { column-rule-style: dotted; }
.column-rule-dashed { column-rule-style: dashed; }
.column-rule-solid { column-rule-style: solid; }
.column-rule-double { column-rule-style: double; }
.column-rule-groove { column-rule-style: groove; }
.column-rule-ridge { column-rule-style: ridge; }
.column-rule-inset { column-rule-style: inset; }
.column-rule-outset { column-rule-style: outset; }

.column-fill-auto { column-fill: auto; }
.column-fill-balance { column-fill: balance; }
.column-fill-balance-all { column-fill: balance-all; }

.column-span-none { column-span: none; }
.column-span-all { column-span: all; }
```

## Credits

This plugin was inspired by [@LoganDark](https://github.com/LoganDark) and [@codytooker](https://github.com/codytooker) discussion here: https://github.com/tailwindcss/tailwindcss/issues/540
