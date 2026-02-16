import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl">
        {/* Animated 404 */}
        <div className="mb-8 relative">
          <div className="text-9xl md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-pink-500 animate-pulse">
            404
          </div>
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-500 to-pink-500 opacity-20 -z-10 animate-pulse"></div>
        </div>

        {/* Emoji Animation */}
        <div className="text-7xl mb-8 animate-bounce">
          🏠
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          We couldn't find the property or page you're looking for. It might have been moved, 
          deleted, or the URL might be incorrect.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <span>🏠</span>
            <span>Go to Home</span>
          </button>

          <button
            onClick={() => navigate("/properties")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <span>🔍</span>
            <span>Browse Properties</span>
          </button>
        </div>

        {/* Additional Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <button
            onClick={() => navigate("/add-properties")}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-300 font-semibold transition-colors flex items-center gap-1"
          >
            <span>➕</span>
            <span>List a Property</span>
          </button>
          <span className="text-gray-400 hidden sm:inline">•</span>
          <button
            onClick={() => window.history.back()}
            className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors flex items-center gap-1"
          >
            <span>⬅️</span>
            <span>Go Back</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-red-500 rounded-full"></div>
            <span className="text-4xl">🏢</span>
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-red-500 rounded-full"></div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Need help? Contact us or explore other properties
          </p>
        </div>
      </div>

      {/* Background floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}