const path = require('path')
const { paths, POSTCSS_MODES } = require('@craco/craco')

const srcDir = path.resolve(__dirname, `${paths.appSrc}/`)

module.exports = {
  style: {
    postcss: {
      mode: POSTCSS_MODES.file,
    },
  },
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
    plugins: [
      'react-hot-loader/babel',
      'styled-jsx/babel',
    ],
  },
}
