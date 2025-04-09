import React from 'react'
import {Routes, Route} from 'react-router'
import NoteUI from './components/pages/NoteUI'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import ProtectedRoute from './middleware/ProtectedRoute'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/note"
          element={
            <ProtectedRoute>
              <NoteUI />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
