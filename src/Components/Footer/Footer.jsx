import React from 'react'
import classes from './Footer.module.css'
import images from '../../assets/image.js'
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { SlSocialYoutube } from "react-icons/sl";

function Footer() {
    return (
        <>
            <div className={classes.Footer}>
                <div className={classes.Logo}>
                    <img src={images.evangadiLogo} alt="" />
                    <div className={classes.socialMediaLinks}>
                        <a href=""><FaFacebookF /></a>
                        <a href=""><FaInstagram /></a>
                        <a href=""><SlSocialYoutube /></a>
                    </div>
                </div>
                <div className={classes.secondInfo}>
                    <h3>Useful Link</h3>
                    <a href="">
                        <p>How it works</p>
                    </a>
                    <a href="">
                        <p>Terms of Service</p>
                    </a>
                    <a href="">
                        <p>Privacy policy</p>
                    </a>
                </div>
                <div className={classes.thirdInfo}>
                    <h3>Contact Info</h3>
                    <a href="">
                        <p>Evangadi Networks</p>
                    </a>
                    <a href="">
                        <p>support@evangadi.com</p>
                    </a>
                    <a href="">
                        <p>+1-202-386-2702</p>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Footer
