import React from 'react'
import Layout from '../Layout/Layout.jsx'
import classes from './Landing.module.css'
// import Register from '../Register1/Register.jsx'
import Login from '../Login/Login.jsx'

function Landing({ children }) {
  return (
    <>
      <Layout>
        <div className={classes.Container}>
          <div className={classes.form}>
            {children}
          </div>
          <div className={classes.moreInfo}>
            <h4>About</h4>
            <h2>Evangadi Networks Q&A</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ratione iure vero. Repudiandae, aperiam reiciendis ex, sunt nesciunt facilis, quasi asperiores non aut eos incidunt veritatis nam eius sit recusandae?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ratione iure vero. Repudiandae, aperiam reiciendis ex, sunt nesciunt facilis, quasi asperiores non aut eos incidunt veritatis nam eius sit recusandae?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ratione iure vero. Repudiandae, aperiam reiciendis ex, sunt nesciunt facilis, quasi asperiores non aut eos incidunt veritatis nam eius sit recusandae?</p>
            <button>HOW IT WORKS</button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Landing
