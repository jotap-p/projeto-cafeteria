import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cardapio from "./pages/cardapio";
import Login from "./components/Login";
import Favoritos from "./pages/favoritos";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Cardapio />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}