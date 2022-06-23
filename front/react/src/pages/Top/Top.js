import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'
import './Top.css'

const Top = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>ミリしらプラットフォーム</p>
      <Link to="/select-person"> Select Person </Link>
      <Link to="/question-list"> Question List </Link>
      <Link to="/answer-list"> Answer List </Link>
    </header>
  </div>
)

export default Top
