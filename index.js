const _ = require('lodash')
const flatten = require('flat').flatten

const FLATTEN_CONFIG = { delimiter: '-', maxDepth: 2 }
const getName = name => name.split('-default').join('')

module.exports = function () {
  return function ({ addUtilities, e, theme, variants }) {
    const buildConfig = (themeKey, ...fallbackKeys) => {
      return buildConfigFromTheme(themeKey, ...fallbackKeys) || buildConfigFromArray(themeKey)
    }
    const buildConfigFromTheme = (themeKey, ...fallbackKeys) => {
      const buildObject = ([ modifier, value ]) => [ modifier, { [themeKey]: value } ]
      const getThemeSettings = (themeKey, fallbackKeys) => {
        const [newThemeKey, ...newFallbackKeys] = fallbackKeys || []
        return theme(themeKey, false) || (fallbackKeys.length && getThemeSettings(newThemeKey, [...newFallbackKeys]))
      }

      const themeSettings = getThemeSettings(themeKey, fallbackKeys)
      const themeObject = _.isArray(themeSettings) ? _.zipObject(themeSettings, themeSettings) : themeSettings
      const themeEntries = themeSettings && Object
        .entries(flatten(themeObject, FLATTEN_CONFIG))
        .map(entry => buildObject(entry))

      return themeSettings ? _.fromPairs(themeEntries) : false
    }
    const buildConfigFromArray = (property) => {
      const defaultSettings = defaultValues[property]
      const defaultEntries = defaultSettings && defaultSettings
        .map((value) => ([value, { [property]: value }]))

      return defaultSettings ? _.fromPairs(defaultEntries) : false
    }

    const defaultValues = {
      columnCount: [1, 2, 3],
      columnRuleStyle: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'],
      columnFill: ['auto', 'balance', 'balance-all'],
      columnSpan: ['none', 'all'],
    }

    const pluginUtilities = {
      'column-count': buildConfig('columnCount'),
      'column-gap': buildConfig('columnGap', 'gap', 'gridGap'),
      'column-width': buildConfig('columnWidth', 'gap', 'gridGap'),
      'column-rule-color': buildConfig('columnRuleColor', 'borderColor'),
      'column-rule-width': buildConfig('columnRuleWidth', 'borderWidth'),
      'column-rule-style': buildConfig('columnRuleStyle'),
      'column-fill': buildConfig('columnFill', 'borderColor'),
      'column-span': buildConfig('columnSpan'),
    }

    Object.entries(pluginUtilities)
      .filter(([ values ]) => !_.isEmpty(values))
      .forEach(([ modifier, values ]) => {
        const className = _.kebabCase(modifier).split('-').slice(0, 2).join('-')
        const variantName = Object.keys(Object.entries(values)[0][1])[0]
        const escapedValues = _.fromPairs(Object.entries(values).map(([modifier, value]) => [e(modifier), value]))
        const utilities = flatten({ [`.${e(`${className}`)}`]: escapedValues }, FLATTEN_CONFIG)

        addUtilities(
          _.mapKeys(utilities, (value, key) => getName(key)),
          variants(variantName, ['responsive'])
        )
      })
  }
}
