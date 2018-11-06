import React, { lazy, Suspense } from 'react'
import { Router as ReachRouter } from '@reach/router'
import Loading from '../Loading'

const Home = lazy(() => import('~/routes/Home'))

const Router = () => (
  <Suspense maxDuration={3000} fallback={<Loading />}>
    <ReachRouter>
      <Home path="/" />
    </ReachRouter>
  </Suspense>
)

export default Router
