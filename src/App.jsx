import React from 'react'

import ThemeSelector from 'components/ThemeSelector'
import ContentManager from 'views/ContentManager'

const App = () => {
  return (
    <ThemeSelector>
      <ContentManager />
    </ThemeSelector>
  )
}

export default App
