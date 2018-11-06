declare module 'react-delay' {
  export interface DelayProps {
    wait: number;
  }

  const Delay: React.ComponentClass<DelayProps>

  export default Delay
}
