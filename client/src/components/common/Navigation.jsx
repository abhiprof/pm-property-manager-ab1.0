import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-md flex items-center justify-center font-bold">
              PM
            </div>
            <span className="text-xl font-semibold">PropertyManager</span>
          </Link>

          <ul className="md:flex items-center gap-6">
            <li>
              <Link
                to="/properties"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Properties
              </Link>
            </li>
            <li>
              <Link
                to="/add-properties"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Add Property
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
