import React from 'react'
import './Nav.css'
import logo from '../images/tetraLogo.png'

const Nav = () => {
  return (
    <div id='nav' className='ui secondary pointing menu'>
      <div className='left menu'>
        <a href='/'>
          <div className='item'>
            <img src={logo} alt='logo' />
            <div id='logo' className='ui large header'>tetra</div>
          </div>
        </a>
      </div>
    </div >
  )
}

export default Nav
