import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Navigation from "./components/common/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <AppRoutes />
    </div>
  );
}

export default App;
