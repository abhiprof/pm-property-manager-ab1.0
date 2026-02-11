import { useEffect, useState } from "react";
import { fetchProperties } from "../api/propertyApi";
import { useNavigate } from "react-router-dom";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
const navigate = useNavigate();
  const getAllProperties = async () => {
    try {
      const response = await fetchProperties();
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <div className="p-6">
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => {
            const id = property.id || property.idproperty;
            const {
              imageUrl,
              propertyName,
              ownerName,
              price,
              location,
              rating,
            } = property;

            return (
              <div
                key={id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex cursor-pointer"
                onClick={()=>navigate(`/properties/${id}`)}

              >
                <div className="h-60 w-60 bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={propertyName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/vite.svg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {propertyName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Owner: {ownerName}</p>
                  <p className="text-sm text-gray-500">Location: {location}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-indigo-600 font-bold">₹{price}</span>
                    <div className="text-yellow-500">
                      {Array.from({ length: rating || 0 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">No properties found.</p>
      )}
    </div>
  );
}
