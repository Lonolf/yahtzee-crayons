import React from 'react'
import { styled } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { ReactComponent as One } from 'assets/dices/one.svg'
import { ReactComponent as Two } from 'assets/dices/two.svg'
import { ReactComponent as Three } from 'assets/dices/three.svg'
import { ReactComponent as Four } from 'assets/dices/four.svg'
import { ReactComponent as Five } from 'assets/dices/five.svg'
import { ReactComponent as Six } from 'assets/dices/six.svg'
import { ReactComponent as Random } from 'assets/dices/random.svg'

const DiceGraphicStyled = styled(Box)(({ fixed = false, theme }) => {
  const color = theme.palette[fixed ? 'primary' : 'secondary'].main
  return ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `${fixed ? '2' : '0'}px solid ${color}`,
    borderRadius: 5,
    flex: '1 1 25px',
    color,
    margin: '0px 2px',
  })
})

const DiceGraphic = (props = {}) => (
  <DiceGraphicStyled {...props}>
    {props.value === 1 ? <One />
      : props.value === 2 ? <Two />
        : props.value === 3 ? <Three />
          : props.value === 4 ? <Four />
            : props.value === 5 ? <Five />
              : props.value === 6 ? <Six />
                : <Random />}
  </DiceGraphicStyled>
)

export default DiceGraphic
