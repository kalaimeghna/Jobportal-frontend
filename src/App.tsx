import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/appRoutes";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="flex-grow">
        <AppRoutes />
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default App;