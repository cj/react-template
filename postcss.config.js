/* eslint-disable import/no-extraneous-dependencies */
const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const postcssPresetEnv = require('postcss-preset-env')

const plugins = [
  autoprefixer,
  postcssFlexbugsFixes,
  tailwindcss('./tailwind.config.js'),
  postcssPresetEnv({
    autoprefixer: {
      flexbox: 'no-2009',
    },
    stage: 3,
  }),
]

if (process.env.NODE_ENV === 'production') {
  class TailwindExtractor {
    static extract(content) {
      return content.match(/[A-Za-z0-9-_:/]+/g) || []
    }
  }

  plugins.push(
    purgecss({
      content: [
        './src/**/*.html',
        './src/**/*.jsx',
        './src/**/*.tsx',
        './src/**/*.css',
        './src/**/*.scss',
      ],
      whitelist: ['app', 'html', 'body', 'fa', 'svg', 'animated'],
      whitelistPatterns: [
        /[A-Za-z0-9_-]+__[A-Za-z0-9_-]+/,
        /^fa-.*/,
        /^svg-.*/,
        /^animated.*/,
        /^slide.*/,
      ],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['html', 'js', 'jsx', 'ts', 'tsx', 'css', 'scss'],
        },
      ],
    }),
  )
}

module.exports = { plugins }
