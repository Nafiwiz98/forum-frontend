import React from 'react'
import images from '../../assets/image.js'
import classes from './Header.module.css'

export default function Header() {
    return (
        <>
            <div className={classes.Container}>
                <div className={classes.Logo}>
                    <img src={images.evangadiLogo} alt="" />
                </div>
                <div className={classes.Links}>
                    <a href="">Home</a>
                    <a href="">how it Works</a>
                    <a href=""><button className={classes.singInButton}>SIGN IN</button></a>
                </div>
            </div>
        </>
    )
}
