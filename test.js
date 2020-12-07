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
      columnRuleColor: { tailwind: '#38b2ac' },
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
    .column-count-1 { column-count: 1 }
    .column-count-2 { column-count: 2 }
    .column-count-3 { column-count: 3 }

    .column-gap-sm { column-gap: 1rem }
    .column-gap-md { column-gap: 1.5rem }
    .column-gap-lg { column-gap: 2rem }

    .column-width-sm { column-width: 120px }
    .column-width-md { column-width: 240px }
    .column-width-lg { column-width: 360px }

    .column-rule-tailwind { column-rule-color: #38b2ac }

    .column-rule { column-rule-width: 1px }
    .column-rule-sm { column-rule-width: 2px }
    .column-rule-md { column-rule-width: 4px }
    .column-rule-lg { column-rule-width: 8px }

    .column-rule-none { column-rule-style: none }
    .column-rule-hidden { column-rule-style: hidden }
    .column-rule-dotted { column-rule-style: dotted }
    .column-rule-dashed { column-rule-style: dashed }
    .column-rule-solid { column-rule-style: solid }
    .column-rule-double { column-rule-style: double }
    .column-rule-groove { column-rule-style: groove }
    .column-rule-ridge { column-rule-style: ridge }
    .column-rule-inset { column-rule-style: inset }
    .column-rule-outset { column-rule-style: outset }

    .column-fill-auto { column-fill: auto }
    .column-fill-balance { column-fill: balance }
    .column-fill-balance-all { column-fill: balance-all }

    .column-span-none { column-span: none }
    .column-span-all { column-span: all }

    @media (min-width: 640px) {
      .sm\\:column-count-1 { column-count: 1 }
      .sm\\:column-count-2 { column-count: 2 }
      .sm\\:column-count-3 { column-count: 3 }

      .sm\\:column-gap-sm { column-gap: 1rem }
      .sm\\:column-gap-md { column-gap: 1.5rem }
      .sm\\:column-gap-lg { column-gap: 2rem }

      .sm\\:column-width-sm { column-width: 120px }
      .sm\\:column-width-md { column-width: 240px }
      .sm\\:column-width-lg { column-width: 360px }

      .sm\\:column-rule-tailwind { column-rule-color: #38b2ac }

      .sm\\:column-rule { column-rule-width: 1px }
      .sm\\:column-rule-sm { column-rule-width: 2px }
      .sm\\:column-rule-md { column-rule-width: 4px }
      .sm\\:column-rule-lg { column-rule-width: 8px }

      .sm\\:column-rule-none { column-rule-style: none }
      .sm\\:column-rule-hidden { column-rule-style: hidden }
      .sm\\:column-rule-dotted { column-rule-style: dotted }
      .sm\\:column-rule-dashed { column-rule-style: dashed }
      .sm\\:column-rule-solid { column-rule-style: solid }
      .sm\\:column-rule-double { column-rule-style: double }
      .sm\\:column-rule-groove { column-rule-style: groove }
      .sm\\:column-rule-ridge { column-rule-style: ridge }
      .sm\\:column-rule-inset { column-rule-style: inset }
      .sm\\:column-rule-outset { column-rule-style: outset }

      .sm\\:column-fill-auto { column-fill: auto }
      .sm\\:column-fill-balance { column-fill: balance }
      .sm\\:column-fill-balance-all { column-fill: balance-all }

      .sm\\:column-span-none { column-span: none }
      .sm\\:column-span-all { column-span: all }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('modifier can contain fractions', () => {
  const testConfig = {
    theme: {
      columnGap: { '1/2': '50%' },
    },
  }
  const expectedCss = `
    .column-count-1 { column-count: 1 }
    .column-count-2 { column-count: 2 }
    .column-count-3 { column-count: 3 }

    .column-gap-sm { column-gap: 1rem }
    .column-gap-md { column-gap: 1.5rem }
    .column-gap-lg { column-gap: 2rem }
    .column-gap-1\\/2 { column-gap: 50% }

    .column-width-sm { column-width: 120px }
    .column-width-md { column-width: 240px }
    .column-width-lg { column-width: 360px }

    .column-rule-tailwind { column-rule-color: #38b2ac }

    .column-rule { column-rule-width: 1px }
    .column-rule-sm { column-rule-width: 2px }
    .column-rule-md { column-rule-width: 4px }
    .column-rule-lg { column-rule-width: 8px }

    .column-rule-none { column-rule-style: none }
    .column-rule-hidden { column-rule-style: hidden }
    .column-rule-dotted { column-rule-style: dotted }
    .column-rule-dashed { column-rule-style: dashed }
    .column-rule-solid { column-rule-style: solid }
    .column-rule-double { column-rule-style: double }
    .column-rule-groove { column-rule-style: groove }
    .column-rule-ridge { column-rule-style: ridge }
    .column-rule-inset { column-rule-style: inset }
    .column-rule-outset { column-rule-style: outset }

    .column-fill-auto { column-fill: auto }
    .column-fill-balance { column-fill: balance }
    .column-fill-balance-all { column-fill: balance-all }

    .column-span-none { column-span: none }
    .column-span-all { column-span: all }

    @media (min-width: 640px) {
      .sm\\:column-count-1 { column-count: 1 }
      .sm\\:column-count-2 { column-count: 2 }
      .sm\\:column-count-3 { column-count: 3 }

      .sm\\:column-gap-sm { column-gap: 1rem }
      .sm\\:column-gap-md { column-gap: 1.5rem }
      .sm\\:column-gap-lg { column-gap: 2rem }
      .sm\\:column-gap-1\\/2 { column-gap: 50% }

      .sm\\:column-width-sm { column-width: 120px }
      .sm\\:column-width-md { column-width: 240px }
      .sm\\:column-width-lg { column-width: 360px }

      .sm\\:column-rule-tailwind { column-rule-color: #38b2ac }

      .sm\\:column-rule { column-rule-width: 1px }
      .sm\\:column-rule-sm { column-rule-width: 2px }
      .sm\\:column-rule-md { column-rule-width: 4px }
      .sm\\:column-rule-lg { column-rule-width: 8px }

      .sm\\:column-rule-none { column-rule-style: none }
      .sm\\:column-rule-hidden { column-rule-style: hidden }
      .sm\\:column-rule-dotted { column-rule-style: dotted }
      .sm\\:column-rule-dashed { column-rule-style: dashed }
      .sm\\:column-rule-solid { column-rule-style: solid }
      .sm\\:column-rule-double { column-rule-style: double }
      .sm\\:column-rule-groove { column-rule-style: groove }
      .sm\\:column-rule-ridge { column-rule-style: ridge }
      .sm\\:column-rule-inset { column-rule-style: inset }
      .sm\\:column-rule-outset { column-rule-style: outset }

      .sm\\:column-fill-auto { column-fill: auto }
      .sm\\:column-fill-balance { column-fill: balance }
      .sm\\:column-fill-balance-all { column-fill: balance-all }

      .sm\\:column-span-none { column-span: none }
      .sm\\:column-span-all { column-span: all }
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
    .column-count-1 { column-count: 1 }
    .column-count-2 { column-count: 2 }
    .column-count-3 { column-count: 3 }

    .column-gap-sm { column-gap: 1rem }
    .column-gap-md { column-gap: 1.5rem }
    .column-gap-lg { column-gap: 2rem }

    .hover\\:column-gap-sm:hover { column-gap: 1rem }
    .hover\\:column-gap-md:hover { column-gap: 1.5rem }
    .hover\\:column-gap-lg:hover { column-gap: 2rem }

    .column-width-sm { column-width: 120px }
    .column-width-md { column-width: 240px }
    .column-width-lg { column-width: 360px }

    .focus\\:column-width-sm:focus { column-width: 120px }
    .focus\\:column-width-md:focus { column-width: 240px }
    .focus\\:column-width-lg:focus { column-width: 360px }

    .column-rule-tailwind { column-rule-color: #38b2ac }

    .column-rule { column-rule-width: 1px }
    .column-rule-sm { column-rule-width: 2px }
    .column-rule-md { column-rule-width: 4px }
    .column-rule-lg { column-rule-width: 8px }

    .column-rule-none { column-rule-style: none }
    .column-rule-hidden { column-rule-style: hidden }
    .column-rule-dotted { column-rule-style: dotted }
    .column-rule-dashed { column-rule-style: dashed }
    .column-rule-solid { column-rule-style: solid }
    .column-rule-double { column-rule-style: double }
    .column-rule-groove { column-rule-style: groove }
    .column-rule-ridge { column-rule-style: ridge }
    .column-rule-inset { column-rule-style: inset }
    .column-rule-outset { column-rule-style: outset }

    .column-fill-auto { column-fill: auto }
    .column-fill-balance { column-fill: balance }
    .column-fill-balance-all { column-fill: balance-all }

    .column-span-none { column-span: none }
    .column-span-all { column-span: all }

    @media (min-width: 640px) {
      .sm\\:column-count-1 { column-count: 1 }
      .sm\\:column-count-2 { column-count: 2 }
      .sm\\:column-count-3 { column-count: 3 }

      .sm\\:column-rule-tailwind { column-rule-color: #38b2ac }

      .sm\\:column-rule { column-rule-width: 1px }
      .sm\\:column-rule-sm { column-rule-width: 2px }
      .sm\\:column-rule-md { column-rule-width: 4px }
      .sm\\:column-rule-lg { column-rule-width: 8px }

      .sm\\:column-rule-none { column-rule-style: none }
      .sm\\:column-rule-hidden { column-rule-style: hidden }
      .sm\\:column-rule-dotted { column-rule-style: dotted }
      .sm\\:column-rule-dashed { column-rule-style: dashed }
      .sm\\:column-rule-solid { column-rule-style: solid }
      .sm\\:column-rule-double { column-rule-style: double }
      .sm\\:column-rule-groove { column-rule-style: groove }
      .sm\\:column-rule-ridge { column-rule-style: ridge }
      .sm\\:column-rule-inset { column-rule-style: inset }
      .sm\\:column-rule-outset { column-rule-style: outset }

      .sm\\:column-fill-auto { column-fill: auto }
      .sm\\:column-fill-balance { column-fill: balance }
      .sm\\:column-fill-balance-all { column-fill: balance-all }

      .sm\\:column-span-none { column-span: none }
      .sm\\:column-span-all { column-span: all }
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
    .column-count-2 { column-count: 2 }
    .column-count-4 { column-count: 4 }

    .column-gap-sm { column-gap: 8px }
    .column-gap-md { column-gap: 16px }
    .column-gap-lg { column-gap: 24px }

    .column-width-4 { column-width: 4px }
    .column-width-8 { column-width: 8px }

    .column-rule-tailwind { column-rule-color: #38b2ac }

    .column-rule { column-rule-width: 1px }
    .column-rule-sm { column-rule-width: 2px }
    .column-rule-md { column-rule-width: 4px }
    .column-rule-lg { column-rule-width: 8px }

    .column-rule-dashed { column-rule-style: dashed }
    .column-rule-solid { column-rule-style: solid }

    .column-fill-balance { column-fill: balance-all }

    .column-span-all { column-span: all }

    @media (min-width: 640px) {
      .sm\\:column-count-2 { column-count: 2 }
      .sm\\:column-count-4 { column-count: 4 }

      .sm\\:column-gap-sm { column-gap: 8px }
      .sm\\:column-gap-md { column-gap: 16px }
      .sm\\:column-gap-lg { column-gap: 24px }

      .sm\\:column-width-4 { column-width: 4px }
      .sm\\:column-width-8 { column-width: 8px }

      .sm\\:column-rule-tailwind { column-rule-color: #38b2ac }

      .sm\\:column-rule { column-rule-width: 1px }
      .sm\\:column-rule-sm { column-rule-width: 2px }
      .sm\\:column-rule-md { column-rule-width: 4px }
      .sm\\:column-rule-lg { column-rule-width: 8px }

      .sm\\:column-rule-dashed { column-rule-style: dashed }
      .sm\\:column-rule-solid { column-rule-style: solid }

      .sm\\:column-fill-balance { column-fill: balance-all }

      .sm\\:column-span-all { column-span: all }
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
    .column-count-1 { column-count: 1 }
    .column-count-2 { column-count: 2 }
    .column-count-3 { column-count: 3 }

    .column-gap-sm { column-gap: 1rem }
    .column-gap-md { column-gap: 1.5rem }
    .column-gap-lg { column-gap: 2rem }

    .column-width-sm { column-width: 120px }
    .column-width-md { column-width: 240px }
    .column-width-lg { column-width: 360px }

    .column-rule-transparent { column-rule-color: transparent }
    .column-rule-black { column-rule-color: #000 }
    .column-rule-white { column-rule-color: #fff }
    .column-rule-gray-100 { column-rule-color: #f5f5f5 }
    .column-rule-gray-200 { column-rule-color: #eeeeee }
    .column-rule-gray-300 { column-rule-color: #e0e0e0 }
    .column-rule-gray-400 { column-rule-color: #bdbdbd }
    .column-rule-gray-500 { column-rule-color: #9e9e9e }
    .column-rule-gray-600 { column-rule-color: #757575 }
    .column-rule-gray-700 { column-rule-color: #616161 }
    .column-rule-gray-800 { column-rule-color: #424242 }
    .column-rule-gray-900 { column-rule-color: #212121 }
    .column-rule-DEFAULT { column-rule-color: #eeeeee }

    .column-rule-2 { column-rule-width: 2px }
    .column-rule-4 { column-rule-width: 4px }

    .column-rule-none { column-rule-style: none }
    .column-rule-hidden { column-rule-style: hidden }
    .column-rule-dotted { column-rule-style: dotted }
    .column-rule-dashed { column-rule-style: dashed }
    .column-rule-solid { column-rule-style: solid }
    .column-rule-double { column-rule-style: double }
    .column-rule-groove { column-rule-style: groove }
    .column-rule-ridge { column-rule-style: ridge }
    .column-rule-inset { column-rule-style: inset }
    .column-rule-outset { column-rule-style: outset }

    .column-fill-auto { column-fill: auto }
    .column-fill-balance { column-fill: balance }
    .column-fill-balance-all { column-fill: balance-all }

    .column-span-none { column-span: none }
    .column-span-all { column-span: all }

    @media (min-width: 640px) {
      .sm\\:column-count-1 { column-count: 1 }
      .sm\\:column-count-2 { column-count: 2 }
      .sm\\:column-count-3 { column-count: 3 }

      .sm\\:column-gap-sm { column-gap: 1rem }
      .sm\\:column-gap-md { column-gap: 1.5rem }
      .sm\\:column-gap-lg { column-gap: 2rem }

      .sm\\:column-width-sm { column-width: 120px }
      .sm\\:column-width-md { column-width: 240px }
      .sm\\:column-width-lg { column-width: 360px }

      .sm\\:column-rule-transparent { column-rule-color: transparent }
      .sm\\:column-rule-black { column-rule-color: #000 }
      .sm\\:column-rule-white { column-rule-color: #fff }
      .sm\\:column-rule-gray-100 { column-rule-color: #f5f5f5 }
      .sm\\:column-rule-gray-200 { column-rule-color: #eeeeee }
      .sm\\:column-rule-gray-300 { column-rule-color: #e0e0e0 }
      .sm\\:column-rule-gray-400 { column-rule-color: #bdbdbd }
      .sm\\:column-rule-gray-500 { column-rule-color: #9e9e9e }
      .sm\\:column-rule-gray-600 { column-rule-color: #757575 }
      .sm\\:column-rule-gray-700 { column-rule-color: #616161 }
      .sm\\:column-rule-gray-800 { column-rule-color: #424242 }
      .sm\\:column-rule-gray-900 { column-rule-color: #212121 }
      .sm\\:column-rule-DEFAULT { column-rule-color: #eeeeee }

      .sm\\:column-rule-2 { column-rule-width: 2px }
      .sm\\:column-rule-4 { column-rule-width: 4px }

      .sm\\:column-rule-none { column-rule-style: none }
      .sm\\:column-rule-hidden { column-rule-style: hidden }
      .sm\\:column-rule-dotted { column-rule-style: dotted }
      .sm\\:column-rule-dashed { column-rule-style: dashed }
      .sm\\:column-rule-solid { column-rule-style: solid }
      .sm\\:column-rule-double { column-rule-style: double }
      .sm\\:column-rule-groove { column-rule-style: groove }
      .sm\\:column-rule-ridge { column-rule-style: ridge }
      .sm\\:column-rule-inset { column-rule-style: inset }
      .sm\\:column-rule-outset { column-rule-style: outset }

      .sm\\:column-fill-auto { column-fill: auto }
      .sm\\:column-fill-balance { column-fill: balance }
      .sm\\:column-fill-balance-all { column-fill: balance-all }

      .sm\\:column-span-none { column-span: none }
      .sm\\:column-span-all { column-span: all }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})
