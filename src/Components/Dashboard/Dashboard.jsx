import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext.jsx'
import classes from './Dashboard.module.css'
import axiosBase from '../../axiosConfig.js'
import { BsPersonCircle } from "react-icons/bs";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'




function Dashboard() {
    const [Questions, setQuestions] = useState([])
    const [Loader, setLoader] = useState(false);
    const { UserInfo } = useContext(UserContext)
    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem('token');
            try {
                setLoader(true)
                const response = await axiosBase.get('/question/all-questions', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                console.log(response?.data)
                setQuestions(response.data)
                setLoader(false)
            } catch (error) {
                console.log(error)
                setLoader(false)
            }
        }
        fetchQuestions()
    }, [])

    return (
        <>
            <Layout>
                {Loader && <div><ClipLoader /></div>}
                <div className={classes.Container}>
                    <div className={classes.Header}>
                        <Link to={'/question/askQuestion'}><div className={classes.ask_Question}>Ask Question</div></Link>
                        {UserInfo && <h1 className={classes.username}>Welcome: {UserInfo?.username}</h1>}
                    </div>
                    <div className={classes.Questions}>
                        <h3>Questions</h3>
                        <hr />
                        {Questions?.map((question) => {
                            return (
                                <>
                                    <Link to={`/question/${question._id}`} className={classes.QuestionLink}>
                                        <div className={classes.singleQuestionCard}>
                                            <div className={classes.ownerInfo}>
                                                <h1 className={classes.ownerPic}><BsPersonCircle size={80} /></h1>
                                                <div className={classes.questionOwner}>{question.askedBy.username}</div>
                                            </div>
                                            <div className={classes.singleQuestion}>{question.question}</div>
                                            <div className={classes.arrow}><RiArrowRightSLine size={30} /></div>
                                        </div>
                                        <hr />
                                    </Link>
                                </>
                            )
                        })}
                    </div >
                </div>

            </Layout>
        </>
    )
}

export default Dashboard
