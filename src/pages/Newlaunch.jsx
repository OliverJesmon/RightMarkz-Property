import { useState, useMemo } from 'react';
import { Search, Rocket } from 'lucide-react';
import { properties } from '../property/Properties';
import PropertyCard from '../components/Properties/Propertycard';
import FilterSidebar from '../components/Properties/FilterSidebar';

function filterProperties(props, filters) {
    return props.filter((p) => {
        if (p.category !== 'new-launch') return false;
        if (filters.city !== 'All Cities' && p.city !== filters.city) return false;
        if (filters.propertyType !== 'All Types') {
            const typeMap = {
                'Apartment': ['Apartments', 'New Launch'],
                'Villa': ['Villa'],
            };
            const allowedTypes = typeMap[filters.propertyType] || [filters.propertyType];
            if (!allowedTypes.some(t => p.type.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(p.type.toLowerCase()))) return false;
        }
        if (filters.budget !== 'All Budgets') {
            const pv = p.priceValue;
            switch (filters.budget) {
                case 'Under 50 Lac': if (pv >= 50000) return false; break;
                case '50 Lac - 1 Cr': if (pv < 50000 || pv >= 100000) return false; break;
                case '1 Cr - 2 Cr': if (pv < 100000 || pv >= 200000) return false; break;
                case '2 Cr - 5 Cr': if (pv < 200000 || pv >= 500000) return false; break;
                case '5 Cr - 10 Cr': if (pv < 500000 || pv >= 1000000) return false; break;
                case 'Above 10 Cr': if (pv < 1000000) return false; break;
            }
        }
        if (filters.bhk !== 'All BHK') {
            const bhkNum = filters.bhk.replace(' BHK', '');
            if (!p.beds.includes(bhkNum)) return false;
        }
        return true;
    });
}
export default function NewLaunchPage() {
    const [filters, setFilters] = useState({
        city: 'All Cities',
        propertyType: 'All Types',
        budget: 'All Budgets',
        bhk: 'All BHK',
    });
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProperties = useMemo(() => {
        let result = filterProperties(properties, filters);
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                p.title.toLowerCase().includes(q) ||
                p.location.toLowerCase().includes(q) ||
                p.city.toLowerCase().includes(q)
            );
        }
        return result;
    }, [filters, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-[#0078DB] to-[#005fa3] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
        <Rocket className="w-4 h-4 text-white" />
        <span className="text-white/90 text-sm font-medium">Be the First to Own</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">New Launch Projects</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
        Discover brand new properties with exclusive pre-launch prices and early bird offers
        </p>
        </div>
        </div>

        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
        <h2 className="text-xl font-bold text-gray-900">New Launch Properties</h2>
        <p className="text-gray-500 mt-1">{filteredProperties.length}+ new launch projects</p>
        </div>
        <div className="relative max-w-sm w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search new launches..."
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0078DB] focus:border-transparent"
        />
        </div>
        </div>
        </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
        <FilterSidebar onFilterChange={setFilters} />
        <div className="flex-1">
        {filteredProperties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-lg">No new launches found matching your criteria</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
            </div>
        )}
        </div>
        </div>
        </div>
        </div>
    );
}

