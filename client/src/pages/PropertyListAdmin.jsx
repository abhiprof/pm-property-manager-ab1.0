import { useEffect, useState } from "react";
import { fetchProperties } from "../api/propertyApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { deleteProperties } from "../api/hostApi";

export default function PropertyListAdmin() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const getAllProperties = async () => {
    try {
      setLoading(true);
      const response = await fetchProperties();
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;

    // Search filter (property name and location only - no owner)
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.propertyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
        default:
          return (a.propertyName || "").localeCompare(b.propertyName || "");
      }
    });

    setFilteredProperties(filtered);
  }, [searchQuery, priceRange, sortBy, properties]);

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    return `₹${price.toLocaleString()}`;
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/edit-property/${id}`);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    try {
      const resp = await deleteProperties(id);
      if (resp.status === 200) {
        toast.success("Property deleted successfully!", {
          autoClose: 3000,
          onClose: () => getAllProperties(),
        });
      } else {
        toast.error("Failed to delete property", {
          autoClose: 3000,
          onClose: () => getAllProperties(),
        });
      }
      getAllProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Manage Properties
          </h1>

          {/* Search Bar */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              ⚙️ {showFilters ? "Hide" : "Show"} Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Filters
                </h2>

                {/* Sort */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Price Range
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full cursor-pointer"
                  />
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    ₹0 - {formatPrice(priceRange[1])}
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPriceRange([0, 10000000]);
                    setSortBy("name");
                  }}
                  className="w-full mt-6 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}

          {/* Properties Grid */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="inline-block animate-spin">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full"></div>
                  </div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Loading properties...
                  </p>
                </div>
              </div>
            ) : filteredProperties.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredProperties.length} of {properties.length}{" "}
                  properties
                </div>
                <div className="flex flex-wrap gap-4">
                  {filteredProperties.map((property) => {
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
                        onClick={() => navigate(`/properties/${id}`)}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-102 flex flex-col w-[calc(33.333%-11px)]"
                      >
                        {/* Image Container */}
                        <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                          <img
                            src={imageUrl}
                            alt={propertyName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/vite.svg";
                            }}
                          />
                          {rating && (
                            <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 rounded-full px-2 py-0.5 text-xs font-bold flex items-center gap-1">
                              ★ {rating}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-3 flex flex-col flex-grow">
                          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                            {propertyName}
                          </h2>

                          <div className="space-y-1 mb-3 text-xs flex-grow">
                            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                              👤{" "}
                              <span className="line-clamp-1">{ownerName}</span>
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                              📍{" "}
                              <span className="line-clamp-1">{location}</span>
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-lg font-bold text-red-600 dark:text-red-500">
                              {formatPrice(price)}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => handleEdit(id, e)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                              >
                                ✎ Edit
                              </button>
                              <button
                                onClick={(e) => handleDelete(id, e)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                              >
                                🗑 Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search filters
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setPriceRange([0, 10000000]);
                      setSortBy("name");
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
