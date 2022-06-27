import React from 'react'

import Text from './Text'

const Card = (props) => {
  const { title, imgs, name } = props
  const catName = (nameString) => `作成者：${nameString}`

  return (
    <div
        sx={{
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            margin: 'auto',
            width: '50%',
            border: '1px solid #000000',
        }}
    >
        <div>
            {imgs.map(img => (
            <Text text={img.img} />
            ))} 
        </div> 
        <div
            sx={{borderTop: "1px solid #000000"}}
        >
            <Text text="テーマ：" style={{textAlign:'left', fontSize: '10px'}}/>
            <Text text={title} style={{fontSize: '30px'}}/>
            <Text text={catName(name)} style={{textAlign:'left', fontSize: '10px'}}/>
        </div>
    </div>
  )
}

export default Card
