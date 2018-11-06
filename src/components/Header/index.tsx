import './style.scss'
import React from 'react'
import logo from '~/assets/logo.svg'

const Header = () => (
  <header className="Header">
    <img src={logo} className="Header__logo" alt="logo" />
    <div className="Header__content">
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="Header__link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  </header>
)

export default Header
