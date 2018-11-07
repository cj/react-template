import React, { Suspense } from 'react'
// FIXME: https://github.com/gaearon/react-hot-loader/issues/1088#issuecomment-433537974
// import { hot, setConfig } from 'react-hot-loader'
import Loading from '../Loading'
import Router from '../Router'

// setConfig({ pureSFC: true } as any)

const App = () => (
  <div className="App">
    <Router />
  </div>
)

// export default hot(module)(App)
export default App
