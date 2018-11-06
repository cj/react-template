import React from 'react'
import Delay from 'react-delay'

const Loading: React.SFC<{
  /** How long to wait until loading component shows */
  delayMs?: number
}> = ({ delayMs = 500 }) => (
  <Delay wait={delayMs}>
    <div>Loading...</div>
  </Delay>
)

export default Loading
