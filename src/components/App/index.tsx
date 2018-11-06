import React, { lazy, Suspense } from 'react'
import { hot } from 'react-hot-loader'
import Loading from '../Loading'

const Home = lazy(() => import('~/routes/Home'))

const App = () => (
  <div className="App">
    <Suspense maxDuration={3000} fallback={<Loading />}>
      <Home />
    </Suspense>
  </div>
)

export default hot(module)(App)
