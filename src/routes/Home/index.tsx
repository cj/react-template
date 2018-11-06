import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Header from '~/components/Header'
import Layout from '~/layouts/Default'

const HomeRoute: React.SFC<RouteComponentProps> = () => (
  <Layout>
    <Header />
  </Layout>
)

export default HomeRoute
