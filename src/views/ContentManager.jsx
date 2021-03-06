import React from 'react'

import { Container } from '@material-ui/core'

import MainMenu from 'views/MainMenu'
import ScoreCard from 'views/ScoreCard'
import Login from 'views/Login'
import Victory from 'views/Victory'

import { useSelector } from 'react-redux'

const ContentManager = () => {
  const { user, game } = useSelector(state => state)
  return (
    <Container maxWidth='sm'>
      {user.userId == null
        ? <Login />
        : game.gameId == null
          ? <MainMenu />
          : game.status !== 'finished'
            ? <ScoreCard />
            : <Victory />}
    </Container>
  )
}

export default ContentManager
