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
        <div className="relative h-44 sm:h-52 overflow-hidden">
        <img
        src={property.image}
        alt={property.propertyName}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1.5 sm:gap-2 max-w-[calc(100%-1rem)]">
        {property.verified && (
            <span className="flex items-center gap-1 bg-navy text-white text-[10px] font-semibold px-2 py-1 rounded-full shrink-0">
            <BadgeCheck className="w-3 h-3" />
            <span className="hidden sm:inline">Verified</span>
            <span className="sm:hidden">✓</span>
            </span>
        )}
        </div>
        {/* Type Badge */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
        <span className="bg-black/60 text-white text-[10px] sm:text-xs px-2 py-1 rounded-md backdrop-blur-sm">
        {property.propertyType}
        </span>
        </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 truncate leading-tight">
        {property.propertyName}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold shrink-0" />
        <span className="truncate">{property.locality}, {property.city}</span>
        </div>

        {/* Details */}
        {property.propertyType !== "plot" && (
            <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3 flex-wrap">
            {property.propertyType !== "commercial" && (
                <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
                <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                <span>{property.bedrooms}</span>
                </div>
            )}
            <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
            <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
            <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            <span>{property.carpetArea}</span>
            </div>
            </div>
        )}

        {/* Possession */}
        {property.possession && (
            <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold shrink-0" />
            <span className="truncate">Possession: {property.possession}</span>
            </div>
        )}

        {/* Developer */}
        {property.developer && (
            <p className="text-[11px] sm:text-xs text-gray-500 mb-2 truncate">
            by {property.developer}
            </p>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 gap-2">
        <span className="text-gold font-bold text-base sm:text-lg truncate">
        {formatPrice(property.expectedPrice, property.listingType)}
        </span>
        <Link
        to={user ? `/view/${property._id}` : `/login`}
        className="text-xs sm:text-sm text-gray-500 hover:text-gold transition-colors shrink-0 px-2 py-1.5 min-h-[36px] flex items-center rounded-md active:bg-gray-50"
        >
        View Details
        </Link>
        </div>
        </div>
        </div>
    );
}
