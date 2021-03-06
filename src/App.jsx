import React from 'react'

import ThemeSelector from 'components/ThemeSelector'
import ContentManager from 'views/ContentManager'
import { useAutoLogin } from 'hooks/userHooks'

const App = () => {
  const autoLogin = useAutoLogin()

  React.useEffect(() => { autoLogin() }, [])

  return (
    <ThemeSelector>
      <ContentManager />
    </ThemeSelector>
  )
}

export default App
