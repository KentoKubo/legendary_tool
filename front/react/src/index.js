import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'

import Top from './pages/Top/Top'
import AnswerSelect from './pages/AnswerSelect/AnswerSelect'
import AnswerSearch from './pages/AnswerSearch/AnswerSearch'
import AnswerDetail from './pages/AnswerDetail/AnswerDetail'
import SearchQuestions from './pages/SearchQuestions/SearchQuestions'
import InputAnswererName from './pages/InputAnswererName/InputAnswererName'
import AnswerPreparation from './pages/AnswerPreparation/AnswerPreparation'
import AnswerQuestions from './pages/AnswerQuestions/AnswerQuestions'
import AnswerConfirmation from './pages/AnswerConfirmation/AnswerConfirmation'
import Thanks from './pages/Thanks/Thanks'
import CreateQuestions from './pages/CreateQuestions/CreateQuestions'
import AnswerList from './pages/AnswerList/AnswerList'

const root = document.getElementById('root')
ReactDOM.render(
  <div className="background-container">
    <div className="yellow-box" />
    <div className="blue-1" />
    <div className="blue-2" />
    <div className="orange-box" />
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/search-problems" element={<SearchQuestions />} />
          <Route path="/answer-select" element={<AnswerSelect />} />
          <Route path="/answer-search" element={<AnswerSearch />} />
          <Route path="/answer-detail" element={<AnswerDetail />} />
          <Route path="/input-answerer-name" element={<InputAnswererName />} />
          <Route path="/answer-preparation" element={<AnswerPreparation />} />
          <Route path="/answer-questions" element={<AnswerQuestions />} />
          <Route path="/answer-confirmation" element={<AnswerConfirmation />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/create-questions" element={<CreateQuestions />} />
          <Route path="/answer-list" element={<AnswerList />} />
        </Routes>
      </Router>
    </div>
  </div>,
  root
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
