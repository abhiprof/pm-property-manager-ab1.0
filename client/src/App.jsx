import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div>
      <Navigation />
      <AppRoutes />
      <Footer/>
    </div>
  );
}

export default App;
