import React from 'react'
import Layout from '../Layout/Layout'
import classes from '../Registerr/Registerr.module.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import axiosBase from '../../axiosConfig'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext'
import { useContext } from 'react'


function Login() {
  const [Error, setError] = useState();
  // const [ValidationError, setValidationError] = useState();
  const [SuccessMessage, setSuccessMessage] = useState();
  const [Loader, setLoader] = useState(false);
  const navigate = useNavigate()

  const { setIsAuthenticated } = useContext(AuthContext);


  const emailTracker = useRef(null)
  const passwordTracker = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()

    const email = emailTracker.current?.value
    const password = passwordTracker.current?.value

    if (!email?.trim() || !password?.trim()) {
      setError('Please fill out all fields properly');
      setTimeout(() => setError(null), 6000)
      return;
    }

    try {
      setLoader(true)
      const response = await axiosBase.post('/user/login', { email, password })
      setLoader(false)
      setError(null)
      console.log(response.data)
      console.log(response.data.token)
      setSuccessMessage(response.data.msg)
      setTimeout(() => setSuccessMessage(null), 1000)
      localStorage.setItem('token', response.data.token)
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setLoader(false)
      // const errorMessage = err?.response?.data?.msg?.map((error) => {
      //   return error.msg
      // })
      // console.log(err)
      console.log(err.response?.data || err.message)
      setError(err.response?.data?.msg || err.message)
      // setValidationError(errorMessage);
      setTimeout(() => setError(null), 7000);
    }
  }
  return (
    <>
      <div className={classes.form_container}>
        <h4 className={classes.joinNetwork}>Join the network</h4>
        <p className={classes.para}>Already have an account? <Link to='/'>Sign in</Link></p>
        {SuccessMessage && <div className={classes.SuccessBox}>{SuccessMessage}</div>}

        {Error &&
          <div className={classes.errorBox}>
            {Error}
          </div>
        }

        <form onSubmit={handleSubmit}>
          <input type="text" ref={emailTracker} placeholder='Email' />
          <input type="password" placeholder='Password' ref={passwordTracker} />
          {Loader ? <div className={classes.loader}><ClipLoader size={20} color='white' /></div> : <button type='submit'>Sign In</button>}
        </form>
        <button>
          <p className={classes.para}>Don't have an account? <Link to="/register">Create one! </Link></p>
        </button>
      </div>
    </>
  )
}

export default Login

