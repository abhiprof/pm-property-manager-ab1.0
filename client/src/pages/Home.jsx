import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProperties } from "../api/propertyApi";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  const metroCities = [
    { name: "Delhi", emoji: "🏛️" },
    { name: "Mumbai", emoji: "🌊" },
    { name: "Bangalore", emoji: "💼" },
    { name: "Hyderabad", emoji: "🌃" },
    { name: "Chennai", emoji: "🏖️" },
    { name: "Kolkata", emoji: "🎭" },
    { name: "Pune", emoji: "🏞️" },
    { name: "Ahmedabad", emoji: "🏭" },
  ];

  const whyChooseFeatures = [
    {
      id: 1,
      icon: "👤",
      title: "Direct Connection",
      description: "Connect directly with verified property owners and save on brokerage fees"
    },
    {
      id: 2,
      icon: "📋",
      title: "Easy Listing",
      description: "Simple and quick listing process. Share via WhatsApp and other platforms"
    },
    {
      id: 3,
      icon: "❤️",
      title: "Shortlist Easily",
      description: "Extensive property information makes it easy to compare and shortlist"
    },
    {
      id: 4,
      icon: "📄",
      title: "Agreement Help",
      description: "Get assistance in creating rental agreements and legal paperwork"
    },
  ];

  const statsData = [
    {
      id: 1,
      number: "₹130 cr+",
      label: "Brokerage Saved Monthly"
    },
    {
      id: 2,
      number: "30 Lakh+",
      label: "Customers Connected Monthly"
    },
    {
      id: 3,
      number: "2 Lakh+",
      label: "New Listings Monthly"
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${searchQuery}`);
    }
  };

  const scroll = (direction) => {
    const container = document.getElementById("cities-scroll");
    if (container) {
      const scrollAmount = 300;
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Find Your Perfect Property
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover properties in India's premier locations without broker charges
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Search by city, location, or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-6 py-4 text-gray-900 dark:text-white dark:bg-gray-800 dark:placeholder-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 font-semibold transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Why Choose PropertyManager Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-1 bg-red-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose PropertyManager?</h2>
              <div className="w-12 h-1 bg-red-500 rounded-full"></div>
            </div>
          </div>

          <div className="flex">
            {whyChooseFeatures.map((feature) => (
              <div key={feature.id} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explore Metro Cities Section - Horizontal Carousel */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-1 bg-red-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Metro Cities</h2>
              <div className="w-12 h-1 bg-red-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Browse properties in India's major metropolitan areas
            </p>
          </div>

          {/* Horizontal Carousel */}
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-all"
            >
              ←
            </button>

            <div
              id="cities-scroll"
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-16"
              style={{ scrollBehavior: "smooth" }}
            >
              {metroCities.map((city, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 group cursor-pointer"
                  onClick={() => setSearchQuery(city.name)}
                >
                  <div className="bg-gradient-to-br from-indigo-500 to-red-500 rounded-2xl p-8 text-white text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
                    <div className="text-6xl mb-4">{city.emoji}</div>
                    <h3 className="text-2xl font-bold">{city.name}</h3>
                    <p className="text-white opacity-90 mt-2 text-sm">Explore Properties</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* We Make A Difference Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-1 bg-red-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">We Make A Difference</h2>
              <div className="w-12 h-1 bg-red-500 rounded-full"></div>
            </div>
          </div>

          <div className="flex justify-around">
            {statsData.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center">
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-4 border-red-500 flex items-center justify-center">
                    <span className="text-4xl font-bold text-red-500">{stat.number}</span>
                  </div>
                </div>
                <p className="text-center text-lg font-medium text-gray-900 dark:text-white">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Find Your Home?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Join thousands of satisfied users finding their dream properties
          </p>
          <button
            onClick={() => navigate("/properties")}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            Browse All Properties →
          </button>
        </div>
      </div>
    </div>
  );
}
