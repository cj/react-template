/// <reference types="react"/>

declare module 'react-delay' {
  export interface DelayProps {
    wait: number
  }

  const Delay: React.ClassicComponentClass<DelayProps>

  export default Delay
}
