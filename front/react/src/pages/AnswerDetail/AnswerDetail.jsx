import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import  { Button } from '@mui/material'
import style from './AnswerDetail.module.scss'
import FlatButton from '../../components/FlatButton'

const AnswerDetail = () =>{
    //  [回答id，回答者名，回答日時，リアクション数][写真id, 回答テキスト]
    const answers = [
        { id: 0, question_id:0, answer: 'ans1'},
        { id: 1, question_id:0, answer: 'ans2'},
        { id: 2, question_id:1, answer: 'ans3'}
    ]

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
                <FlatButton onClick={clickPrevButton} variant="white">
                一覧にもどる
                </FlatButton>
            </div>
        </div>
    )
}

export default AnswerDetail
