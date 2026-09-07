import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { cities, propertyTypes, budgetRanges, bhkOptions } from '../../property/Properties.jsx';

export default function FilterSidebar({ onFilterChange, isRes }) {
// export default function FilterSidebar({config}) {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        city: 'All Cities',
        propertyType: 'All Types',
        budget: 'All Budgets',
        bhk: 'All BHK',
    });
    const [expandedSections, setExpandedSections] = useState({
        city: true,
        type: true,
        budget: true,
        bhk: true,
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const defaultFilters = {
            city: 'All Cities',
            propertyType: 'All Types',
            budget: 'All Budgets',
            bhk: 'All BHK',
        };
        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
    };

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const hasActiveFilters =
    filters.city !== 'All Cities' ||
    filters.propertyType !== 'All Types' ||
    filters.budget !== 'All Budgets' ||
    filters.bhk !== 'All BHK';

    const filterContent = (
        <div className="space-y-4">
        {/* City Filter */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
        onClick={() => toggleSection('city')}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
        <span className="font-medium text-sm text-gray-800">City</span>
        <ChevronDown
        className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.city ? 'rotate-180' : ''}`}
        />
        </button>
        {expandedSections.city && (
            <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
            {cities.map((city) => (
                <label key={city} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                type="radio"
                name="city"
                checked={filters.city === city}
                onChange={() => handleFilterChange('city', city)}
                className="w-4 h-4 text-[#0078DB] accent-[#0078DB]"
                />
                <span className="text-sm text-gray-700">{city}</span>
                </label>
            ))}
            </div>
        )}
        </div>

        {/* Property Type Filter */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
        onClick={() => toggleSection('type')}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
        <span className="font-medium text-sm text-gray-800">Property Type</span>
        <ChevronDown
        className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.type ? 'rotate-180' : ''}`}
        />
        </button>
        {/*(expandedSections.type && !isRes)  && (
            <div className="p-4 space-y-2">
            {propertyTypes
                .filter((type) => type !== "Residencials")
                .map((type) => (

                <label key={type} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                type="radio"
                name="propertyType"
                checked={filters.propertyType === type}
                onChange={() => handleFilterChange('propertyType', type)}
                className="w-4 h-4 text-[#0078DB] accent-[#0078DB]"
                />
                <span className="text-sm text-gray-700">{type}</span>
                </label>
            ))}
            </div>
        )}
        {(expandedSections.type && isRes) && (
            <div className="p-4 space-y-2">
            {propertyTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                type="radio"
                name="propertyType"
                checked={filters.propertyType === type}
                onChange={() => handleFilterChange('propertyType', type)}
                className="w-4 h-4 text-[#0078DB] accent-[#0078DB]"
                />
                <span className="text-sm text-gray-700">{type}</span>
                </label>
            ))}
            </div>
        )*/}
        {(expandedSections.type) && (<div className="p-4 space-y-2">
            {propertyTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                type="radio"
                name="propertyType"
                checked={filters.propertyType === type}
                onChange={() => handleFilterChange('propertyType', type)}
                className="w-4 h-4 text-[#0078DB] accent-[#0078DB]"
                />
                <span className="text-sm text-gray-700">{type}</span>
                </label>
            ))}
            </div>)}
        </div>

        {/* Budget Filter */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
        onClick={() => toggleSection('budget')}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
        <span className="font-medium text-sm text-gray-800">Budget</span>
        <ChevronDown
        className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.budget ? 'rotate-180' : ''}`}
        />
        </button>
        {expandedSections.budget && (
            <div className="p-4 space-y-2">
            {budgetRanges.map((range) => (
                <label key={range} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                type="radio"
                name="budget"
                checked={filters.budget === range}
                onChange={() => handleFilterChange('budget', range)}
                className="w-4 h-4 text-[#0078DB] accent-[#0078DB]"
                />
                <span className="text-sm text-gray-700">{range}</span>
                </label>
            ))}
            </div>
        )}
        </div>

        {/* BHK Filter */}
        {isRes?(
        <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
        onClick={() => toggleSection('bhk')}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
        <span className="font-medium text-sm text-gray-800">BHK</span>
        <ChevronDown
        className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.bhk ? 'rotate-180' : ''}`}
        />
        </button>
        {expandedSections.bhk && (
            <div className="p-4 space-y-2">
            {bhkOptions.map((bhk) => (
                <label key={bhk} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                type="radio"
                name="bhk"
                checked={filters.bhk === bhk}
                onChange={() => handleFilterChange('bhk', bhk)}
                className="w-4 h-4 text-[#0078DB] accent-[#0078DB]"
                />
                <span className="text-sm text-gray-700">{bhk}</span>
                </label>
            ))}
            </div>
        )}
        </div>):(<></>)}
        </div>
    );

    return (
        <>
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
        <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
        <Filter className="w-4 h-4" />
        Filters
        {hasActiveFilters && (
            <span className="w-2 h-2 bg-[#0078DB] rounded-full" />
        )}
        </button>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Filters</h2>
            <div className="flex items-center gap-2">
            {hasActiveFilters && (
                <button onClick={clearFilters} className="text-sm text-[#0078DB] hover:underline">
                Clear All
                </button>
            )}
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-500" />
            </button>
            </div>
            </div>
            <div className="p-4">{filterContent}</div>
            </div>
            </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20">
        <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
        <Filter className="w-4 h-4" />
        Filters
        </h2>
        {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-[#0078DB] hover:underline">
            Clear All
            </button>
        )}
        </div>
        {filterContent}
        </div>
        </div>
        </>
    );
}
