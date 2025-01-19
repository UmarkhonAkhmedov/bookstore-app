import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl m-auto px-5 py-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
