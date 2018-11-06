const path = require('path')
const { paths } = require('@craco/craco')

const srcDir = path.resolve(__dirname, `${paths.appSrc}/`)

module.exports = {
  webpack: {
    alias: {
      '~': srcDir,
    },
  },

  jest: {
    configure: {
      moduleNameMapper: {
        '^~(.*)$': '<rootDir>/src/$1',
      },
    },
  },

  babel: {
    plugins: ['react-hot-loader/babel'],
  },
}
