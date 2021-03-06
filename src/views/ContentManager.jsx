import React from 'react'

import { Container } from '@material-ui/core'

import MainMenu from 'views/MainMenu'
import ScoreCard from 'views/ScoreCard'
import Victory from 'views/Victory'

import { useSelector } from 'react-redux'

const ContentManager = () => {
  const { game } = useSelector(state => state)
  return (
    <Container maxWidth='sm'>
      {game.gameId == null
        ? <MainMenu />
        : game.status !== 'finished'
          ? <ScoreCard />
          : <Victory />}
    </Container>
  )
}

export default ContentManager
