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
      
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isFixed ? "opacity-100" : "opacity-100"
      }`}
      >
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-1">
      <div
      className={`
      mx-auto
      max-w-[1112px]
      h-[56px]
      rounded-[17px]

      border border-white/[0.04]
      shadow-[0_8px_30px_rgba(0,0,0,0.35)]
      px-5 sm:px-6 ${
        isFixed ? "bg-transparent backdrop-blur-2xl" : "bg-[#0d1117]"
      }
      `}
      >
      <div className="h-full flex items-center justify-between">

      {/* Logo */}
      <Link
      to="/"
      className="flex items-center gap-2.5 shrink-0 group"
      >
      {/* Aero-style logo mark */}
      <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center">
      <span className="text-white font-display font-bold text-xl">RM</span>
      </div>

      <span
      className="
      text-white
      text-[15px]
      font-semibold
      tracking-[-0.02em]
      "
      >
      RightMarkz
      </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-7 lg:gap-8 ml-10">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
          key={item.path}
          to={item.path}
          className={`
            relative
            text-[13px]
            font-medium
            tracking-[-0.01em]
            transition-colors
            duration-200
            whitespace-nowrap
            ${
              isActive
              ? "text-white"
              : "text-gold hover:text-[#8d949e]"
            }
            `}
            >
            {item.label}

            {/* Active underline */}
            <span
            className={`
              absolute
              -bottom-[7px]
              left-0
              h-[1px]
              bg-white
              transition-all
              duration-200
              ${
                isActive
                ? "w-full opacity-100"
                : "w-0 opacity-0 group-hover:w-full"
              }
              `}
              />
              </Link>
        );
      })}
      </nav>

      {/* Right side */}
      <div className="hidden md:flex items-center gap-3 ml-auto">

      {/* User */}
      {user ? (
        <Menu as="div" className="relative">
        <MenuButton
        className={`
        flex items-center justify-center
        w-9 h-9
        rounded-full
        MenuButton
        transition-all duration-200
        ${isFixed ? "text-white" : "text-black"}
        `}
        >
        <UserPlus className="w-[17px] h-[17px]" />
        </MenuButton>


        <MenuItems
        transition
        className="
        absolute right-0 mt-2
        w-56
        origin-top-right
        rounded-xl
        bg-[#151a21]
        border border-white/[0.06]
        shadow-2xl
        outline-none
        overflow-hidden
        transition
        data-closed:scale-95
        data-closed:opacity-0
        data-enter:duration-100
        data-leave:duration-75
        "
        >
        <div className="py-1">
        <MenuItem>
        <span
        className="
        block px-4 py-3
        text-sm
        text-[#9da4ae]
        border-b border-white/[0.05]
        "
        >
        Hello {user.name}
        </span>
        </MenuItem>

        {pid.length != 0 && (
          <MenuItem>
          <Link to="/track">
          <button
          type="button"
          className="
          block w-full
          px-4 py-2.5
          text-left text-sm
          text-[#b6bcc5]
          hover:text-white
          hover:bg-white/[0.05]
          transition-colors
          "
          >
          Listed Properties
          </button>
          </Link>
          </MenuItem>
        )}

        <MenuItem>
        <button
        type="button"
        onClick={logout}
        className="
        block w-full
        px-4 py-2.5
        text-left text-sm
        text-[#b6bcc5]
        hover:text-white
        hover:bg-white/[0.05]
        transition-colors
        "
        >
        Logout
        </button>
        </MenuItem>
        </div>
        </MenuItems>
        </Menu>
      ) : (
        <Menu as="div" className="relative">
        <MenuButton
        className="
        flex items-center justify-center
        w-9 h-9
        rounded-full
        text-[#a5abb4]
        hover:text-white
        hover:bg-white/[0.06]
        transition-all duration-200
        "
        >
        <UserPlus className="w-[17px] h-[17px]" />
        </MenuButton>

        <MenuItems
        transition
        className="
        absolute right-0 mt-2
        w-44
        origin-top-right
        rounded-xl
        bg-[#151a21]
        border border-white/[0.06]
        shadow-2xl
        outline-none
        overflow-hidden
        transition
        data-closed:scale-95
        data-closed:opacity-0
        "
        >
        <div className="p-1.5">
        <MenuItem>
        <Link
        to="/login"
        className="
        block px-3 py-2.5
        rounded-lg
        text-sm text-[#b6bcc5]
        hover:text-white
        hover:bg-white/[0.05]
        "
        >
        Login
        </Link>
        </MenuItem>

        <MenuItem>
        <Link
        to="/signup"
        className="
        block px-3 py-2.5
        rounded-lg
        text-sm text-[#b6bcc5]
        hover:text-white
        hover:bg-white/[0.05]
        "
        >
        Sign Up
        </Link>
        </MenuItem>
        </div>
        </MenuItems>
        </Menu>
      )}

      {/* CTA */}
      {user && (
        <Link
        to="/postproperty"
        className="
        h-9
        px-4
        rounded-full
        bg-white
        text-[#171b21]
        flex items-center
        text-[13px]
        font-semibold
        whitespace-nowrap
        transition-all
        duration-200
        hover:bg-[#e8eaed]
        hover:scale-[1.02]
        active:scale-[0.98]
        "
        >
        Post property
        </Link>
      )}

      {/* If you want the exact reference CTA instead */}
      {/*
        <a
        href="https://rmattend.lovable.app/"
        className="
        h-9 px-5 rounded-full bg-white
        text-[#171b21] text-[13px] font-semibold
        flex items-center gap-2
        hover:bg-[#e8eaed] transition-all
        "
        >
        Open Webapp
        <span className="text-base">↗</span>
        </a>
        */}
        </div>

        {/* Mobile Menu Button */}
        <button
        className="
        md:hidden
        flex items-center justify-center
        w-9 h-9
        rounded-full
        text-[#a5abb4]
        hover:text-white
        hover:bg-white/[0.06]
        "
        onClick={() =>
          setIsMobileMenuOpen(!isMobileMenuOpen)
        }
        >
        <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        >
        {isMobileMenuOpen ? (
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M6 6l12 12M18 6L6 18"
          />
        ) : (
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4 6h16M4 12h16M4 18h16"
          />
        )}
        </svg>
        </button>
        </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
          className="
          md:hidden
          mx-auto
          max-w-[1112px]
          mt-2
          rounded-2xl
          bg-navy
          border border-navy
          shadow-2xl
          overflow-hidden
          "
          >
          <nav className="p-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                block
                px-4 py-3
                rounded-xl
                text-sm
                font-medium
                transition-colors
                ${
                  isActive
                  ? "text-white bg-white/[0.06]"
                  : "text-[#8d949e] hover:text-white hover:bg-white/[0.04]"
                }
                `}
                >
                {item.label}
                </Link>
            );
          })}

          {user ? (<>
            <Link
            to="/postproperty"
            onClick={() => setIsMobileMenuOpen(false)}
            className="
            mt-2
            block
            px-4 py-3
            rounded-xl
            bg-white
            text-[#171b21]
            text-sm
            font-semibold
            text-center
            "
            >
            Post property
            </Link>

            {/* <span
            className="
            px-4 py-3
            text-sm
            text-[#9da4ae]

            "
            >
            Hello {user.name}
            </span> */}


            {pid.length != 0 && (

              <Link to="/track">
              <button
              type="button"
              className="
              mt-2
              block
              px-4 py-3
              rounded-xl
              bg-white
              text-[#171b21]
              text-sm
              font-semibold
              text-center
              "
              >
              Listed Properties
              </button>
              </Link>

            )}


            <button
            type="button"
            onClick={logout}
            className="
            mt-2
            block
            px-4 py-3
            rounded-xl
            bg-white
            text-[#171b21]
            text-sm
            font-semibold
            text-center
            "
            >
            Logout
            </button>
            </>
          ):(
            <>
            <Link
            to="/login"
            className="
            mt-2
            block
            px-4 py-3
            rounded-xl
            bg-white
            text-[#171b21]
            text-sm
            font-semibold
            text-center
            "
            >
            Login
            </Link>

            <Link
            to="/signup"
            className="
            mt-2
            block
            px-4 py-3
            rounded-xl
            bg-white
            text-[#171b21]
            text-sm
            font-semibold
            text-center
            "
            >
            Sign Up
            </Link>
            </>
          )}
          </nav>
          </div>
        )}
        </div>
        </header>

    </>
  )
}

export default Header
