import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Auth from '../lib/auth'

const Navbar = () => {
  const history = useHistory()

  const [state, setState] = useState({
    isOpen: false
  })

  const handleLogout = () => {
    Auth.logout()
    history.push('/')
    setState({ isOpen: false })
  }

  const toggleNavbar = () => {
    setState({ isOpen: !state.isOpen })
  }

  // add code to hide navbar on hero page

  return (
    <>
      {Auth.isAuthorized() && <div className="navbar is-fixed-bottom is-transparent">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/"
            onClick={() => setState({ isOpen: false })}
          >
            <em className='logo-text'>Scratch Map</em>
          </Link>
          <a
            role="button"
            className={`navbar-burger burger ${state.isOpen ? 'is-active' : ''}`}
            onClick={() => toggleNavbar()}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        {/* ternary below no longer necessary */}
        <div className={`navbar-menu ${state.isOpen ? 'is-active' : ''} ${history.location.pathname === '/' ? 'navbar-is-transparent' : 'navbar-is-transparent'}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <Link className="navbar-item" to={`/profile/${Auth.getUserId()}`}
                onClick={() => toggleNavbar()}
              >
                Profile
              </Link>
            </div>
            <div className="navbar-item">
              <Link className="navbar-item" to="/groups"
                onClick={() => toggleNavbar()}
              >
                Groups
              </Link>
            </div>
            <div className="navbar-item">
              <Link className="navbar-item" to="/city_selection"
                onClick={() => toggleNavbar()}
              >
                Select cities
              </Link>
            </div>
            <div className="navbar-item">
              <Link className="navbar-item" to="/add_trip"
                onClick={() => toggleNavbar()}
              >
                Add trip
              </Link>
            </div>
            <div className="navbar-item">
              <Link className="navbar-item" to="/play"
                onClick={() => toggleNavbar()}
              >
                Play game
              </Link>
            </div>
            <div className="navbar-item">
              {/* added to prop to deal with warning message */}
              <Link className="navbar-item" to="/" onClick={() => handleLogout()}>
                Logout
              </Link>
            </div>
            <div className="navbar-item">
              <div className="field has-addons">
                <div className="control">
                  <input className="input has-text-info" type="text" placeholder="Find a friend" />
                </div>
                <div className="control">
                  <a className="button is-info">
                    Search
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Navbar