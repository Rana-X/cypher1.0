import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import TrainingAssignment from './components/TrainingAssignment'
import './styles/globals.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/training/assign/:employeeId" element={<TrainingAssignment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
