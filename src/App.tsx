
import { Route, Routes } from 'react-router-dom'
import CharacterCounter from './Exercise1/components/CharacterCounter'
import Form from './Exercise2/components/Form'

function App() {

  return (
    <Routes>
      <Route path="/" element={<CharacterCounter />} />
      <Route path='/exercise2' element={<Form/>}/>
    </Routes>
  )
}

export default App
