import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddProperty from "../pages/AddProperty";
import EditProperty from "../pages/EditProperty";
import NotFound from "../pages/NotFound";
import PropertyList from "../pages/PropertyList";
import PropertyDetails from "../pages/PropertDeatails";
import PropertyListAdmin from "../pages/PropertyListAdmin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<PropertyList />} />
      <Route path="/host/add-properties" element={<AddProperty />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
      <Route path="/host/properties" element={<PropertyListAdmin />} />
      <Route path="/edit-property/:id" element={<EditProperty />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
