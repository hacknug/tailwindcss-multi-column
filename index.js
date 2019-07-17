const tailwindConfig = require('./tailwind.config.js')
const { buildConfig, something } = require('@hacknug/tailwindcss-plugin-utils')

module.exports = function () {
  return function (coreUtils) {
    const pluginUtilities = {
      'col-count': buildConfig(coreUtils, tailwindConfig, 'columnCount'),
      'col-gap': buildConfig(coreUtils, tailwindConfig, 'columnGap', 'gap', 'gridGap'),
      'col-w': buildConfig(coreUtils, tailwindConfig, 'columnWidth'),
      'col-rule-color': buildConfig(coreUtils, tailwindConfig, 'columnRuleColor', 'borderColor'),
      'col-rule-width': buildConfig(coreUtils, tailwindConfig, 'columnRuleWidth', 'borderWidth'),
      'col-rule-style': buildConfig(coreUtils, tailwindConfig, 'columnRuleStyle'),
      'col-fill': buildConfig(coreUtils, tailwindConfig, 'columnFill'),
      'col-span': buildConfig(coreUtils, tailwindConfig, 'columnSpan'),
    }

    return something(pluginUtilities, coreUtils)
  }
}
