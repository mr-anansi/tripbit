import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

const Login = ({ props }) => {

  const [login, setLogin] = useState({
    data: {
      email: '',
      password: ''
    },
    errors: ''
  })

  const handleChange = (e) => {
    const data = { ...login.data, [e.target.name]: e.target.value }
    const errors = ''
    setLogin({ data, errors })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', login.data)
      .then(resp => {
        Auth.setToken(resp.data.token)
        props.history.push(`/profile/${Auth.getUserId()}`)
      })
      .catch(() => {
        setLogin({ errors: 'Email or password incorrect' })
        // console.log(err.response.data)
      })
  }

  return <>
    <div className=''>
      <div className='container'>
        <div className='columns'>
          <div className='column'>
            <h1>Login</h1>
            <form className='form' onSubmit={handleSubmit}>

              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    onChange={handleChange}
                    className="input has-text-info"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    onChange={handleChange}
                    name="password"
                    className="input has-text-info"
                    type="password"
                    placeholder="Password"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              {login.errors && <small className='help is-danger'>
                {login.errors}
              </small>}
              <button className='button is-rounded'>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Login