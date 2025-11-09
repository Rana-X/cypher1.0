import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import TrainingAssignment from './components/TrainingAssignment'
import './styles/globals.css'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/training/assign/:employeeId" element={<TrainingAssignment />} />
            <Route path="/bots/create" element={<TrainingAssignment />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
