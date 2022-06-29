import React from 'react'
import { useNavigate, useLocation  } from 'react-router-dom'

import FlatButton from '../../components/FlatButton'
import Text from '../../components/Text'
import style from './AnswerSelect.module.scss'

const AnswerSelect = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const catName = (name) => `作成者：${name}`

  const clickBackButton = () => {
    navigate('/answer-search')
  }
  const clickMenuButton = () => {
    navigate('/')
  }

  const clickYesButton = (title, imgs, name) => {
    navigate('/answer-detail', {state: {title, imgs, name}})
  }

  return (
    <div className={style.container}>
      <button type="button" className={style.menuButton} onClick={clickMenuButton} variant="outlined" >みりしら</button>
      <div className={style.bodyContent}>
        <div className={style.cards} >
          <div className={style.personImage}>
            {location.state.imgs.map(img => (
              <Text text={img.img} />
            ))} 
          </div> 
          <div className={style.card_info}>
            <Text text="テーマ：" style={{textAlign:'left', fontSize: '10px'}}/>
            <Text text={location.state.title} style={{fontSize: '30px'}}/>
            <Text text={catName(location.state.name)} style={{textAlign:'left', fontSize: '10px'}}/>
          </div>
        </div>
        <div className={style.buttons}>
          <Text text="この問題であそびますか？"/>
          <FlatButton text="はい！" onClick={() => clickYesButton(location.state.title, location.state.imgs, location.state.name)} variant="outlined" />
          <FlatButton text="選びなおす！" className={style.backButton} onClick={clickBackButton} variant="white" />
        </div>
      </div>
    </div>
  )
}

export default AnswerSelect
