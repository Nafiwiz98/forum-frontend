import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'
import axiosBase from '../axiosConfig'
import classes from './SingleQuestion.module.css'
import { HiArrowCircleRight } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";

function SingleQuestion() {
    const { id } = useParams()
    const [Question, setQuestion] = useState()
    const [Answer, setAnswer] = useState()
    const [Error, setError] = useState();

    const answerRef = useRef()
    const fetchItsCorrespondingAnswer = async () => {
        const token = localStorage.getItem('token')
        try {
            const answerResponse = await axiosBase.get(`/answer?questionId=${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(answerResponse.data)
            setAnswer(answerResponse.data)
        } catch (error) {
            console.log(error)
            setError(error.message)
            setInterval(() => setError(nul), 4000)
        }
    }
    useEffect(() => {
        fetchItsCorrespondingAnswer()
    }, [id])
    const handleAnswerSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const answer = answerRef.current?.value
        if (!answer) {
            return setError('You must Provide a valid answer to post ')
        }
        try {
            const response = await axiosBase.post(`/answer/post-answer/${id}`, {
                answerText: answer
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.msg)
            answerRef.current.value = '';
            fetchItsCorrespondingAnswer()

        } catch (error) {
            const err = error.response.data.msg.map((errorMsg) => {
                return errorMsg.msg
            })
            setError(err)
            console.log(error)
        }

    }

    useEffect(() => {
        const fetchQuestionInfo = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axiosBase.get(`/question/${id}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                // console.log(response.data)
                setQuestion(response.data)
            } catch (error) {
                console.log(error)
            }

        }
        fetchQuestionInfo()
    }, [id])


    return (
        <>
            <Layout>
                <div className={classes.Container}>
                    <h2>Question</h2>
                    {Question && <div className={classes.asker}> Asked By: {Question?.askedBy.username}</div>}
                    <div className={classes.question}>
                        <HiArrowCircleRight size={27} style={{ color: 'blue' }} />
                        <h4 className={classes.questionTitle}>{Question?.question}</h4>
                        <div className={classes.createdAt}>{Question?.createdAt.split('T', 1)}</div>
                    </div>
                    
                    <div className={classes.question_desc}>
                        {Question && <h5 className={classes.description}>
                            <p>{Question?.questionDescription}</p>
                        </h5>}

                    </div>
                    <hr />
                    <h1 style={{ paddingTop: '10px', paddingBottom: '10px' }}>Answers From The Community</h1>
                    <hr />
                    {Answer?.map((answer) => {
                        return (
                            <div>
                                <div className={classes.answers}>
                                    <div className={classes.answerOwnerInfo}>
                                        <h1><BsPersonCircle /></h1>
                                        <p>{answer.answeredBy.username}</p>
                                    </div>
                                    <p>{answer.answerText}</p>
                                </div>
                            </div>
                        )
                    })}
                    <div className={classes.Form}>
                        {Error && <div>{Error}</div>}
                        <form onSubmit={handleAnswerSubmit}>
                            <input type="text" ref={answerRef} placeholder='share you answer here...' />
                            <button type='submit'>Post Answer</button>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default SingleQuestion
