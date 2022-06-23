import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import  { Button } from '@mui/material'
import style from './AnswerDetail.module.scss'

const AnswerDetail = () =>{
    const answers = [
        { id: 0, question_id:0, answer: 'ans1'},
        { id: 1, question_id:0, answer: 'ans2'},
        { id: 2, question_id:1, answer: 'ans3'}
    ]
    // const questions = [
    //     { question_id: 0, question: "どんな人？" },
    //     { question_id: 1, question: "あだ名は？" },
    //     { question_id: 2, question: "あだ名は？" },
    //     { question_id: 3, question: "どんな人？" },
    //     { question_id: 4, question: "どんな人？" }
    // ]

    const navigate = useNavigate()
    const location = useLocation()

    const [currentQuestion, setCurrentQuestion] = useState(location.state.question)

    const clickBackButton = () => {
        navigate('/select-person')
    }

    const clickPrevButton = () => {
        setCurrentQuestion(currentQuestion - 1)
    }

    return (
        <div className={style.container}>
            <Button onClick={clickBackButton} variant="outlined">一覧に戻る</Button>
            <h1>答え詳細画面</h1>
            <div className={style.personImage}>image</div>
            <p>Q{currentQuestion.question_id} {currentQuestion.question}</p>
            <ul>
                {answers.map(item=>(
                    <li key={item.id}>回答{item.id} {item.answer}</li>
                ))}
            </ul>
            <div className={style.footerButtons}>
                <Button onClick={clickPrevButton} variant="outlined">
                ＜
                </Button>
            </div>
        </div>
    )
}

export default AnswerDetail
