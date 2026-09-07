import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import X from '../assets/x.png'
import { MapPin,Mail,Phone, Instagram, Youtube } from 'lucide-react'
const Footer = () => {
  const { user, logout, loading } = useAuth();
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [

      { path: 'https://www.rightmarkz.com/', label: 'About Us' }
    ],
    services: [
      { path: '/postproperty', label: 'Post Your property' },
       { path: '/buy', label: 'Buy' },
      { path: '/rent', label: 'Rent' },
      {path: '/commercial', label: 'Commercial'},
      { /*path: '/lands', label: 'Plots/Lands' */},
      {/*path: '/Newlaunch', label: 'New Launch'*/}
    ],
    contact: [
      { label: 'Sharjah, UAE', icon:< MapPin/> },
      { label: 'Bangalore, India', icon: < MapPin/> },
      { label: 'info@rightmarkz.com', action:'mailto:info@rightmarkz.com', icon: <Mail /> },
      { label: '+91 88840 33338', action:'tel:+918884033338', icon: <Phone /> }
    ]
  }
  const authLinks=[
  {path:'/login',label:"Login"},
  {path:'/signup',label:'Resgister'}
  ]

  return (
    <footer className="footer-bg text-white">
      <div className="container-custom">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xl">RM</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gold">RightMarkz</h3>
                  <p className="text-sm text-gray-300 text-white">Empowering Growth</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                RightMarkz is a dynamic conglomerate transforming lives through innovation, 
                integrity, and teamwork across education, healthcare, retail, and real estate.
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/rightmarkz/" target="_blank" className="w-10 h-10 bg-gold rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors duration-300">
                  <Instagram />
                </a>
                <a href="https://www.linkedin.com/in/right-markz-00a2b03a4/" target="_blank" className="w-10 h-10 bg-gold rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors duration-300">
                  <span className="text-white text-sm font-bold">in</span>
                </a>
                <a href="https://www.youtube.com/@RightMarkz" target="_blank" className="w-10 h-10 bg-gold rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors duration-300">
                <Youtube />
                </a>
                <a href="https://x.com/rightmarkz" target="_blank" className="w-10 h-10 bg-gold rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors duration-300">
                  <img src={X} alt='x.com'/>
                </a>
              </div>
            </div>
            {/* Services */}
            {user ?(
            <div>
            <h4 className="font-accent font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
            {footerLinks.services.map((link, index) => (
              <li key={index}>
              <Link
              to={link.path}
              className="text-gray-300 hover:text-gold transition-colors duration-300 text-sm"
              >
              {link.label}
              </Link>
              </li>
            ))}
            </ul>
            </div>):(
              <div>
              <h4 className="font-accent font-semibold text-lg mb-6">Services</h4>
              <ul className="space-y-3">
              {authLinks.map((link, index) => (
                <li key={index}>
                <Link
                to={link.path}
                className="text-gray-300 hover:text-gold transition-colors duration-300 text-sm"
                >
                {link.label}
                </Link>
                </li>
              ))}
              </ul>
              </div>
            )}

            {/* Company Links */}
            <div>
              <h4 className="font-accent font-semibold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-gold transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>



            {/* Contact Info */}
            <div>
              <h4 className="font-accent font-semibold text-lg mb-6">Contact</h4>
              <ul className="space-y-3">
                {footerLinks.contact.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-gold text-lg">{item.icon}</span>
                    <a href={item.action} target="_blank" className="text-gray-300 text-sm">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} RightMarkz. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
