import './App.css'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import AdminPage from './pages/adminpage'
import RegisterPage from './pages/register'

import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {


  return (
    <BrowserRouter>
      <div> 
        <Toaster position="top-right"/>
        <Routes path="/*">
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          {/* <Route path="/testing" element={<TestPage />} /> */}
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>  
      </div>
    </BrowserRouter>
  )
}

export default App
