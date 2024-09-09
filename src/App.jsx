import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/Home'
import GroupStage from './pages/GroupStage'
import GameDetails from './components/GameDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    < Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/group-stage' element={<GroupStage />} />
        <Route path='/games/:ID/details' element={<GameDetails />} />
      </Routes>
    </>
  )
}

export default App
