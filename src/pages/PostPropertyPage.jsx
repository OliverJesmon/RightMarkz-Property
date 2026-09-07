import { useState, useEffect, useRef } from 'react';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { Cloudinary } from '@cloudinary/url-gen';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import {
    ChevronRight,
    ChevronLeft,
    Check,
    Home,
    MapPin,
    IndianRupee,
    Image,
    User,
    Phone,
    Mail,
    Building,
    Bed,
    Maximize,
    BadgeCheck,
    LocateFixed,
    Loader2,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon issue in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const initialFormData = {
    listingType: 'sell',
    propertyType: 'residential',
    residentialSubType: 'apartment',
    commercialSubType: 'office',
    plotSubType: 'residential-plot',
    bedrooms: null,
    bathrooms: null,
    balconies: null,
    superArea: null,
    carpetArea: null,
    totalFloors: null,
    propertyFloor: null,
    propertyName:'',
    city: '',
    locality: '',
    coordinates: {
        type: '',
        coordinates:[0.000,0.000] }, // NEW
    landmark: '',
    expectedPrice: null,
    pricePerSqft: null,
    maintenance: '',
    description: '',
    image:'',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownershipType: 'freehold',
};



// Map click handler component
function MapClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
}

export default function PostPropertyPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [submitted, setSubmitted] = useState(false);
    const { user, loading: authLoading } = useAuth();

    // Map-related state
    const [cityCenter, setCityCenter] = useState(null); // { lat, lng }
    const [isGeocodingCity, setIsGeocodingCity] = useState(false);
    const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
    const geocodeTimer = useRef(null);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const longitude = formData.coordinates.coordinates[0];
    const latitude = formData.coordinates.coordinates[1];
    const openWidget = () => {
        if (!widgetRef.current) {
            widgetRef.current = window.cloudinary.createUploadWidget(
                {
                    cloudName: import.meta.env.VITE_CLOUD_NAME,
                    uploadPreset: import.meta.env.VITE_CLOUD_PRESET,
                },
                (error, result) => {
                    if (!error && result?.event === 'success') {
                        const url = result.info.secure_url;
                        alert("File Uploaded");
                        updateField('image',url);
                    }
                }
            );
        }

        widgetRef.current.open();
    };



    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

    };
    const userSetProperty = async (User,property) =>
    {

            if(!User)
            {
                alert("Please sign in!");
                return ;
            }
            axios.post(`${import.meta.env.VITE_BACKEND_AUTH}/auth/forgotpass`)
            .then((response) => {

                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                console.log("Request completed");
            });
    }



    // Geocode city → center coordinates (debounced)
    useEffect(() => {
        if (geocodeTimer.current) clearTimeout(geocodeTimer.current);

        if (!formData.city || formData.city.trim().length < 3) {
            setCityCenter(null);
            return;
        }

        geocodeTimer.current = setTimeout(async () => {
            setIsGeocodingCity(true);
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
                        formData.city
                    )}`
                );
                const data = await res.json();
                if (data && data.length > 0) {
                    setCityCenter({
                        lat: parseFloat(data[0].lat),
                                  lng: parseFloat(data[0].lon),
                    });
                } else {
                    setCityCenter(null);
                }
            } catch (err) {
                console.error('City geocoding failed', err);
                setCityCenter(null);
            } finally {
                setIsGeocodingCity(false);
            }
        }, 600);

        return () => clearTimeout(geocodeTimer.current);
    }, [formData.city]);

    // Handle map click → set coordinates + reverse geocode locality
    const handleMapClick = async (latlng) => {
        const { lat, lng } = latlng;
        updateField('coordinates', {
            type: 'Point',
            coordinates: [lng, lat]
        });

        setIsReverseGeocoding(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await res.json();
            const localityName =
            data?.address?.suburb ||
            data?.address?.neighbourhood ||
            data?.address?.quarter ||
            data?.address?.city_district ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address?.county ||
            data?.name ||
            '';
            if (localityName) {
                updateField('locality', localityName);
            }
        } catch (err) {
            console.error('Reverse geocoding failed', err);
        } finally {
            setIsReverseGeocoding(false);
        }
    };

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
    };

        const prevStep = () => {
            if (step > 1) setStep(step - 1);
        };

            const handleSubmit = async (e) => {
                e.preventDefault();


                try {
                        const response = await fetch(`${import.meta.env.VITE_BACKEND}/new`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(formData)
                        });

                        const result = await response.json();

                        if (!response.ok) {
                            throw new Error(data.message || 'Failed to create property');
                        }
                        const propertyId = result.data._id;

                        userSetProperty(user._id,propertyId);

                        setSubmitted(true);



            } catch (error) {
                console.error('Submit error:', error);
            }
            };

            if (submitted) {
                return (
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BadgeCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Listed Successfully!</h2>
                    <p className="text-gray-500 mb-6">
                    Your property has been submitted for verification. You will receive a confirmation on your phone and email.
                    </p>
                    <div className="space-y-3">
                    <Link
                    to="/"
                    className="block w-full py-3 bg-gold text-white rounded-lg font-medium hover:bg-[#0068c0] transition-colors"
                    >
                    Go to Homepage
                    </Link>
                    <button
                    onClick={() => {
                        setSubmitted(false);
                        setStep(1);
                        setFormData(initialFormData);
                    }}
                    className="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                    List Another Property
                    </button>
                    </div>
                    </div>
                    </div>
                );
            }

            const steps = [
                { num: 1, label: 'Property Details' },
                { num: 2, label: 'Location' },
                { num: 3, label: 'Pricing' },
                { num: 4, label: 'Contact Info' },
            ];

            return (
                <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-2xl font-bold text-gray-900">Post Your Property</h1>
                <p className="text-gray-500 mt-1">List your property for FREE and reach millions of buyers/tenants</p>
                </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-8">
                {steps.map((s, idx) => (
                    <div key={s.num} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                    <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                        step >= s.num ? 'bg-gold text-white' : 'bg-navy text-white'
                    }`}
                    >
                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                    </div>
                    <span className={`text-xs mt-2 ${step >= s.num ? 'text-gold font-medium' : 'text-gray-400'}`}>
                    {s.label}
                    </span>
                    </div>
                    {idx < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-4 ${step > s.num ? 'bg-gold' : 'bg-gray-200'}`} />
                    )}
                    </div>
                ))}
                </div>

                {/* Form Content */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                {/* Step 1: Property Details */}
                {step === 1 && (
                    <div className="space-y-6">
                    {/* Listing Type */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">I want to</label>
                    <div className="flex gap-4">
                    {[
                        { value: 'sell', label: 'Sell', icon: Home },
                        { value: 'rent', label: 'Rent', icon: Building },
                    ].map((option) => (
                        <button
                        key={option.value}
                        onClick={() => updateField('listingType', option.value)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-colors ${
                            formData.listingType === option.value
                                ? 'border-navy bg-navy text-white'
                                : 'border-gold bg-blue-50 text-gold'
                        }`}
                        >
                        <option.icon className="w-4 h-4" />
                        {option.label}
                        </button>
                    ))}
                    </div>
                    </div>

                    {/* Property Type */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
                    <div className="flex gap-3 flex-wrap">
                    {[
                        { value: 'residential', label: 'Residential' },
                        { value: 'commercial', label: 'Commercial' },
                        { value: 'plot', label: 'Plot/Land' },
                    ].map((option) => (
                        <button
                        key={option.value}
                        onClick={() => updateField('propertyType', option.value)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-colors ${
                            formData.propertyType === option.value
                                ? 'border-navy bg-navy text-white'
                                : 'border-gold bg-blue-50 text-gold'
                        }`}
                        >
                        {option.label}
                        </button>
                    ))}
                    </div>
                    </div>

                    {/* Sub Type */}
                    {formData.propertyType === 'residential' && (
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Residential Type</label>
                        <div className="grid grid-cols-2 gap-3">
                        {[
                            { value: 'apartment', label: 'Apartment' },
                            { value: 'villa', label: 'Villa' },
                            { value: 'independent-house', label: 'Independent House' },
                            { value: 'builder-floor', label: 'Builder Floor' },
                        ].map((option) => (
                            <button
                            key={option.value}
                            onClick={() => updateField('residentialSubType', option.value)}
                            className={`py-2.5 rounded-lg border-2 font-medium text-sm transition-colors ${
                                formData.residentialSubType === option.value
                                    ? 'border-navy bg-navy text-white'
                                    : 'border-gold bg-blue-50 text-gold'
                            }`}
                            >
                            {option.label}
                            </button>
                        ))}
                        </div>
                        </div>
                    )}

                    {formData.propertyType === 'commercial' && (
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Commercial Type</label>
                        <div className="grid grid-cols-2 gap-3">
                        {[
                            { value: 'office', label: 'Office Space' },
                            { value: 'retail', label: 'Retail Shop' },
                            { value: 'warehouse', label: 'Warehouse' },
                            { value: 'coworking', label: 'Co-working' },
                        ].map((option) => (
                            <button
                            key={option.value}
                            onClick={() => updateField('commercialSubType', option.value)}
                            className={`py-2.5 rounded-lg border-2 font-medium text-sm transition-colors ${
                                formData.commercialSubType === option.value
                                    ? 'border-navy bg-navy text-white'
                                    : 'border-gold bg-blue-50 text-gold'
                            }`}
                            >
                            {option.label}
                            </button>
                        ))}
                        </div>
                        </div>
                    )}

                    {formData.propertyType === 'plot' && (
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Plot Type</label>
                        <div className="grid grid-cols-3 gap-3">
                        {[
                            { value: 'residential-plot', label: 'Residential Plot' },
                            { value: 'commercial-land', label: 'Commercial Land' },
                            { value: 'farmland', label: 'Farm Land' },
                        ].map((option) => (
                            <button
                            key={option.value}
                            onClick={() => updateField('plotSubType', option.value)}
                            className={`py-2.5 rounded-lg border-2 font-medium text-sm transition-colors ${
                                formData.plotSubType === option.value
                                    ? 'border-navy bg-navy text-white'
                                    : 'border-gold bg-blue-50 text-gold'
                            }`}
                            >
                            {option.label}
                            </button>
                        ))}
                        </div>
                        </div>
                    )}

                    {/* BHK Details */}
                    {formData.propertyType === 'residential' && (
                        <div className="grid grid-cols-3 gap-4">
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Bed className="w-3.5 h-3.5 inline mr-1" />
                        Bedrooms
                        </label>
                        <select
                        value={formData.bedrooms}
                        onChange={(e) => updateField('bedrooms', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                        >
                        <option value="">Select</option>
                        <option value="1">1 BHK</option>
                        <option value="2">2 BHK</option>
                        <option value="3">3 BHK</option>
                        <option value="4">4 BHK</option>
                        <option value="5">5+ BHK</option>
                        </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                        <select
                        value={formData.bathrooms}
                        onChange={(e) => updateField('bathrooms', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                        >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                        </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Balconies</label>
                        <select
                        value={formData.balconies}
                        onChange={(e) => updateField('balconies', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                        >
                        <option value="">Select</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3+</option>
                        </select>
                        </div>
                        </div>
                    )}

                    {/* Area */}
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Maximize className="w-3.5 h-3.5 inline mr-1" />
                    Super Built-up Area (sqft)
                    </label>
                    <input
                    type="number"
                    value={formData.superArea}
                    onChange={(e) => updateField('superArea', e.target.value)}
                    placeholder="e.g., 1200"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area (sqft)</label>
                    <input
                    type="number"
                    value={formData.carpetArea}
                    onChange={(e) => updateField('carpetArea', e.target.value)}
                    placeholder="e.g., 950"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                    />
                    </div>
                    </div>

                    {/* Floor Details */}
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Floors</label>
                    <input
                    type="number"
                    value={formData.totalFloors}
                    onChange={(e) => updateField('totalFloors', e.target.value)}
                    placeholder="e.g., 15"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Floor</label>
                    <input
                    type="number"
                    value={formData.propertyFloor}
                    onChange={(e) => updateField('propertyFloor', e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    </div>
                    </div>
                )}

                {/* Step 2: Location (with map picker) */}
                {step === 2 && (
                    <div className="space-y-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property/Agency Name</label>
                    <input
                    type="text"
                    value={formData.propertyName}
                    onChange={(e) => updateField('propertyName', e.target.value)}
                    placeholder="e.g., Northernsky, Residential name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    {/* City Input */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-3.5 h-3.5 inline mr-1" />
                    City
                    </label>
                    <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="e.g., Gurgaon"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    {isGeocodingCity && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Locating city on map...
                        </p>
                    )}
                    </div>

                    {/* Map Picker — appears once city is geocoded */}
                    {cityCenter ? (
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        <LocateFixed className="w-3.5 h-3.5 inline mr-1" />
                        Pin your exact location on the map
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                        Click anywhere on the map to mark your property's location. The locality will be auto-filled.
                        </p>

                        <div className="relative rounded-lg overflow-hidden border border-gray-300" style={{ isolation: 'isolate', zIndex: 0 }}>
                        <MapContainer
                        key={`${cityCenter.lat}-${cityCenter.lng}`}
                        center={[cityCenter.lat, cityCenter.lng]}
                        zoom={13}
                        style={{ height: '400px', width: '100%',zIndex: 0 }}
                        scrollWheelZoom={true}

                        >
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    style={{zIndex:0}}
                    />

                    <MapClickHandler onMapClick={handleMapClick} />
                    {longitude && latitude && (
                        <Marker position={[longitude, latitude]} />
                    )}
                    </MapContainer>

                    {isReverseGeocoding && (
                        <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-md shadow-md text-xs text-gray-700 flex items-center gap-2 z-[1000]">
                        <Loader2 className="w-3 h-3 animate-spin" /> Fetching locality...
                        </div>
                    )}
                    </div>

                    {/* Coordinates & Locality display */}
                    {longitude && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Coordinates</p>
                        <p className="text-sm font-mono text-gray-800">
                        {longitude.toFixed(6)}, {latitude.toFixed(6)}
                        </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Locality (auto-detected)</p>
                        <input
                        type="text"
                        value={formData.locality}
                        onChange={(e) => updateField('locality', e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-800 font-medium focus:outline-none"
                        placeholder="Locality name"
                        />
                        </div>
                        </div>
                    )}
                    </div>
                    ) : formData.city.trim().length >= 3 && !isGeocodingCity ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        We couldn't find <strong>{formData.city}</strong> on the map. Please check the spelling and try again.
                        </div>
                    ) : formData.city.trim().length > 0 && formData.city.trim().length < 3 ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                        <LocateFixed className="w-4 h-4 inline mr-2" />
                        Keep typing the city name to load the map...
                        </div>
                    ) : (
                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                        Enter your city above to unlock the map and pin your exact location.
                        </p>
                        </div>
                    )}

                    {/* Landmark */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nearby Landmark (Optional)</label>
                    <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => updateField('landmark', e.target.value)}
                    placeholder="e.g., Near Metro Station"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    </div>
                )}

                {/* Step 3: Pricing */}
                {step === 3 && (
                    <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    <IndianRupee className="w-3.5 h-3.5 inline mr-1" />
                    Expected Price (Rs.)
                    </label>
                    <input
                    type="number"
                    value={formData.expectedPrice}
                    onChange={(e) => updateField('expectedPrice', e.target.value)}
                    placeholder="e.g., 6500000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price per Sqft (Rs.)</label>
                    <input
                    type="number"
                    value={formData.pricePerSqft}
                    onChange={(e) => updateField('pricePerSqft', e.target.value)}
                    placeholder="e.g., 15000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Maintenance (Optional)</label>
                    <input
                    type="number"
                    value={formData.maintenance}
                    onChange={(e) => updateField('maintenance', e.target.value)}
                    placeholder="e.g., 5000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Description</label>
                    <textarea
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Describe your property in detail..."
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    />
                    </div>
                    </div>

                    {/* Image Upload Placeholder */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Image className="w-3.5 h-3.5 inline mr-1" />
                    Property Photos
                    </label>
                    <button onClick={openWidget} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gold transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Image className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Click to upload photos</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB each</p>
                    </button>
                    </div>
                    </div>
                )}

                {/* Step 4: Contact Info */}
                {step === 4 && (
                    <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-3.5 h-3.5 inline mr-1" />
                    Owner Name
                    </label>
                    <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => updateField('ownerName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-3.5 h-3.5 inline mr-1" />
                    Phone Number
                    </label>
                    <input
                    type="tel"
                    value={formData.ownerPhone}
                    onChange={(e) => updateField('ownerPhone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-3.5 h-3.5 inline mr-1" />
                    Email Address
                    </label>
                    <input
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => updateField('ownerEmail', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ownership Type</label>
                    <div className="flex gap-3">
                    {[
                        { value: 'freehold', label: 'Freehold' },
                        { value: 'leasehold', label: 'Leasehold' },
                        { value: 'power-of-attorney', label: 'Power of Attorney' },
                    ].map((option) => (
                        <button
                        key={option.value}
                        onClick={() => updateField('ownershipType', option.value)}
                        className={`flex-1 py-2.5 rounded-lg border-2 font-medium text-sm transition-colors ${
                            formData.ownershipType === option.value
                                ? 'border-gold bg-blue-50 text-gold'
                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                        >
                        {option.label}
                        </button>
                    ))}
                    </div>
                    </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold text-gray-800">Property Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="text-gray-800 capitalize">
                    {formData.propertyType} - {formData.residentialSubType || formData.commercialSubType || formData.plotSubType}
                    </span>
                    <span className="text-gray-500">City:</span>
                    <span className="text-gray-800">{formData.city || '-'}</span>
                    <span className="text-gray-500">Locality:</span>
                    <span className="text-gray-800">{formData.locality || '-'}</span>
                    <span className="text-gray-500">Coordinates:</span>
                    <span className="text-gray-800 font-mono text-xs">
                    {longitude
                        ? `${longitude.toFixed(4)}, ${latitude.toFixed(4)}`
                        : '-'}
                        </span>
                        <span className="text-gray-500">Price:</span>
                        <span className="text-gray-800">
                        {formData.expectedPrice ? `Rs. ${Number(formData.expectedPrice).toLocaleString()}` : '-'}
                        </span>
                        </div>
                        </div>
                        </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    step === 1
                    ? 'bg-navy text-white cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                >
                <ChevronLeft className="w-4 h-4" />
                Previous
                </button>

                {step < 4 ? (
                    <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2.5 bg-navy text-white rounded-lg font-medium text-sm hover:bg-gold transition-colors"
                    >
                    Next
                    <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors"
                    >
                    <Check className="w-4 h-4" />
                    Submit Property
                    </button>
                )}
                </div>
                </div>
                </div>
                </div>
            );
}
