import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Lander from './pages/Lander'
import Course from './pages/Course'
import Learn from './pages/Learn'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Auth from './pages/Auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lander />} />
        <Route path='/course/:slug' element={<Course />} />
        <Route path='/learn/:slug' element={<Learn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
