
import { Route, Routes } from 'react-router-dom'
import CharacterCounter from './Exercise1/components/CharacterCounter'
import Form from './Exercise2/components/Form'
import LazyModal from './Exercise3/pages/LazyModal'

function App() {

  return (
    <Routes>
      <Route path="/" element={<CharacterCounter />} />
      <Route path='/exercise2' element={<Form/>}/>
      <Route path='/exercise3' element={<LazyModal/>}/>
    </Routes>
  )
}

export default App
