import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/appRoutes";

function App() {
  const location = useLocation();

  // hide navbar/footer on auth pages
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* NAVBAR */}
      {!hideLayout && <Navbar />}

      {/* MAIN CONTENT */}
      <div className="flex-grow">
        <AppRoutes />
      </div>

      {/* FOOTER */}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;