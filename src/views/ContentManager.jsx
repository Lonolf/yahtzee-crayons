import React from 'react'

import { Container } from '@material-ui/core'

import MainMenu from 'views/MainMenu'
import MenuBar from 'views/MenuBar'
import ScoreCard from 'views/ScoreCard'
import Login from 'views/Login'
import Victory from 'views/Victory'

import { Route } from 'react-router-dom'

import { useSelector } from 'react-redux'

const ContentManager = () => {
  const { user } = useSelector(state => state)
  return (
    <Container maxWidth='sm'>
      {user.userId == null
        ? <Login />
        : (
          <>
            <Route path='/game/:playerId?'><MenuBar /></Route>
            <Route exact path='/'><MainMenu /></Route>
            <Route path='/game/:playerId?'><ScoreCard /></Route>
            <Route path='/victory'><Victory /></Route>
          </>
          )}
    </Container>
  )
}

export default ContentManager
