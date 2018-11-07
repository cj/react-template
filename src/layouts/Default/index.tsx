import React from 'react'

const DefaultLayout: React.SFC<{
  children: React.ReactNode
}> = ({ children }) => <div className="DefaultLayout h-full">{children}</div>

export default DefaultLayout
