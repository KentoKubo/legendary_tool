import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Paper, Grid, Box, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import Text from '../../components/Text'

const SearchQuestions = () => {
  const questions = [
    {
      question_id: 'id1',
      title: 'title1',
      pictures: [
        { picture_id: 'pic1-1', picture: 'pic1-1' },
        { picture_id: 'pic1-2', picture: 'pic1-2' },
        { picture_id: 'pic1-3', picture: 'pic1-3' },
        { picture_id: 'pic1-4', picture: 'pic1-4' },
        { picture_id: 'pic1-5', picture: 'pic1-5' },
        { picture_id: 'pic1-6', picture: 'pic1-6' },
      ],
      creator_name: 'creator1',
    },
    {
      question_id: 'id2',
      title: 'title2',
      pictures: [
        { picture_id: 'pic2-1', picture: 'pic2-1' },
        { picture_id: 'pic2-2', picture: 'pic2-2' },
      ],
      creator_name: 'creator2',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
    {
      question_id: 'id3',
      title: 'title3',
      pictures: [
        { picture_id: 'pic3-1', picture: 'pic3-1' },
        { picture_id: 'pic3-2', picture: 'pic3-2' },
      ],
      creator_name: 'creator3',
    },
  ]

  const [question, setQuestion] = useState()

  useEffect(() => {
    const getQuestions = () => {
      const result = async () => {
        await axios.get('/questions', {
          params: {
            name: 'title',
          },
        })
      }
      setQuestion(result.data)
    }
    getQuestions()
  })

  console.log(question)

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
          <SearchIcon />
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="テーマやキーワードで検索" />
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
              a: { textDecoration: 'none', color: '#545454' },
            }}
            key={item.question_id}
          >
            <Link to="/input-answerer-name" state={{ questionItem: item }}>
              <Box p={2} sx={{ borderBottom: '2px solid #545454' }}>
                {item.pictures[0].picture}
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
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SearchQuestions
