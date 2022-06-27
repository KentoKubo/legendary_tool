import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'

import Top from './pages/Top/Top'
import SelectPerson from './pages/SelectPerson/SelectPerson'
import QuestionList from './pages/QuestionList/QuestionList'
import AnswerSelect from './pages/AnswerSelect/AnswerSelect'
import AnswerSearch from './pages/AnswerSearch/AnswerSearch'

const root = document.getElementById('root')
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/select-person" element={<SelectPerson />} />
      <Route path="/question-list" element={<QuestionList />} />
      <Route path="/answer-select" element={<AnswerSelect />} />
      <Route path="/answer-search" element={<AnswerSearch />} />
    </Routes>
  </Router>,
  root
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
