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
// import SearchProblems from './pages/SearchProblems/SearchProblems'
// import AnswerQuestions from './pages/AnswerQuestions/AnswerQuestions'
// import AnswerPreparation from './pages/AnswerPreparation/AnswerPreparation'
// import AnswerConfirmation from './pages/AnswerConfirmation/AnswerConfirmation'
// import Thanks from './pages/Thanks/Thanks'
// import ShareAnswers from './pages/ShareAnswers/ShareAnswers'
// import CreateQuestions from './pages/CreateQuestions/CreateQuestions'
// import AnswerList from './pages/AnswerList/AnswerList'

const root = document.getElementById('root')
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/select-person" element={<SelectPerson />} />
      <Route path="/question-list" element={<QuestionList />} />
      <Route path="/answer-select" element={<AnswerSelect />} />
      <Route path="/answer-search" element={<AnswerSearch />} />
      {/* <Route path="/search-problems" element={<SearchProblems />} />
      <Route path="/answer-questions" element={<AnswerQuestions />} />
      <Route path="/answer-preparation" element={<AnswerPreparation />} />
      <Route path="/answer-confirmation" element={<AnswerConfirmation />} />
      <Route path="/thanks" element={<Thanks />} />
      <Route path="/share-answers" element={<ShareAnswers />} />
      <Route path="/create-questions" element={<CreateQuestions />} />
      <Route path="/answer-list" element={<AnswerList />} /> */}
    </Routes>
  </Router>,
  root
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
