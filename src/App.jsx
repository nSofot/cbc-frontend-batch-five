import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import AdminPage from './pages/adminpage'


function App() {


  return (
    <BrowserRouter>
      <div> 
        <Header/>
        <Routes path="/*">
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} /> 
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>  
      </div>
    </BrowserRouter>
  )
}

export default App
