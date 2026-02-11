import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddProperty from "../pages/AddProperty";
import EditProperty from "../pages/EditProperty";
import NotFound from "../pages/NotFound";
import PropertyList from "../pages/PropertyList";
import PropertyDetails from "../pages/PropertDeatails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<PropertyList />} />
      <Route path="/add-properties" element={<AddProperty />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
