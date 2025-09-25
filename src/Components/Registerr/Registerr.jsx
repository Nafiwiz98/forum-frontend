import React from 'react'
import Layout from '../Layout/Layout'
import classes from './registerr.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axiosBase from '../../axiosConfig'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'


function Registerr() {
  const [Error, setError] = useState();
  const [SuccessMessage, setSuccessMessage] = useState();
  const [Loader, setLoader] = useState(false);
  const navigate = useNavigate()

  const usernameTracker = useRef(null)
  const firstnameTracker = useRef(null)
  const lastnameTracker = useRef(null)
  const emailTracker = useRef(null)
  const passwordTracker = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const username = usernameTracker.current?.value
    const firstname = firstnameTracker.current?.value
    const lastname = lastnameTracker.current?.value
    const email = emailTracker.current?.value
    const password = passwordTracker.current?.value

    if (
      !username?.trim() ||
      !firstname?.trim() ||
      !lastname?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
      setError('Please fill out all fields properly');
      setTimeout(() => setError(null), 6000)
      return;
    }

    try {
      setLoader(true)
      const response = await axiosBase.post('/user/register', { username, firstname, lastname, email, password })
      console.log(response)
      setLoader(false)
      setError(null)
      console.log(response.data)
      setSuccessMessage(response.data.msg)
      setTimeout(() => setSuccessMessage(null), 6000)
      setTimeout(() => navigate('/home'), 3000)
    } catch (err) {
      setLoader(false)
      console.log(err)
      setError(err.response?.data?.msg);
      setTimeout(() => setError(null), 7000);
    }
  }
  return (
    <>
      <div className={classes.form_container}>
        <h4 className={classes.joinNetwork}>Join the network</h4>
        <p className={classes.para}>Already have an account? <Link to='/'>Sign in</Link></p>
        {SuccessMessage && <div className={classes.SuccessBox}>{SuccessMessage}</div>}
        {Error && <div className={classes.errorBox}>{Error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" ref={emailTracker} placeholder='Email' />
          <div className={classes.fullname}>
            <input type="text" placeholder='First Name' ref={firstnameTracker} />
            <input type="text" placeholder='Last Name' ref={lastnameTracker} />
          </div>
          <input type="text" placeholder='User Name' ref={usernameTracker} />
          <input type="text" placeholder='Password' ref={passwordTracker} />
          {Loader ? <div className={classes.loader}><ClipLoader size={20} color='white' /></div> : <button type='submit'>Agree and Join</button>}
        </form>

        <p className={classes.privacy_policy}>I agree to the <a href="">privacy policy</a> and <a href="">terms of service</a></p>
        <button>
          <p className={classes.para}><Link to="/">Already have an account?</Link></p>
        </button>
      </div>
    </>
  )
}

export default Registerr

