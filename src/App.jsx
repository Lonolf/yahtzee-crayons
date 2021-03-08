import React from 'react'

import ThemeSelector from 'components/ThemeSelector'
import ContentManager from 'views/ContentManager'
import LoadingBar from 'components/LoadingBar'
import ErrorBar from 'components/ErrorBar'
import { useAutoLogin } from 'hooks/userHooks'

const App = () => {
  const autoLogin = useAutoLogin()

  React.useEffect(() => { autoLogin() }, [])

  return (
    <ThemeSelector>
      <ContentManager />
      <LoadingBar />
      <ErrorBar />
    </ThemeSelector>
  )
}

export default App
