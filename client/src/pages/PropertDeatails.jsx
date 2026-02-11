import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertiesId } from "../api/propertyApi";

export default function PropertyDetails() {
    const [propertyDetails, setPropertyDetails] = useState([]);
    const { id } = useParams();
    const getPropertiesById = async (id) => {
        try {
            const response = await fetchPropertiesId(id);
            setPropertyDetails(response.data);
        } catch (error) {
            console.error("Error fetching property details:", error);
    
        }
    }
    useEffect(() => {
        getPropertiesById(id);
    }, [id]);
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            {propertyDetails && propertyDetails.propertyName ? (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            {/* Image Section */}
                            <div className="flex items-center justify-center">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <img 
                                        src={propertyDetails.imageUrl} 
                                        alt={propertyDetails.propertyName}
                                        className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.currentTarget.src = '/vite.svg';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="flex flex-col justify-center space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {propertyDetails.propertyName}
                                    </h1>
                                    <p className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold">
                                        ₹{propertyDetails.price?.toLocaleString() || 'N/A'}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="border-l-4 border-indigo-600 pl-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Owner</p>
                                        <p className="text-lg text-gray-900 dark:text-white font-medium">
                                            {propertyDetails.ownerName || 'N/A'}
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-indigo-600 pl-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                                        <p className="text-lg text-gray-900 dark:text-white font-medium">
                                            {propertyDetails.location || 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                <button 
                                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                                    onClick={() => window.history.back()}
                                >
                                    ← Back to Properties
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Loading...</h1>
                        <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch property details.</p>
                    </div>
                </div>
            )}
        </div>
    );
}