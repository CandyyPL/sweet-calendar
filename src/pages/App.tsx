import { AppWrapper } from '@/pages/App.styles'
import { FC } from 'react'
import Calendar from '@/components/Calendar/Calendar'

const App: FC = () => {
  return (
    <AppWrapper>
      <Calendar />
    </AppWrapper>
  )
}

export default App
