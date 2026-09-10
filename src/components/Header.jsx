import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { UserPlus } from 'lucide-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const { user,pid, logout, loading} = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/buy', label: 'Buy' },
    { path: '/rent', label: 'Rent' },
    {path: '/commercial', label: 'Commercial'},
    { /*path: '/lands', label: 'Plots/Lands' */},
    {/*path: '/Newlaunch', label: 'New Launch'*/}

  ]

  // Only use fixed positioning when scrolled
  const isFixed = isScrolled

  return (
    <>
      {/* Spacer to maintain layout when navbar becomes fixed */}
      {isFixed && <div className="h-20"></div>}
      
      <header className={`${
        isFixed 
          ? 'fixed top-0 left-0 right-0 z-50 nav-blur shadow-lg' 
          : 'relative bg-transparent'
      } transition-all duration-300`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">RM</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-gold">RightMarkz</h1>
                <p className={`${isFixed? 'text-white':'text-navy'} text-xs font-accent`}>Property Portal</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 ">

              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${isFixed? 'text-white':'text-navy'} font-accent font-medium text-sm  uppercase tracking-wide transition-all duration-300 relative group ${
                    location.pathname === item.path
                      ? 'text-gold'
                      : 'text-navy hover:text-gold'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gold transform transition-transform duration-300 ${
                    location.pathname === item.path
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ))}
             {user ? (
              <Link
              to="/postproperty"
              className="flex items-center gap-2 px-4 py-2 bg-gold text-white text-sm font-medium rounded-lg hover:bg-yellow-300 transition-colors"
              >
              <span>Post property</span>

              </Link>

            ):(<></>)}


            </nav>

            {user ? (<Menu as="div" className="relative inline-block">
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-gold inset-ring-1 inset-ring-white/5 hover:bg-white/20">
              <UserPlus />
              </MenuButton>

              <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
              <div className="py-1">

              <MenuItem>
              <span
              className="block w-full px-4 py-2 text-left text-sm text-gold data-[focus]:bg-navy"
              >Hello {user.name}</span>
              </MenuItem>
              {(pid.length === 0) ?(<MenuItem>
              <Link to='/track'>
              <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gold data-[focus]:bg-navy"
              >
              Listed Properties


              </button>
              </Link>

              </MenuItem>):(<></>)}
              <MenuItem>
              <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gold data-[focus]:bg-navy"
              onClick={logout}
              >

              Logout

              </button>

              </MenuItem>
              </div>
              </MenuItems>
              </Menu>):( <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-gold inset-ring-1 inset-ring-white/5 hover:bg-white/20">
            <UserPlus />
            </MenuButton>

            <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
            <div className="py-1">
            <MenuItem>
            <Link to='/login'>
            <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm text-gold data-[focus]:bg-navy"
            >
            Login
            </button>
            </Link>
            </MenuItem>
            <MenuItem>
            <Link to='/signup'>
            <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm text-gold data-[focus]:bg-navy"

            >
            Sign Up

            </button>
            </Link>
            </MenuItem>
            </div>
            </MenuItems>
            </Menu>)}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-navy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
               
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            
            <div className="md:hidden bg-white border-t border-gray-200">
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 font-accent font-medium text-sm uppercase tracking-wide transition-colors duration-300 ${
                      location.pathname === item.path
                        ? 'text-gold bg-gold bg-opacity-10'
                        : 'text-navy hover:text-gold hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {user ? (
                  <Link
                  to="/postproperty"
                  className="flex items-center gap-2 px-4 py-2 bg-gold text-white text-sm font-medium rounded-lg hover:bg-yellow-300 transition-colors"
                  >
                  <span>Post property</span>

                  </Link>

                ):(<></>)}
                <a href="https://rmattend.lovable.app/" className={`block px-4 py-2 font-accent font-medium text-sm uppercase tracking-wide transition-colors duration-300 text-navy hover:text-gold hover:bg-gray-50`}>

                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
