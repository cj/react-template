const {
  craPaths,
  loadWebpackDevConfig,
  overrideWebpackDevConfig,
} = require('@craco/craco/lib/cra')
const { loadCracoConfig } = require('@craco/craco/lib/config')
const { overrideWebpack } = require('@craco/craco/lib/features/webpack')
const { overrideDevServer } = require('@craco/craco/lib/features/dev-server')
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin')

const context = {
  env: process.env.NODE_ENV,
  paths: craPaths,
}

const cracoConfig = loadCracoConfig(context)
const config = loadWebpackDevConfig()

overrideWebpack(cracoConfig, config, overrideWebpackDevConfig, context)
overrideDevServer(cracoConfig, context)

module.exports = ({ entry, output, plugins }) => {
  const {
    module: { rules },
  } = config

  // Remove eslint-loader
  rules.splice(0, 2)

  // Storybook uses ejs templates, do no treat them as static files.
  rules[0].oneOf[rules[0].oneOf.length - 1].exclude.push(/\.ejs/)

  plugins.push(new TSDocgenPlugin())

  rules.push({
    test: /(\.|)stories\.jsx?$/,
    loaders: [
      {
        loader: '@storybook/addon-storysource/loader',
        options: {
          prettierConfig: {
            printWidth: 120,
            tabWidth: 2,
            bracketSpacing: true,
            trailingComma: 'es5',
            singleQuote: true,
            semi: false,
          },
          uglyCommentsRegex: [/^eslint-.*/, /^global.*/],
        },
      },
    ],
    enforce: 'pre',
  })

  return {
    ...config,
    entry,
    output,
    plugins,
  }
}
