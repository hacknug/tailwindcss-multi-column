const _ = require('lodash')

const plugin = require('./index.js')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

// const defaultConfig = require('tailwindcss/defaultConfig')
const generatePluginCss = (testConfig = {}, pluginOptions = {}) => {
  const sandboxConfig = {
    theme: {
      screens: { 'sm': '640px' },
      columnGap: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
      columnWidth: {
        sm: '120px',
        md: '240px',
        lg: '360px',
      },
      columnRuleColor: { 'tailwind': '#38b2ac' },
      columnRuleWidth: {
        default: '1px',
        sm: '2px',
        md: '4px',
        lg: '8px',
      },
    },
    corePlugins: false,
    plugins: [ plugin(pluginOptions) ],
  }
  const postcssPlugins =[
    tailwindcss(_.merge(sandboxConfig, testConfig)),
  ]

  return postcss(postcssPlugins)
    .process('@tailwind utilities', { from: undefined })
    .then(result => result.css)
}

expect.extend({ toMatchCss: require('jest-matcher-css') })

test('generates default utilities and responsive variants', () => {
  const testConfig = {}
  const expectedCss = `
    .col-count-1 { column-count: 1 }
    .col-count-2 { column-count: 2 }
    .col-count-3 { column-count: 3 }

    .col-gap-sm { column-gap: 1rem }
    .col-gap-md { column-gap: 1.5rem }
    .col-gap-lg { column-gap: 2rem }

    .col-w-sm { column-width: 120px }
    .col-w-md { column-width: 240px }
    .col-w-lg { column-width: 360px }

    .col-rule-tailwind { column-rule-color: #38b2ac }

    .col-rule { column-rule-width: 1px }
    .col-rule-sm { column-rule-width: 2px }
    .col-rule-md { column-rule-width: 4px }
    .col-rule-lg { column-rule-width: 8px }

    .col-rule-none { column-rule-style: none }
    .col-rule-hidden { column-rule-style: hidden }
    .col-rule-dotted { column-rule-style: dotted }
    .col-rule-dashed { column-rule-style: dashed }
    .col-rule-solid { column-rule-style: solid }
    .col-rule-double { column-rule-style: double }
    .col-rule-groove { column-rule-style: groove }
    .col-rule-ridge { column-rule-style: ridge }
    .col-rule-inset { column-rule-style: inset }
    .col-rule-outset { column-rule-style: outset }

    .col-fill-auto { column-fill: auto }
    .col-fill-balance { column-fill: balance }
    .col-fill-balance-all { column-fill: balance-all }

    .col-span-none { column-span: none }
    .col-span-all { column-span: all }

    @media (min-width: 640px) {
      .sm\\:col-count-1 { column-count: 1 }
      .sm\\:col-count-2 { column-count: 2 }
      .sm\\:col-count-3 { column-count: 3 }

      .sm\\:col-gap-sm { column-gap: 1rem }
      .sm\\:col-gap-md { column-gap: 1.5rem }
      .sm\\:col-gap-lg { column-gap: 2rem }

      .sm\\:col-w-sm { column-width: 120px }
      .sm\\:col-w-md { column-width: 240px }
      .sm\\:col-w-lg { column-width: 360px }

      .sm\\:col-rule-tailwind { column-rule-color: #38b2ac }

      .sm\\:col-rule { column-rule-width: 1px }
      .sm\\:col-rule-sm { column-rule-width: 2px }
      .sm\\:col-rule-md { column-rule-width: 4px }
      .sm\\:col-rule-lg { column-rule-width: 8px }

      .sm\\:col-rule-none { column-rule-style: none }
      .sm\\:col-rule-hidden { column-rule-style: hidden }
      .sm\\:col-rule-dotted { column-rule-style: dotted }
      .sm\\:col-rule-dashed { column-rule-style: dashed }
      .sm\\:col-rule-solid { column-rule-style: solid }
      .sm\\:col-rule-double { column-rule-style: double }
      .sm\\:col-rule-groove { column-rule-style: groove }
      .sm\\:col-rule-ridge { column-rule-style: ridge }
      .sm\\:col-rule-inset { column-rule-style: inset }
      .sm\\:col-rule-outset { column-rule-style: outset }

      .sm\\:col-fill-auto { column-fill: auto }
      .sm\\:col-fill-balance { column-fill: balance }
      .sm\\:col-fill-balance-all { column-fill: balance-all }

      .sm\\:col-span-none { column-span: none }
      .sm\\:col-span-all { column-span: all }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('variants can be customized', () => {
  const testConfig = {
    variants: {
      columnGap: [ 'hover' ],
      columnWidth: [ 'focus' ],
    },
  }
  const expectedCss = `
    .col-count-1 { column-count: 1 }
    .col-count-2 { column-count: 2 }
    .col-count-3 { column-count: 3 }

    .col-gap-sm { column-gap: 1rem }
    .col-gap-md { column-gap: 1.5rem }
    .col-gap-lg { column-gap: 2rem }

    .hover\\:col-gap-sm:hover { column-gap: 1rem }
    .hover\\:col-gap-md:hover { column-gap: 1.5rem }
    .hover\\:col-gap-lg:hover { column-gap: 2rem }

    .col-w-sm { column-width: 120px }
    .col-w-md { column-width: 240px }
    .col-w-lg { column-width: 360px }

    .focus\\:col-w-sm:focus { column-width: 120px }
    .focus\\:col-w-md:focus { column-width: 240px }
    .focus\\:col-w-lg:focus { column-width: 360px }

    .col-rule-tailwind { column-rule-color: #38b2ac }

    .col-rule { column-rule-width: 1px }
    .col-rule-sm { column-rule-width: 2px }
    .col-rule-md { column-rule-width: 4px }
    .col-rule-lg { column-rule-width: 8px }

    .col-rule-none { column-rule-style: none }
    .col-rule-hidden { column-rule-style: hidden }
    .col-rule-dotted { column-rule-style: dotted }
    .col-rule-dashed { column-rule-style: dashed }
    .col-rule-solid { column-rule-style: solid }
    .col-rule-double { column-rule-style: double }
    .col-rule-groove { column-rule-style: groove }
    .col-rule-ridge { column-rule-style: ridge }
    .col-rule-inset { column-rule-style: inset }
    .col-rule-outset { column-rule-style: outset }

    .col-fill-auto { column-fill: auto }
    .col-fill-balance { column-fill: balance }
    .col-fill-balance-all { column-fill: balance-all }

    .col-span-none { column-span: none }
    .col-span-all { column-span: all }

    @media (min-width: 640px) {
      .sm\\:col-count-1 { column-count: 1 }
      .sm\\:col-count-2 { column-count: 2 }
      .sm\\:col-count-3 { column-count: 3 }

      .sm\\:col-rule-tailwind { column-rule-color: #38b2ac }

      .sm\\:col-rule { column-rule-width: 1px }
      .sm\\:col-rule-sm { column-rule-width: 2px }
      .sm\\:col-rule-md { column-rule-width: 4px }
      .sm\\:col-rule-lg { column-rule-width: 8px }

      .sm\\:col-rule-none { column-rule-style: none }
      .sm\\:col-rule-hidden { column-rule-style: hidden }
      .sm\\:col-rule-dotted { column-rule-style: dotted }
      .sm\\:col-rule-dashed { column-rule-style: dashed }
      .sm\\:col-rule-solid { column-rule-style: solid }
      .sm\\:col-rule-double { column-rule-style: double }
      .sm\\:col-rule-groove { column-rule-style: groove }
      .sm\\:col-rule-ridge { column-rule-style: ridge }
      .sm\\:col-rule-inset { column-rule-style: inset }
      .sm\\:col-rule-outset { column-rule-style: outset }

      .sm\\:col-fill-auto { column-fill: auto }
      .sm\\:col-fill-balance { column-fill: balance }
      .sm\\:col-fill-balance-all { column-fill: balance-all }

      .sm\\:col-span-none { column-span: none }
      .sm\\:col-span-all { column-span: all }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('utilities can be customized', () => {
  const testConfig = {
    theme: {
      columnCount: [ 2, 4 ],
      columnGap: { sm: '8px', md: '16px', lg: '24px' },
      columnWidth: [ 4, 8 ],

      columnRuleColor: { 'tailwind': '#38b2ac' },
      columnRuleWidth: { sm: '2px', md: '4px', lg: '8px' },
      columnRuleStyle: [ 'dashed', 'solid' ],

      columnFill: { balance: 'balance-all' },
      columnSpan: [ 'all' ],
    },
  }
  const expectedCss = `
    .col-count-2 { column-count: 2 }
    .col-count-4 { column-count: 4 }

    .col-gap-sm { column-gap: 8px }
    .col-gap-md { column-gap: 16px }
    .col-gap-lg { column-gap: 24px }

    .col-w-4 { column-width: 4px }
    .col-w-8 { column-width: 8px }

    .col-rule-tailwind { column-rule-color: #38b2ac }

    .col-rule { column-rule-width: 1px }
    .col-rule-sm { column-rule-width: 2px }
    .col-rule-md { column-rule-width: 4px }
    .col-rule-lg { column-rule-width: 8px }

    .col-rule-dashed { column-rule-style: dashed }
    .col-rule-solid { column-rule-style: solid }

    .col-fill-balance { column-fill: balance-all }

    .col-span-all { column-span: all }

    @media (min-width: 640px) {
      .sm\\:col-count-2 { column-count: 2 }
      .sm\\:col-count-4 { column-count: 4 }

      .sm\\:col-gap-sm { column-gap: 8px }
      .sm\\:col-gap-md { column-gap: 16px }
      .sm\\:col-gap-lg { column-gap: 24px }

      .sm\\:col-w-4 { column-width: 4px }
      .sm\\:col-w-8 { column-width: 8px }

      .sm\\:col-rule-tailwind { column-rule-color: #38b2ac }

      .sm\\:col-rule { column-rule-width: 1px }
      .sm\\:col-rule-sm { column-rule-width: 2px }
      .sm\\:col-rule-md { column-rule-width: 4px }
      .sm\\:col-rule-lg { column-rule-width: 8px }

      .sm\\:col-rule-dashed { column-rule-style: dashed }
      .sm\\:col-rule-solid { column-rule-style: solid }

      .sm\\:col-fill-balance { column-fill: balance-all }

      .sm\\:col-span-all { column-span: all }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('uses fallback config values', () => {
  const testConfig = {
    theme: {
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        gray: {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
        },
      },
      gap: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
      borderWidth: [ 2, 4 ],

      columnGap: false,
      columnRuleColor: false,
      columnRuleWidth: false,
    },
  }
  const expectedCss = `
    .col-count-1 { column-count: 1 }
    .col-count-2 { column-count: 2 }
    .col-count-3 { column-count: 3 }

    .col-gap-sm { column-gap: 1rem }
    .col-gap-md { column-gap: 1.5rem }
    .col-gap-lg { column-gap: 2rem }

    .col-w-sm { column-width: 120px }
    .col-w-md { column-width: 240px }
    .col-w-lg { column-width: 360px }

    .col-rule-transparent { column-rule-color: transparent }
    .col-rule-black { column-rule-color: #000 }
    .col-rule-white { column-rule-color: #fff }
    .col-rule-gray-100 { column-rule-color: #f5f5f5 }
    .col-rule-gray-200 { column-rule-color: #eeeeee }
    .col-rule-gray-300 { column-rule-color: #e0e0e0 }
    .col-rule-gray-400 { column-rule-color: #bdbdbd }
    .col-rule-gray-500 { column-rule-color: #9e9e9e }
    .col-rule-gray-600 { column-rule-color: #757575 }
    .col-rule-gray-700 { column-rule-color: #616161 }
    .col-rule-gray-800 { column-rule-color: #424242 }
    .col-rule-gray-900 { column-rule-color: #212121 }
    .col-rule { column-rule-color: #e0e0e0 }

    .col-rule-2 { column-rule-width: 2px }
    .col-rule-4 { column-rule-width: 4px }

    .col-rule-none { column-rule-style: none }
    .col-rule-hidden { column-rule-style: hidden }
    .col-rule-dotted { column-rule-style: dotted }
    .col-rule-dashed { column-rule-style: dashed }
    .col-rule-solid { column-rule-style: solid }
    .col-rule-double { column-rule-style: double }
    .col-rule-groove { column-rule-style: groove }
    .col-rule-ridge { column-rule-style: ridge }
    .col-rule-inset { column-rule-style: inset }
    .col-rule-outset { column-rule-style: outset }

    .col-fill-auto { column-fill: auto }
    .col-fill-balance { column-fill: balance }
    .col-fill-balance-all { column-fill: balance-all }

    .col-span-none { column-span: none }
    .col-span-all { column-span: all }

    @media (min-width: 640px) {
      .sm\\:col-count-1 { column-count: 1 }
      .sm\\:col-count-2 { column-count: 2 }
      .sm\\:col-count-3 { column-count: 3 }

      .sm\\:col-gap-sm { column-gap: 1rem }
      .sm\\:col-gap-md { column-gap: 1.5rem }
      .sm\\:col-gap-lg { column-gap: 2rem }

      .sm\\:col-w-sm { column-width: 120px }
      .sm\\:col-w-md { column-width: 240px }
      .sm\\:col-w-lg { column-width: 360px }

      .sm\\:col-rule-transparent { column-rule-color: transparent }
      .sm\\:col-rule-black { column-rule-color: #000 }
      .sm\\:col-rule-white { column-rule-color: #fff }
      .sm\\:col-rule-gray-100 { column-rule-color: #f5f5f5 }
      .sm\\:col-rule-gray-200 { column-rule-color: #eeeeee }
      .sm\\:col-rule-gray-300 { column-rule-color: #e0e0e0 }
      .sm\\:col-rule-gray-400 { column-rule-color: #bdbdbd }
      .sm\\:col-rule-gray-500 { column-rule-color: #9e9e9e }
      .sm\\:col-rule-gray-600 { column-rule-color: #757575 }
      .sm\\:col-rule-gray-700 { column-rule-color: #616161 }
      .sm\\:col-rule-gray-800 { column-rule-color: #424242 }
      .sm\\:col-rule-gray-900 { column-rule-color: #212121 }
      .sm\\:col-rule { column-rule-color: #e0e0e0 }

      .sm\\:col-rule-2 { column-rule-width: 2px }
      .sm\\:col-rule-4 { column-rule-width: 4px }

      .sm\\:col-rule-none { column-rule-style: none }
      .sm\\:col-rule-hidden { column-rule-style: hidden }
      .sm\\:col-rule-dotted { column-rule-style: dotted }
      .sm\\:col-rule-dashed { column-rule-style: dashed }
      .sm\\:col-rule-solid { column-rule-style: solid }
      .sm\\:col-rule-double { column-rule-style: double }
      .sm\\:col-rule-groove { column-rule-style: groove }
      .sm\\:col-rule-ridge { column-rule-style: ridge }
      .sm\\:col-rule-inset { column-rule-style: inset }
      .sm\\:col-rule-outset { column-rule-style: outset }

      .sm\\:col-fill-auto { column-fill: auto }
      .sm\\:col-fill-balance { column-fill: balance }
      .sm\\:col-fill-balance-all { column-fill: balance-all }

      .sm\\:col-span-none { column-span: none }
      .sm\\:col-span-all { column-span: all }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})
