import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { properties } from '../property/Properties';

import PropertyCard from '../components/Properties/Propertycard';
import FilterSidebar from '../components/Properties/FilterSidebar';

function filterProperties(props, filters) {
  return props.filter((p) => {
    if (p.listingType !== 'rent') return false;
    if (filters.city !== 'All Cities' && p.city !== filters.city) return false;

    if (filters.propertyType !== 'All Types') {
      const typeMap = {
        'Apartment':  { pt: 'residential', field: 'residentialSubType', values: ['apartment'] },
        'Villa':      { pt: 'residential', field: 'residentialSubType', values: ['villa'] },
        'Plot':       { pt: 'plot',        field: null,               values: null },
        'Office Space': { pt: 'commercial', field: 'commercialSubType', values: ['Office'] },
        'Retail':     { pt: 'commercial',  field: 'commercialSubType', values: ['Retail', 'Showroom'] },
        'Co-working': { pt: 'commercial',  field: 'commercialSubType', values: ['Co-working'] },
        'Warehouse':  { pt: 'commercial',  field: 'commercialSubType', values: ["warehouse"] }
      };

      const match = typeMap[filters.propertyType];
      if (!match) return false;

      // 1. Must match the top-level propertyType ("residential" / "commercial" / "plot")
      if (p.propertyType !== match.pt) return false;

      // 2. If there's a sub-type field, check it too
      if (match.field) {

        const sub = (p[match.field] || '').toLowerCase();
        const found = match.values.some((v) =>
        v.toLowerCase() === (sub || '').toLowerCase()
        );
        if (!found) return false;
      }
    }

    if (filters.budget !== 'All Budgets') {
      const pv = p.expectedPrice;
      switch (filters.budget) {
        case 'Under 50 Lac': if (pv >= 5000000) return false; break;
        case '50 Lac - 1 Cr': if (pv < 5000000 || pv >= 10000000) return false; break;
        case '1 Cr - 2 Cr': if (pv < 10000000 || pv >= 20000000) return false; break;
        case '2 Cr - 5 Cr': if (pv < 20000000 || pv >= 50000000) return false; break;
        case '5 Cr - 10 Cr': if (pv < 50000000 || pv >= 100000000) return false; break;
        case 'Above 10 Cr': if (pv < 100000000) return false; break;
      }
    }

    if (filters.bhk !== 'All BHK') {
      const bhkNum = parseInt(filters.bhk.replace(' BHK', ''), 10);
      if (p.bedrooms !== bhkNum) return false;
    }

    return true;
  });
}


export default function RentPage() {
  const [allProperties, setAllProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isRes=true;
  const [filters, setFilters] = useState({
    city: 'All Cities',
    propertyType: 'All Types',
    budget: 'All Budgets',
    bhk: 'All BHK',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // FETCH DATA
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await properties();
        console.log(data);// your async function
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

  // FILTER DATA (synchronous — no async here!)
  const filteredProperties = useMemo(() => {
    let result = filterProperties(allProperties, filters);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
        p.propertyName?.toLowerCase().includes(q) ||
        p.locality?.toLowerCase().includes(q) ||
        p.city?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allProperties, filters, searchQuery]);

  // RENDER STATES
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
    {/* Page Header */}
    <div className="bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 className="text-2xl font-bold text-gray-900">Rent Properties in India</h1>
    <p className="text-gray-500 mt-1">{filteredProperties.length}+ properties available for rent</p>

    {/* Search Bar */}
    <div className="mt-4 relative max-w-xl">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search by property name, location..."
    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0078DB] focus:border-transparent"
    />
    </div>
    </div>
    </div>

    {/* Content */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex gap-6">
    {/* Filters */}
    <FilterSidebar onFilterChange={setFilters} isRes={isRes} />

    {/* Property Grid */}
    <div className="flex-1">
    {filteredProperties.length === 0 ? (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
      <p className="text-gray-500 text-lg">No properties found matching your criteria</p>
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
