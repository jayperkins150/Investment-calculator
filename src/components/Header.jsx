import React from 'react';
import logo from '../assets/logo.jpg';
import './Header.css'

export const Header = ({ title = "Meet your Financial Investmate", subtitle = "The smart investment tool" }) => {
  return (
    <header id="header" className="header">
      <img src={logo} alt="Company Logo" className="header__logo" />
      <br />
      <div className="header__text">
        <h2 className="header__title">{title}</h2>
        {subtitle && <h3 className="header__subtitle">{subtitle}</h3>}
      </div>
    </header>
  )
}
