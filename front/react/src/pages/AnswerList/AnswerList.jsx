import React from 'react'
import Dummy from './dummy.json'

const AnswerList = () => <ul>
    {Dummy.map(item => (
        <li key={item}>Q{item.question_id} {item.question} <input type="button" value="見る" /></li>
    ))}
</ul>

export default AnswerList
