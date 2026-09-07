import { MapPin, Bed, Bath, Maximize, BadgeCheck, Calendar } from 'lucide-react';
import { properties } from '../../property/Properties.jsx';
import { Link} from 'react-router-dom';
import { useAuth } from '../../context/authContext'
export default function PropertyCard({ property }) {
    const { user } = useAuth();
    const formatPrice = (price, type) => {
        if (type === 'rent') return `₹ ${price.toLocaleString('en-IN')}/month`;
        if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
        if (price >= 100000) return `₹ ${(price / 100000).toFixed(2)} Lac`;
        return `₹ ${price.toLocaleString('en-IN')}`;
    };
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
        <img
        src={property.image}
        alt={property.propertyName}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
        {property.verified && (
            <span className="flex items-center gap-1 bg-navy text-white text-[10px] font-semibold px-2 py-1 rounded-full">
            <BadgeCheck className="w-3 h-3" />
            Verified
            </span>
        )}
         {/* property.featured && (
             <span className="bg-amber-500 text-navy text-[10px] font-semibold px-2 py-1 rounded-full">
             Featured
             </span>
        )*/}
        </div>
        {/* Type Badge */}
        <div className="absolute bottom-3 left-3">
        <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
        {property.propertyType}
        </span>
        </div>
        </div>

        {/* Content */}
        <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{property.propertyName}</h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
        <MapPin className="w-3.5 h-3.5 text-gold" />
        <span className="truncate">{property.locality},{property.city}</span>
        </div>

        {/* Details */}{property.propertyType=="plot"?(<></>):(
        <div className="flex items-center gap-4 mb-3">
        {property.propertyType=="commercial"?(<></>):(
        <div className="flex items-center gap-1 text-gray-600 text-sm">
        <Bed className="w-4 h-4 text-gray-400" />
        <span>{property.bedrooms}</span>
        </div>)}
        <div className="flex items-center gap-1 text-gray-600 text-sm">
        <Bath className="w-4 h-4 text-gray-400" />
        <span>{property.bathrooms}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600 text-sm">
        <Maximize className="w-4 h-4 text-gray-400" />
        <span>{property.carpetArea}</span>
        </div>
        </div>)}

        {/* Possession (for new launches/projects) */}
        {property.possession && (
            <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Possession: {property.possession}</span>
            </div>
        )}

        {/* Developer */}
        {property.developer && (
            <p className="text-xs text-gray-500 mb-2">by {property.developer}</p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-gold font-bold text-lg">{formatPrice(property.expectedPrice, property.listingType)}</span>
        {user?(<Link to={`/view/${property._id}`} className="text-sm text-gray-500 hover:text-gold transition-colors">
        View Details
        </Link>):(<Link to={`/login`} className="text-sm text-gray-500 hover:text-gold transition-colors">
        View Details
        </Link>)}
        </div>
        </div>
        </div>
    );
}
