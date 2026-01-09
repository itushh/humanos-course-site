import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Lander from './pages/Lander'
import Course from './pages/Course'
import Learn from './pages/Learn'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lander />} />
        <Route path='/course/:slug' element={<Course />} />
        <Route path='/learn/:slug' element={<Learn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
