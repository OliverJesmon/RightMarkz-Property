import React, { useEffect, useRef,useState } from 'react';
import { motion, useInView,AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight,ChevronDown, Home, Key, TrendingUp, Signpost, Mountain, Lightbulb, Building2,Search,MapPin, Mic } from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import p5 from 'p5';
import Typed from 'typed.js'
const quickCities = ['Bangalore', 'Chennai', 'Coimbatore', 'Faridabad', 'Ghaziabad', 'Gurgaon', 'Hyderabad', 'Indore'];

const propertyTypes = [
  'All Residential',
'Flat/Apartment',
'Residential Plot',
'House/Villa',
'Builder Floor',
'Farm House',
'Serviced Apartments',
];

const searchTabs = ['Buy', 'Rent', 'New Launch', 'Commercial', 'Plots/Land', 'Projects'];
const categories = [
  { icon: Home, label: 'Buying a Home', color: 'text-[#0078C8]', bg: 'bg-blue-50', path:'/buy'},
{ icon: Key, label: 'Renting a Home', color: 'text-[#0891B2]', bg: 'bg-cyan-50',path:'/rent' },
// { icon: TrendingUp, label: 'Invest in Real Estate', color: 'text-[#059669]', bg: 'bg-emerald-50' },
{ icon: Signpost, label: 'Sell/Rent your property', color: 'text-[#FF6B35]', bg: 'bg-orange-50' },
{ icon: Mountain, label: 'Plots/Land', color: 'text-[#78716C]', bg: 'bg-stone-50',path:'/lands' },

];

const banners = [
  { id: 1, image: '/images/banner-promo.jpg', alt: 'Luxury real estate project' },
{ id: 2, image: '/images/project-1.jpg', alt: 'Modern high-rise apartments' },
{ id: 3, image: '/images/project-2.jpg', alt: 'Premium residences' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};
const cities = [
  { name: 'Dharwad', image: '/images/city-delhi.jpg' },
{ name: 'Coimbatore', image: '/images/city-mumbai.jpg' },
{ name: 'Bangalore', image: '/images/city-bangalore.jpg' },
{ name: 'Kochi', image: '/images/city-hyderabad.jpg' },
{ name: 'Belgavi', image: '/images/city-pune.jpg' },
{ name: 'Mangaluru', image: '/images/city-chennai.jpg' },
];

const containVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cityVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut'},
  },
};

const Featuredprojects=()=>
{
  const projects = [
    {
      name: "The Oasis",
      img:'/images/project-1.jpg',
      location: "Dubai Marina",
      type: "Luxury Apartments",
      description: "Premium waterfront living with panoramic views of the Arabian Gulf. Featuring world-class amenities and contemporary design.",
      features: ["Infinity Pool", "Private Beach Access", "Smart Home Technology", "24/7 Concierge"],
      status: "Now Selling",
    },
    {
      name: "Green Meadows",
      img:'/images/project-2.jpg',
      location: "Kochi",
      type: "Eco-Friendly Villas",
      description: "Sustainable living spaces nestled in nature. Solar-powered homes with lush gardens and community spaces.",
      features: ["Solar Powered", "Rainwater Harvesting", "Organic Gardens", "Community Center"],
      status: "Phase 2 Open",
    },
    {
      name: "Business Hub",
      img:'/resources/medical-campus.jpg',
      location: "Downtown Dubai",
      type: "Commercial Spaces",
      description: "State-of-the-art commercial complex designed for the modern business. Prime location with excellent connectivity.",
      features: ["Grade A Offices", "Retail Spaces", "Conference Facilities", "Parking"],
      status: "Leasing Now",
    },
  ];
  return(
    <section className="py-24 lg:py-32 bg-secondary/50">
    <div className="container mx-auto px-6">
    <div className="text-center max-w-3xl mx-auto mb-16">
    <p className="text-accent font-body text-sm uppercase tracking-[0.2em] mb-4">
    Featured Projects
    </p>
    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
    Signature <span className="text-gradient-gold">Developments</span>
    </h2>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
    {projects.map((project, index) => (
      <div
      key={index}
      className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-hover transition-all duration-500 hover:-translate-y-2 group"
      >
      {/* Image Placeholder */}
      <div className={`h-48 relative`}>
      <div className="absolute z-20 top-4 right-4 bg-gold text-blue px-3 py-1 rounded-full">
      <span className="font-body text-xs font-semibold">{project.status}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
      <img src={project.img} className="mb-8"/>
      </div>
      </div>

      <div className="p-8">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
      <MapPin size={16} />
      <span className="font-body text-sm">{project.location}</span>
      </div>

      <h3 className="font-display text-2xl font-semibold text-foreground mb-1">
      {project.name}
      </h3>

      <p className="font-body text-accent text-sm mb-4">{project.type}</p>

      <p className="font-body text-muted-foreground mb-6">
      {project.description}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-6">
      {project.features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-gold rounded-full" />
        <span className="font-body text-xs text-muted-foreground">{feature}</span>
        </div>
      ))}
      </div>


      </div>
      </div>
    ))}
    </div>
    </div>
    </section>
  )
}


