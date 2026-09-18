import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

import "./App.css"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Cardapio from "./data/cardapio"

function App() {
  return (
    <div>
      <h1>Cafeteria - Trabalho da Faculdade</h1>
      <p>Seja bem-vindo ao nosso e-commerce de café!</p>

      <Footer />
    </div>
    
  );
}

export default App;
