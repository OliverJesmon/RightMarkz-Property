import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { properties } from '../property/Properties.jsx';
const PropertyDetails = () => {
    const { pid } = useParams();
    const [allProperties, setAllProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await properties();
  // your async function
                if (isMounted) {
                    setAllProperties(data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to load properties');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        // Cleanup: prevent setting state on unmounted component
        return () => { isMounted = false; };
    }, []); // Empty dependency array = run once on mount
    const propty=allProperties.find(p => p._id === pid);
    const [property, setProperty] = useState([]);

    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Form state for inquiry
    const [inquiryForm, setInquiryForm] = useState({
        name: '',
        phone: '',
        message: `Hi, I am interested in your property at ${property?.locality}, ${property?.city}. Please share more details.`
    });

    useEffect(() => {
        // TODO: Replace this mock data with your actual API call:
        // const fetchProperty = async () => {
        //   const res = await fetch(`/api/properties/${id}`);
        //   const data = await res.json();
        //   setProperty(data.data);
        //   setLoading(false);
        // };
        // fetchProperty();

        // Mock data based exactly on your provided JSON structure
        const mockProperty = {
            listingType: "rent",
            propertyType: "residential",
            residentialSubType: "apartment",
            bedrooms: 2,
            bathrooms: 2,
            balconies: 2,
            superArea: 1200,
            carpetArea: 950,
            totalFloors: 15,
            propertyFloor: 5,
            propertyName: "Greenfield",
            city: "Bengaluru",
            locality: "Indiranagar",
            coordinates: {
                type: "Point",
                coordinates: [77.64081001281738, 12.974951201832406]
            },
            landmark: "Near Metro Station",
            expectedPrice: 65000, // Adjusted to monthly rent for realism, or 6500000 for sale
            pricePerSqft: 15000,
            maintenance: 5000,
            description: "Spacious 2 BHK apartment with excellent natural light, two balconies, covered parking, and modern amenities. Located in the heart of Indiranagar with easy access to tech parks and malls.",
            image: [
                "https://res.cloudinary.com/dsxozpnsw/image/upload/v1787554750/dfbhhrovahin7kmifphc.jpg",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
            ]
        };

        setProperty(mockProperty);
        setLoading(false);
    }, [pid]);

    const handleFormChange = (e) => {
        setInquiryForm({ ...inquiryForm, [e.target.name]: e.target.value });
    };

    const handleInquirySubmit = (e) => {
        e.preventDefault();
        alert('Inquiry sent successfully! (Connect to your backend API here)');
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div></div>;
    if (!propty) return <div className="text-center p-10 text-red-500">Property not found.</div>;

    // Helper to format price based on listing type
    const formatPrice = (price, type) => {
        if (type === 'rent') return `₹ ${price.toLocaleString('en-IN')}/month`;
        if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
        if (price >= 100000) return `₹ ${(price / 100000).toFixed(2)} Lac`;
        return `₹ ${price.toLocaleString('en-IN')}`;
    };

    const images = [].concat(propty.image || []);

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-yellow-600">Home</Link> &gt;
        <Link to={`/${propty.listingType}`} className="hover:text-yellow-600 ml-1 capitalize">{propty.listingType}</Link> &gt;
        <span className="ml-1 text-gray-800 font-medium">{propty.locality}, {propty.city}</span>
        </div>

        <main className="max-w-7xl mx-auto px-4 flex flex-col gap-8 lg:flex-row">

        {/* ================= LEFT COLUMN (Main Details) ================= */}
        <div className="flex flex-col gap-8 lg:w-8/12">

        {/* 1. Image Gallery */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <div className="relative h-80 md:h-96 w-full bg-gray-200">
        <img
        src={images[selectedImageIndex] || 'https://via.placeholder.com/800x600?text=No+Image'}
        alt={propty.propertyName}
        className="w-full h-full object-cover"
        />
        <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
        {propty.listingType}
        </span>
        </div>
        {images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto bg-white">
            {images.map((img, idx) => (
                <img
                key={idx}
                src={img}
                alt={`View ${idx + 1}`}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer border-2 transition ${
                    selectedImageIndex === idx ? 'border-yellow-500 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                />
            ))}
            </div>
        )}
        </div>

        {/* 2. Header & Price */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {propty.propertyName}
        </h1>
        <p className="text-gray-600 mt-1 flex items-center gap-1 text-lg">
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
        {propty.locality}, {propty.city}
        {propty.landmark && <span className="text-sm text-gray-400 ml-2">({propty.landmark})</span>}
        </p>
        </div>
        <div className="text-left md:text-right">
        <p className="text-2xl md:text-3xl font-bold text-yellow-600">
        {formatPrice(propty.expectedPrice, propty.listingType)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
        ₹ {propty.pricePerSqft.toLocaleString('en-IN')} / sq.ft
        {propty.maintenance > 0 && <span className="block">+ ₹ {propty.maintenance.toLocaleString('en-IN')} maintenance</span>}
        </p>
        </div>
        </div>
        </div>

        {/* 3. Key Specifications Grid */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Property Overview</h3>
        <hr className="border-gray-200 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {propty.bedrooms && (<div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        Bedrooms
        </span>
        <span className="font-semibold text-gray-900 text-lg">{propty.bedrooms} BHK</span>
        </div>) }
        {propty.bathrooms && (<div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
        Bathrooms
        </span>
        <span className="font-semibold text-gray-900 text-lg">{propty.bathrooms}</span>
        </div>) }
        {propty.balconies && (<div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        Balconies
        </span>
        <span className="font-semibold text-gray-900 text-lg">{propty.balconies}</span>
        </div>)}
        <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
        Super Area
        </span>
        <span className="font-semibold text-gray-900 text-lg">{propty.superArea.toLocaleString()} sq.ft</span>
        </div>
        <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
        Carpet Area
        </span>
        <span className="font-semibold text-gray-900 text-lg">{propty.carpetArea.toLocaleString()} sq.ft</span>
        </div>
        <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        Floor
        </span>
        <span className="font-semibold text-gray-900 text-lg">{propty.propertyFloor} <span className="text-sm font-normal text-gray-500">of {propty.totalFloors}</span></span>
        </div>
        </div>
        </div>

        {/* 4. Description */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Description</h3>
        <hr className="border-gray-200 mb-4" />
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {propty.description}
        </p>
        </div>

        </div>

        {/* ================= RIGHT COLUMN (Sticky Sidebar) ================= */}
        <aside className="lg:w-4/12">
        <div className="sticky top-4 space-y-6">

        {/* Contact Owner Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-800">
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        Contact Owner
        </h4>

        <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-xl">
        O
        </div>
        <div>
        <p className="font-semibold text-gray-900">Property Owner</p>
        <p className="text-sm text-gray-500">Posted 2 days ago</p>
        </div>
        </div>

        <div className="space-y-3">
        <a href={`tel:${propty.ownerPhone}`} className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        Show Phone Number
        </a>
        </div>
        </div>

        {/* Inquiry Form
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-800">
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        Send Inquiry
        </h4>

        <form onSubmit={handleInquirySubmit} className="space-y-4">
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
        type="text" name="name" required value={inquiryForm.name} onChange={handleFormChange}
        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
        placeholder="John Doe"
        />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
        type="tel" name="phone" required value={inquiryForm.phone} onChange={handleFormChange}
        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
        placeholder="+91 98765 43210"
        />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
        name="message" rows="4" required value={inquiryForm.message} onChange={handleFormChange}
        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
        ></textarea>
        </div>

        <button
        type="submit"
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition flex justify-center items-center gap-2"
        >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        Send Message
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
        By submitting, you agree to our Terms of Service and Privacy Policy.
        </p>
        </form>
        </div>

            */}
        </div>
        </aside>
        </main>
        </div>
    );
};

export default PropertyDetails;
