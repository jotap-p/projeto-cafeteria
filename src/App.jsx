import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cardapio from "./pages/cardapio";
import Carrinho from "./pages/carrinho";
import Login from "./components/Login";
import Favoritos from "./pages/favoritos";
import FinalizarCompra from "./pages/FinalizarCompra";
import { FavoritosProvider } from './Context/FavoritosContext';
import { CarrinhoProvider } from './Context/CarrinhoContext';

export default function App() {
  return (
    <FavoritosProvider>
      {/* Colocamos o CarrinhoProvider aqui para abraçar o site todo! */}
      <CarrinhoProvider>
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cardapio" element={<Cardapio />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/finalizar-compra" element={<FinalizarCompra />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </CarrinhoProvider>
    </FavoritosProvider>
  );
}