import './App.css'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import AdminPage from './pages/adminpage'
import RegisterPage from './pages/register'
import ForgetPasswordPage from './pages/forgetPassword'
import TestPage from './pages/testPage'

import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {


  return (
    <GoogleOAuthProvider clientId="1033564119689-va316rn8puf27vikpjmcl1v09qptfapl.apps.googleusercontent.com">
      <BrowserRouter>
        <div> 
          <Toaster position="top-right"/>
          <Routes path="/*">
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> 
            <Route path="/forget" element={<ForgetPasswordPage/>}/>
            <Route path="/test" element={<TestPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/*" element={<HomePage />} />
          </Routes>  
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
