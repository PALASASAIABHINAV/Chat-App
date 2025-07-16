import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import HomePage from './pages/HomePage'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
  const location = useLocation();
  useEffect(()=>{
     checkAuth();
  },[checkAuth])

  if(isCheckingAuth&&!authUser){
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <span className="text-2xl font-semibold animate-pulse">...
        </span>
      </div>
    );
  }

  // Hide Navbar on login and signup routes
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      {!hideNavbar && <Navbar/>}
      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to='/login' />}/> 
        <Route path='/signup' element={!authUser?<SignUp/>:<Navigate to='/'/>}/>
        <Route path='/login' element={!authUser?<Login/>:<Navigate to='/'/>} />
        <Route path='/setting' element={<Settings/>} />
        <Route path='/profile' element={authUser?<Profile/>:<Navigate to='/login'/>} />
      </Routes>
    </div>
  )
}

export default App
