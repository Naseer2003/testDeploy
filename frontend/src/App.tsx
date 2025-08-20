import { Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'

const App = () => {
  return (

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/home' element={<HomePage />}  />
        <Route path='/create' element={<CreatePage />} />
      </Routes>

  )
}

export default App