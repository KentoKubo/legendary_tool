import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Paper, Grid, Box, InputBase, ImageList, ImageListItem, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Image from 'mui-image'
import { useModal } from 'react-hooks-use-modal'

import Text from '../../components/Text'
import FlatButton from '../../components/FlatButton'

import pic1 from '../../images/pic1.png'
import pic2 from '../../images/pic2.png'
import pic3 from '../../images/pic3.png'
import pic4 from '../../images/pic4.png'
import pic5 from '../../images/pic5.png'
import pic6 from '../../images/pic6.png'

const SearchQuestions = () => {
  const questions = [
    {
      question_id: 'id1',
      title: 'なんらかの知的生命体あああああ',
      pictures: [
        { picture_id: 'pic1-1', picture: pic1 },
        { picture_id: 'pic1-2', picture: pic2 },
        { picture_id: 'pic1-3', picture: pic3 },
        { picture_id: 'pic1-4', picture: pic4 },
        { picture_id: 'pic1-5', picture: pic5 },
        { picture_id: 'pic1-6', picture: pic6 },
      ],
      creator_name: 'やふう　たろう',
    },
    {
      question_id: 'id2',
      title: 'title2',
      pictures: [
        { picture_id: 'pic1-1', picture: pic1 },
        { picture_id: 'pic1-2', picture: pic2 },
        { picture_id: 'pic1-3', picture: pic3 },
        { picture_id: 'pic1-4', picture: pic4 },
        { picture_id: 'pic1-5', picture: pic5 },
        { picture_id: 'pic1-6', picture: pic6 },
      ],
      creator_name: 'creator2',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic1-1', picture: pic1 },
        { picture_id: 'pic1-2', picture: pic2 },
        { picture_id: 'pic1-3', picture: pic3 },
        { picture_id: 'pic1-4', picture: pic4 },
        { picture_id: 'pic1-5', picture: pic5 },
        { picture_id: 'pic1-6', picture: pic6 },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id4',
      title: 'title4',
      pictures: [
        { picture_id: 'pic1-1', picture: pic1 },
        { picture_id: 'pic1-2', picture: pic2 },
        { picture_id: 'pic1-3', picture: pic3 },
        { picture_id: 'pic1-4', picture: pic4 },
        { picture_id: 'pic1-5', picture: pic5 },
        { picture_id: 'pic1-6', picture: pic6 },
      ],
      creator_name: 'creator4',
    },
    {
      question_id: 'id5',
      title: 'title5',
      pictures: [
        { picture_id: 'pic1-1', picture: pic1 },
        { picture_id: 'pic1-2', picture: pic2 },
        { picture_id: 'pic1-3', picture: pic3 },
        { picture_id: 'pic1-4', picture: pic4 },
        { picture_id: 'pic1-5', picture: pic5 },
        { picture_id: 'pic1-6', picture: pic6 },
      ],
      creator_name: 'creator5',
    },
    {
      question_id: 'id6',
      title: 'title6',
      pictures: [
        { picture_id: 'pic1-1', picture: pic1 },
        { picture_id: 'pic1-2', picture: pic2 },
        { picture_id: 'pic1-3', picture: pic3 },
        { picture_id: 'pic1-4', picture: pic4 },
        { picture_id: 'pic1-5', picture: pic5 },
        { picture_id: 'pic1-6', picture: pic6 },
      ],
      creator_name: 'creator6',
    },
    {
      question_id: 'id7',
      title: 'title7',
      pictures: [
        { picture_id: 'pic1-1', picture: pic1 },
        { picture_id: 'pic1-2', picture: pic2 },
        { picture_id: 'pic1-3', picture: pic3 },
        { picture_id: 'pic1-4', picture: pic4 },
        { picture_id: 'pic1-5', picture: pic5 },
        { picture_id: 'pic1-6', picture: pic6 },
      ],
      creator_name: 'creator8',
    },
  ]

  const [question, setQuestion] = useState()
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState('')
  const [selectedQuestion, setSelectedQuestion] = useState()
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
  })

  const modalStyle = {
    backgroundColor: '#fff',
    width: '60vw',
    height: '75vh',
    borderRadius: '10px',
  }

  const navigate = useNavigate()
  const location = useLocation()

  const { from } = location.state

  console.log(question)

  useEffect(() => {
    const getQuestions = () => {
      const result = async () => {
        await axios.get('/questions')
      }
      setQuestion(result.data)
    }
    getQuestions()
  }, [])

  const searchQuestionByTitle = () => {
    console.log('searching')
    const getQuestions = () => {
      const res = async () => {
        await axios.get('/questions', { param: { title } })
      }
      setQuestion(res.data)
    }
    getQuestions()
  }

  const onChangeTitle = useCallback(
    (event) => {
      setTitle(event.target.value)
    },
    [setTitle]
  )

  const clickQuestionTile = (qustionItem) => {
    setSelectedQuestion(qustionItem)
    open()
  }

  const moveToInputName = (questionItem, _from) => {
    if (_from === 'answer') navigate('/input-answerer-name', { state: { questionItem, from: _from } })
    if (_from === 'see') navigate('/answer-detail', { state: { questionItem } })
  }

  return (
    <Box sx={{ width: '60%', margin: '0 auto', textAlign: 'center', paddingTop: '120px' }}>
      <Box sx={{ marginBottom: '24px' }}>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            px: 4,
            py: 2,
            alignItems: 'center',
            border: '2px solid #545454',
            borderRadius: '100vh',
          }}
        >
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="テーマやキーワードで検索"
            value={title}
            onChange={onChangeTitle}
            onKeyPress={(event) => {
              if (event.key === 'Enter') searchQuestionByTitle()
            }}
          />
        </Paper>
      </Box>
      <Grid container justifyContent="space-between" flexWrap="wrap" sx={{ height: '70vh', overflow: 'auto' }}>
        {questions.map((item) => (
          <Grid
            item
            xs={5}
            m={3}
            sx={{
              border: '2px solid #545454',
              borderRadius: '4px',
              background: '#fff',
              cursor: 'pointer',
              a: { textDecoration: 'none', color: '#545454' },
            }}
            key={item.question_id}
            onClick={() => clickQuestionTile(item)}
          >
            {/* <Link to="/input-answerer-name" state={{ questionItem: item }}> */}
            <Box p={2} sx={{ borderBottom: '2px solid #545454' }}>
              <ImageList
                cols={3}
                gap={0}
                sx={{
                  borderRadius: '4px',
                  width: '100%',
                  backgroundColor: '#fff',
                  '::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {item.pictures.map((p) => (
                  <ImageListItem key={p.picture_id} sx={{ margin: '0 0 -1px -1px' }}>
                    <Image src={p.picture} style={{ width: '100%', margin: 'auto' }} />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
            <Box p={2}>
              <Text text="テーマ :" style={{ color: '#545454', fontSize: 'small', lineHeight: '2em' }} align="left" />
              <Text
                text={item.title}
                style={{ color: '#545454', fontSize: 'x-large', lineHeight: '2em' }}
                align="left"
              />
              <Text
                text={`作成者 : ${item.creator_name}`}
                style={{ color: '#545454', fontSize: 'small' }}
                align="left"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      {isOpen && (
        <Modal>
          <Box sx={modalStyle}>
            <Box
              sx={{
                display: 'flex',
                p: 5,
                height: '100%',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  mx: 4,
                  border: '2px solid #545454',
                  borderRadius: '4px',
                  background: '#fff',
                }}
              >
                <Box p={2} sx={{ borderBottom: '2px solid #545454' }}>
                  <ImageList
                    cols={3}
                    gap={0}
                    sx={{
                      borderRadius: '4px',
                      width: '100%',
                      backgroundColor: '#fff',
                      '::-webkit-scrollbar': { display: 'none' },
                    }}
                  >
                    {selectedQuestion.pictures.map((p) => (
                      <ImageListItem key={p.picture_id} sx={{ margin: '0 0 -1px -1px' }}>
                        <Image src={p.picture} style={{ width: '100%', margin: 'auto' }} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
                <Box p={2}>
                  <Text
                    text="テーマ :"
                    style={{ color: '#545454', fontSize: 'small', lineHeight: '2em' }}
                    align="left"
                  />
                  <Text
                    text={selectedQuestion.title}
                    style={{ color: '#545454', fontSize: 'x-large', lineHeight: '2em' }}
                    align="left"
                  />
                  <Text
                    text={`作成者 : ${selectedQuestion.creator_name}`}
                    style={{ color: '#545454', fontSize: 'small' }}
                    align="left"
                  />
                </Box>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Text text="この問題であそびますか？" sx={{ color: '#545454' }} />
                <FlatButton text="はい！" onClick={() => moveToInputName(selectedQuestion, from)} />
                <FlatButton text="選びなおす！" onClick={close} variant="white" />
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  )
}

export default SearchQuestions