function ExploreCities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-16">
    <div className="max-w-[1280px] mx-auto px-4" ref={ref}>
    {/* Section Header */}
    <motion.h2
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="text-3xl md:text-[32px] font-bold text-[#1A1A2E] tracking-tight mb-8 text-center"
    >
    Find Better Places to Live, Work and Wonder...
    </motion.h2>

    {/* Two Column Subsections */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    {/* Buy Section */}
    <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
    className="flex flex-col"
    >
    <div className="rounded-xl overflow-hidden mb-4">
    <img
    src="/images/home-interior.jpg"
    alt="Buy a home"
    loading="lazy"
    className="w-full h-[220px] object-cover"
    />
    </div>
    <h3 className="text-xl font-semibold text-[#1A1A2E] mb-1.5">
    Find, Buy &amp; Own Your Dream Home
    </h3>
    <p className="text-sm text-[#5A5A6E]">
    Explore from Apartments, land, builder floors, villas and more
    </p>
    </motion.div>

    {/* Rent Section */}
    <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
    className="flex flex-col"
    >
    <div className="rounded-xl overflow-hidden mb-4">
    <img
    src="/images/rent-apartment.jpg"
    alt="Rent a home"
    loading="lazy"
    className="w-full h-[220px] object-cover"
    />
    </div>
    <h3 className="text-xl font-semibold text-[#1A1A2E] mb-1.5">
    Rent a Home
    </h3>
    <p className="text-sm text-[#5A5A6E]">
    Explore from Apartments, builder floors, villas and more
    </p>
    </motion.div>
    </div>

    {/* City Grid */}
    <motion.div
    variants={containerVariants}
    initial="hidden"
    animate={isInView ? 'visible' : 'hidden'}
    className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
    {cities.map((city) => (
      <motion.div
      key={city.name}
      variants={cityVariants}
      className="relative rounded-xl overflow-hidden  group h-[150px]"
      >
      <img
      src={city.image}
      alt={city.name}
      loading="lazy"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <span className="absolute bottom-3 left-4 text-white text-lg font-semibold">
      {city.name}
      </span>
      </motion.div>
    ))}
    </motion.div>
    </div>
    </section>
  );
}
function Banner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-85px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    setCurrent(index);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <section
    className="py-12"
    style={{ background: 'linear-gradient(135deg, #F0F4FF 0%, #FFF5F0 100%)' }}
    ref={ref}
    >
    <div className="max-w-[900px] mx-auto px-4 relative">
    <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={isInView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className="relative rounded-xl overflow-hidden shadow-lg"
    >
    {/* Banner Images */}
    <div className="relative h-[200px] md:h-[260px]">
    <AnimatePresence mode="wait">
    <motion.img
    key={banners[current].id}
    src={banners[current].image}
    alt={banners[current].alt}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 w-full h-full object-cover"
    />
    </AnimatePresence>
    </div>

    {/* Navigation Arrows */}
    <button
    onClick={prev}
    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-[#1A1A2E] transition-colors shadow-sm"
    >
    <ChevronLeft size={18} />
    </button>
    <button
    onClick={next}
    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-[#1A1A2E] transition-colors shadow-sm"
    >
    <ChevronRight size={18} />
    </button>

    {/* Pagination Dots */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
    {banners.map((_, index) => (
      <button
      key={index}
      onClick={() => goTo(index)}
      className={`w-2 h-2 rounded-full transition-all duration-300 ${
        current === index ? 'bg-white w-5' : 'bg-white/60'
      }`}
      />
    ))}
    </div>
    </motion.div>
    </div>
    </section>
  );
}

function Hero() {
  const navigate=useNavigate();
  const [activeSearchTab, setActiveSearchTab] = useState('Buy');
  const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState('All Residential');
  const [tabDropdownOpen, setTabDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const particleRef = useRef(null)

  const typedRef = useRef(null)
  useEffect(() => {
      const sketch = (p) => {
        let particles = []
        const numParticles = 50

        p.setup = () => {
          const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
          canvas.parent(particleRef.current)
          canvas.style('position', 'absolute')
          canvas.style('top', '0')
          canvas.style('left', '0')
          canvas.style('z-index', '1')
          canvas.style('pointer-events', 'none')

          // Create particles
          for (let i = 0; i < numParticles; i++) {
            particles.push({
              x: p.random(p.width),
                          y: p.random(p.height),
                          size: p.random(2, 6),
                          speedX: p.random(-0.5, 0.5),
                          speedY: p.random(-0.5, 0.5),
                          opacity: p.random(0.1, 0.3)
            })
          }
        }

        p.draw = () => {
          p.clear()

          // Update and draw particles
          particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX
            particle.y += particle.speedY

            // Wrap around edges
            if (particle.x > p.width) particle.x = 0
              if (particle.x < 0) particle.x = p.width
                if (particle.y > p.height) particle.y = 0
                  if (particle.y < 0) particle.y = p.height

                    // Draw particle
                    p.fill(212, 175, 55, particle.opacity * 255)
                    p.noStroke()
                    p.ellipse(particle.x, particle.y, particle.size)
          })

          // Draw connections
          particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
              const distance = p.dist(particle.x, particle.y, otherParticle.x, otherParticle.y)
              if (distance < 100) {
                const alpha = p.map(distance, 0, 100, 0.1, 0)
                p.stroke(212, 175, 55, alpha * 255)
                p.strokeWeight(1)
                p.line(particle.x, particle.y, otherParticle.x, otherParticle.y)
              }
            })
          })
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight)
        }
      }

      const particleInstance = new p5(sketch)

      return () => {

        particleInstance.remove()
        }
  }, [])
  useEffect(() => {
    // Initialize typewriter effect
    const typed = new Typed(typedRef.current, {
      strings: [
        'Bangalore',
        'Kochi',
        'Mangalore',
        'Mysore'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    })
    return () => {
      typed.destroy()
    }
  }, [])
  return (
    <section
    className="bg-[url('/src/assets/hero-corporate.png')] bg-no-repeat bg-cover relative min-h-[520px] flex flex-col items-center justify-center pt-16 overflow-hidden"
    >
    {/* Subtle pattern overlay */}
    <div
    ref={particleRef} className="absolute inset-0"

    />

    {/* Scrolling banner */}
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="w-full bg-white/10 backdrop-blur-sm py-2 mb-6 overflow-hidden"
    >
    <div className="flex items-center justify-center">
    <span className="text-white/90 text-xs font-medium tracking-wide">
    A NEW STANDARD OF LIVING &nbsp; #RightMarkz
    </span>
    </div>
    </motion.div>

    {/* Main content */}
    <div className="relative z-10 w-full max-w-[900px] mx-auto px-4 text-center">
    <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
    className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight"
    >
    Search. Buy. Live.
    </motion.h1>

    <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
    className="text-lg text-white/80 mb-8"
    >
    Find your perfect home from 15,00,000+ listings
    </motion.p>

    {/* Search Bar */}
    <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
    className="bg-white rounded-lg shadow-xl flex flex-col-2  justify-between overflow-visible"
    >
    {/* Tab Dropdown */}



    {/* Search Area */}
    <div
    className="flex-1 flex items-center self-start px-4 py-3.5 relative text-sm text-[#1A1A2E] min-h-[48px] cursor-pointer hover:bg-[#FAFBFC] transition-colors w-full active:bg-[#F5F7FA] touch-manipulation"
    onClick={() => {
      // Trigger your search modal or focus a real input here
    }}
    >
    <MapPin size={16} className="text-[#8B8BA3] mr-2 shrink-0" />
    <div className="font-body mr-2 mb-0.5 font-light truncate">Search</div>

    <span ref={typedRef} className="font-body mb-0.5 font-light truncate" />
    </div>

    {/* Search Button */}
    <button className="bg-gold hover:bg-navy text-white px-6 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors shrink-0 rounded-r-lg active:scale-[0.98] touch-manipulation md:min-h-[48px]"onClick={() => {navigate('/buy')}} >
    <Search size={18} />
    <span>Search</span>
    </button>
    </motion.div>

    {/* Quick City Pills */}
  {/*  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
    className="flex flex-wrap items-center justify-center gap-2 mt-5"
    >
    {quickCities.map((city) => (
      <button
      key={city}
      className="bg-gold text-white px-3 py-1.5 hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300
      shadow-lg hover:shadow-xl text-xs font-medium rounded-full"
      >
      {city}
      </button>
    ))}
    </motion.div> */}
    </div>

    {/* Bottom gradient fade */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent" />
    </section>
  );
}


const Homepage = () => {
  return (
    <>
    <Hero />

    <Featuredprojects />
    <ExploreCities />
    <Banner />

    </>
  );
}

export default Homepage;
