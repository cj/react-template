import React from 'react'

const DefaultLayout: React.SFC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <div className={`DefaultLayout h-full ${className}`}>{children}</div>
)

export default DefaultLayout
