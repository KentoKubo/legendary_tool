import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'

import Top from './pages/Top/Top'
import AnswerSelect from './pages/AnswerSelect/AnswerSelect'
import AnswerSearch from './pages/AnswerSearch/AnswerSearch'
import AnswerDetail from './pages/AnswerDetail/AnswerDetail'
import AnswerQuestions from './pages/AnswerQuestions/AnswerQuestions'
import SearchQuestions from './pages/SearchQuestions/SearchQuestions'
import InputName from './pages/InputName/InputName'
import AnswerPreparation from './pages/AnswerPreparation/AnswerPreparation'
import AnswerConfirmation from './pages/AnswerConfirmation/AnswerConfirmation'
import Thanks from './pages/Thanks/Thanks'
import AnswerList from './pages/AnswerList/AnswerList'
import UploadImages from './pages/UploadImages/UploadImages'
import InputTitle from './pages/InputTitle/InputTitle'
import CreateConfirmation from './pages/CreateConfirmation/CreateConfirmation'

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
          <Route path="/input-name" element={<InputName />} />
          <Route path="/answer-preparation" element={<AnswerPreparation />} />
          <Route path="/answer-questions" element={<AnswerQuestions />} />
          <Route path="/answer-confirmation" element={<AnswerConfirmation />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/answer-list" element={<AnswerList />} />
          <Route path="/answer-select" element={<AnswerSelect />} />
          <Route path="/answer-search" element={<AnswerSearch />} />
          <Route path="/answer-detail" element={<AnswerDetail />} />
          <Route path="/upload-images" element={<UploadImages />} />
          <Route path="/input-title" element={<InputTitle />} />
          <Route path="/create-confirmation" element={<CreateConfirmation />} />
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
