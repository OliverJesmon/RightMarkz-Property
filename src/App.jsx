import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop.jsx'
// import Services from './pages/Services'
// import Contact from './pages/Contact'
import Footer from './components/Footer'
import Buy from './pages/Buy'
import Newrent from './pages/Newrent'
import Commercial from './pages/Commercial'
import Lands from './pages/Lands'
import NewLaunch from './pages/Newlaunch'
import Login from './pages/Login'
import PostProperty from './pages/PostPropertyPage'
import Track from './pages/Track'
import ValidatePass from './pages/ValidatePass'
import View from './pages/View'
import Sign from './pages/Sign'
import Reset from './pages/RePassword.jsx'
import { AuthProvider } from './context/authContext';
import './App.css'
// import Community from './pages/Community.jsx'
// import Education from './pages/Education.jsx'
// import Retail from './pages/Retail.jsx'
// import RealEstate from './pages/RealEstate.jsx'
// import Teamwork from './pages/Teamwork.jsx'
// import Dental from './pages/Dental.jsx'

function App() {
  useEffect(() => {
    // Initialize scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }, observerOptions)

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>      
    <AuthProvider>
         <ScrollToTop />
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Sign />} />
          <Route path='/buy' element={<Buy />} />
          <Route path='/rent' element={<Newrent />} />
          <Route path='/commercial' element={<Commercial />} />
          {/*<Route path='/lands' element={<Lands />} />*/}
          <Route path='/Newlaunch' element={<NewLaunch />} />
          <Route path='/postproperty' element={<PostProperty />} />
          <Route path='/view/:pid' element={<View />} />
          <Route path='/track' element={<Track/>} />
          <Route path='/forgotpassword' element={<ValidatePass/>} />
          <Route path='/reset/:id' element={<Reset/>}/>
        </Routes>
      <Footer />
      </AuthProvider>

    </>
  )
}

export default App
