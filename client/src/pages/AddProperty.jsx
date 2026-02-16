import { toast, ToastContainer } from "react-toastify";
import { addProperties } from "../api/hostApi";
import { useState } from "react";

export default function AddProperty() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notify = () => toast.success("Property added successfully! 🎉");
  const notifyError = (msg) => toast.error(msg || "Failed to add property");

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.target);
    const propertyData = {
      propertyName: formData.get("propertyName"),
      location: formData.get("location"),
      price: formData.get("price"),
      imageUrl: formData.get("imageUrl"),
      ownerName: formData.get("ownerName"),
    };

    addProperties(propertyData)
      .then((response) => {
        if (response.status === 201) {
          notify();
          event.target.reset();
        }
      })
      .catch((error) => {
        console.error("Error adding property:", error);
        notifyError("Error adding property. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🏠</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            List Your Property
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Share your property details and reach thousands of potential buyers
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 bg-gradient-to-r from-red-500 via-red-400 to-pink-500"></div>

          <div className="p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Property Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Property Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="propertyName"
                  placeholder="e.g., Luxury Apartment in Downtown"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900 transition-all duration-200"
                />
              </div>

              {/* Location */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Mumbai, Maharashtra"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900 transition-all duration-200"
                />
              </div>

              {/* Price */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-xl text-gray-500">₹</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g., 5000000"
                    required
                    className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="e.g., https://example.com/property.jpg"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900 transition-all duration-200"
                />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Provide a high-quality image URL of your property
                </p>
              </div>

              {/* Owner Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Owner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="e.g., John Doe"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900 transition-all duration-200"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Property...</span>
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      <span>List Property Now</span>
                    </>
                  )}
                </button>
              </div>

              {/* Help Text */}
              <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  <strong>💡 Tip:</strong> Fill out all fields accurately to get maximum visibility and faster responses from potential buyers.
                </p>
              </div>
            </form>
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
