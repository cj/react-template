import 'nprogress/nprogress.css'
import React, { useEffect } from 'react'
import Delay from 'react-delay'
import nprogress from 'nprogress'

const Loading: React.SFC<{
  /** How long to wait until loading component shows */
  delayMs?: number;
}> = ({ delayMs = 500 }) => {
  useEffect(() => {
    nprogress.start()
    return () => nprogress.done()
  })

  return (
    <Delay wait={delayMs}>
      <div>Loading...</div>
    </Delay>
  )
}

export default Loading
