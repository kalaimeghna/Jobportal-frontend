import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import AppRoutes from "./routes/appRoutes";


function App() {

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <div className="flex-grow">

        <AppRoutes />

      </div>

      <Footer />

    </div>
  );
}

export default App;