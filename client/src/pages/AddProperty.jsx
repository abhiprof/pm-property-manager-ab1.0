import { toast, ToastContainer } from "react-toastify";
import { addProperties } from "../api/hostApi";

export default function AddProperty() {
    const notify = () => toast('Property added successfully!');
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const propertyData = {
      propertyName: formData.get("propertyName"),
      location: formData.get("location"),
      price: formData.get("price"),
      imageUrl: formData.get("imageUrl"),
      ownerName: formData.get("ownerName"),
    };

    console.log(propertyData);
    addProperties(propertyData).then((response) => {
      if(response.status === 201) {
        notify();
      }
    }).catch((error) => {
      console.error("Error adding property:", error);
    });     
  }
 
  return (
    <div>
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Add Property</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Property Name</label>
            <input
              type="text"
              name="propertyName"
              required
              className="mt-1 block w-full rounded-md dark:text-gray-300 border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <input
              type="text"
              name="location"
              required
              className="mt-1 block w-full rounded-md dark:text-gray-300 border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
            <input
              type="number"
              name="price"
              required
              className="mt-1 block w-full rounded-md dark:text-gray-300 border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              required
              className="mt-1 block w-full rounded-md dark:text-gray-300 border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              required
              className="mt-1 block w-full rounded-md dark:text-gray-300 border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>

    </div>
    <ToastContainer/>
    </div>
  );
}
