import React, { useState } from 'react'
import classes from './askQuestion.module.css'
import Layout from '../../Components/Layout/Layout'
import { HiArrowCircleRight } from "react-icons/hi";
import { useRef } from 'react';
import axiosBase from '../../axiosConfig';
import { ClipLoader } from 'react-spinners'

function AskQuestion() {
    const questionTitleRef = useRef()
    const questionDetailRef = useRef()
    const [Error, setError] = useState();
    const [Success, setSuccess] = useState();
    const [Loader, setLoader] = useState(false)
    const handleAskingQuestion = async (e) => {
        e.preventDefault()
        const questionTitle = questionTitleRef.current.value
        const questionDetail = questionDetailRef.current.value
        if (!questionTitle || !questionDetail) {
            setError('Please provide valid question title and its detail information!')
            setInterval(() => setError(null), 8000)
            return
        }
        const token = localStorage.getItem('token')
        try {
            setLoader(true)
            const response = await axiosBase.post("/question/ask-question", {
                question: questionTitle, questionDescription: questionDetail
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setLoader(false)
            console.log(response.data.msg)
            setSuccess(response.data.msg)
            setInterval(() => setSuccess(null), 5000)
            questionTitleRef.current.value = ''
            questionDetailRef.current.value = ''
        } catch (error) {
            setLoader(false)
            setError(error.message)
            setInterval(() => setError(null), 8000)
            console.log(error)
        }
    }
    return (
        <>
            <Layout>
                <div className={classes.Container}>
                    <div className={classes.Guidelines}>
                        <h3>Steps To Write A Good Question.</h3>
                        <p>  <HiArrowCircleRight /> Summerize your problems in a one-line-little.</p>
                        <p>  <HiArrowCircleRight /> Describe your problem in one detail.</p>
                        <p>  <HiArrowCircleRight /> Describe what you tried and what you expected to happen.</p>
                        <p>  <HiArrowCircleRight /> Review our question and post it here.</p>
                    </div>
                    <div className={classes.Form}>
                        <h1>Post Your Question</h1>
                        <form onSubmit={handleAskingQuestion}>
                            {Error && <div className={classes.errorDisplayer}>{Error}</div>}
                            {Success && <div className={classes.successDisplayer}>{Success}</div>}

                            <input ref={questionTitleRef} className={classes.QuestionTitleInput} type="text" placeholder='Question Title' />
                            <textarea ref={questionDetailRef} name="" id="" placeholder='Question Detail ...'></textarea>
                            {Loader ? <div className={classes.Loader}><ClipLoader size={18} /></div> : <button type='submit'>Post Question</button>}
                            {/* <button type='submit'>Post Question</button> */}
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default AskQuestion


//question, questionDescription