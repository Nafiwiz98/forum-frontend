import React from 'react'
import images from '../../assets/image.js'
import classes from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext.jsx'
import { UserContext } from '../Contexts/UserContext.jsx'



export default function Header() {
    const navigate = useNavigate()
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const { userInfo } = useContext(UserContext)
    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/')
        setIsAuthenticated(false)
        userInfo(null)
    }
    return (
        <>
            <div className={classes.Container}>
                <div className={classes.Logo}>
                    <img src={images.evangadiLogo} alt="" />
                </div>
                <div className={classes.Links}>
                    <Link to="/dashboard">Home</Link>
                    <Link to="">how it Works</Link>
                    {isAuthenticated
                        ?
                        <button onClick={handleSignOut} className={classes.singInButton}>LOG OUT{userInfo?.username}</button>
                        :
                        <Link to="/"><button className={classes.singInButton}>SIGN IN</button></Link>}
                    {/* <Link to="/"><button className={classes.singInButton}>SIGN IN</button></Link> */}
                </div>
            </div>
        </>
    )
}
