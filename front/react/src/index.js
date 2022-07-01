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
import Header from './components/Header/Header'

const root = document.getElementById('root')
ReactDOM.render(
  <div className="background-container">
    <div className="yellow-box" />
    <div className="blue-1" />
    <div className="blue-2" />
    <div className="orange-box" />
    <div className="container">
    <div className="green-design" />
      <Router>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/search-questions" element={<SearchQuestions />} />
          <Route path="/input-name" element={<InputName />} />
          <Route
            path="/answer-preparation"
            element={
              <Header from="answer">
                <AnswerPreparation />
              </Header>
            }
          />
          <Route
            path="/answer-questions"
            element={
              <Header from="answer">
                <AnswerQuestions />
              </Header>
            }
          />
          <Route
            path="/answer-confirmation"
            element={
              <Header from="answer">
                <AnswerConfirmation />
              </Header>
            }
          />
          <Route path="/thanks" element={<Thanks />} />
          <Route
            path="/answer-list"
            element={
              <Header from="see">
                <AnswerList />
              </Header>
            }
          />
          <Route
            path="/answer-select"
            element={
              <Header from="see">
                <AnswerSelect />
              </Header>
            }
          />
          <Route
            path="/answer-search"
            element={
              <Header from="see">
                <AnswerSearch />
              </Header>
            }
          />
          <Route
            path="/answer-detail"
            element={
              <Header from="see">
                <AnswerDetail />
              </Header>
            }
          />
          <Route
            path="/upload-images"
            element={
              <Header from="create">
                <UploadImages />
              </Header>
            }
          />
          <Route
            path="/input-title"
            element={
              <Header from="create">
                <InputTitle />
              </Header>
            }
          />
          <Route
            path="/create-confirmation"
            element={
              <Header from="create">
                <CreateConfirmation />
              </Header>
            }
          />
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
