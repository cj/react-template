import './style.scss'
import { addDecorator, configure } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import { withInfo } from '@storybook/addon-info'

const req = require.context('../src', true, /(|\.)stories.(j|t)sx?$/)

function loadStories() {
  req.keys().forEach(file => req(file))
}

addDecorator(
  withOptions({
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  }),
)

addDecorator(
  withInfo({
    inline: true,
    header: false,
    source: false,
  }),
)

configure(loadStories, module)
