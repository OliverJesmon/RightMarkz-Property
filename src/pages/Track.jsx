// frontend/src/pages/Track.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { properties as fetchAllProperties } from '../property/Properties.jsx';

export default function Track() {
    const { pid, loading: authLoading } = useAuth();
    const [allProperties, setAllProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!pid || pid.length === 0) {

                if (isMounted) {
                    setIsLoading(false);
                    setAllProperties([]);
                }
                return;
            }

            try {
                setIsLoading(true);

                const all = await fetchAllProperties();

                // Handle different response shapes
                const propertyList = Array.isArray(all) ? all : (all.data || all.Properties || []);

                // Compare IDs as strings
                const pidStrings = pid.map(id => id?.toString?.() || id);

                const tracked = propertyList.filter(p => {
                    const pId = p._id?.toString?.() || p._id;
                    return pidStrings.includes(pId);
                });

                if (isMounted) {
                    setAllProperties(tracked);
                    setError(null);
                }
            } catch (err) {
                console.error('Track fetch error:', err);
                if (isMounted) {
                    setError(err.response?.data?.error || err.message || 'Failed to load properties');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => { isMounted = false; };
    }, [pid]);

    if (authLoading || isLoading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-900">
        My Properties ({allProperties.length})
        </h2>
        <p className="mt-1 text-sm text-gray-500">Manage your tracked properties</p>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
        <tr>
        <th className="px-4 py-3 font-medium sm:px-6">Property</th>
        <th className="px-4 py-3 font-medium sm:px-6">Location</th>
        <th className="px-4 py-3 text-center font-medium sm:px-6">Status</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {allProperties.length === 0 ? (
            <tr>
            <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
            No properties tracked yet
            </td>
            </tr>
        ) : (
            allProperties.map((property) => (
                <tr className="hover:bg-gray-50" key={property._id}>
                <td className="px-4 py-4 sm:px-6">
                <div className="font-medium text-gray-900">{property.propertyName}</div>
                <div className="text-xs text-gray-500 capitalize">{property.propertyType}</div>
                </td>
                <td className="px-4 py-4 text-gray-600 sm:px-6">
                {property.locality}, {property.city}
                </td>

                <td className="px-4 py-4 text-center sm:px-6">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    property.isActive === true
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                {property.status}
                </span>
                </td>
                </tr>
            ))
        )}
        </tbody>
        </table>
        </div>
        </div>
        </div>
    );
}
