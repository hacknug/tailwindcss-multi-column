const _ = require('lodash')

module.exports = function (options = {}) {
  return function ({ addUtilities, config, e }) {
    let { counts, gaps, widths, rules, variants } = _.defaults(options, {
      counts: [1, 2, 3],
      rules: {
        colors: config('borderColors'),
        widths: config('borderWidths'),
      },
    })

    const getName = (name) => name === 'default' ? '' : `-${name}`

    counts = _.map(counts, (count) => ({
      [`.${e(`col-count-${count}`)}`]: { 'column-count': count },
      [`.${e(`col-count-${count}`)}`]: { 'column-count': count },
    }))

    gaps = _.map(gaps, (gap, name) => ({
      [`.${e(`col-gap${getName(name)}`)}`]: { 'column-gap': gap },
    }))

    widths = _.map(widths, (width, name) => ({
      [`.${e(`col-w${getName(name)}`)}`]: { 'column-width': width },
    }))

    const ruleColors = _.map(rules.colors, (color, name) => ({
      [`.${e(`col-rule${getName(name)}`)}`]: { 'column-rule-color': color },
    }))

    const ruleWidths = _.map(rules.widths, (width, name) => ({
      [`.${e(`col-rule${getName(name)}`)}`]: { 'column-rule-width': width },
    }))

    addUtilities(counts, variants)
    addUtilities(gaps, variants)
    addUtilities(widths, variants)
    addUtilities(ruleColors, variants)
    addUtilities(ruleWidths, variants)
    addUtilities(
      {
        // Column-Rule Style
        '.col-rule-none': { columnRuleStyle: 'none' },
        '.col-rule-hidden': { columnRuleStyle: 'hidden' },
        '.col-rule-dotted': { columnRuleStyle: 'dotted' },
        '.col-rule-dashed': { columnRuleStyle: 'dashed' },
        '.col-rule-solid': { columnRuleStyle: 'solid' },
        '.col-rule-double': { columnRuleStyle: 'double' },
        '.col-rule-groove': { columnRuleStyle: 'groove' },
        '.col-rule-ridge': { columnRuleStyle: 'ridge' },
        '.col-rule-inset': { columnRuleStyle: 'inset' },
        '.col-rule-outset': { columnRuleStyle: 'outset' },

        // Column-Fill
        '.col-auto': { columnFill: 'auto' },
        '.col-balance': { columnFill: 'balance' },
        '.col-balance-all': { columnFill: 'balance-all' },

        // Column-Span
        '.col-none': { columnSpan: 'none' },
        '.col-all': { columnSpan: 'all' },
      }, variants
    )
  }
}
