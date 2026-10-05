import { useState, useRef } from 'react';
import { produtos } from '../data/cardapio';
import { CardProduto } from '../components/CardProduto';

export default function Cardapio() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('bebidas-quentes');
  
  const carrosselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categorias = [
    { id: 'bebidas-quentes', label: 'Bebidas Quentes' },
    { id: 'bebidas-geladas', label: 'Bebidas Geladas' },
    { id: 'cafe-tradicional', label: 'Cafés Tradicionais' },
    { id: 'espressos', label: 'Espressos' },
    { id: 'chas', label: 'Chás' },
    { id: 'salgados', label: 'Salgados' },
    { id: 'sobremesas', label: 'Sobremesas' }
  ];

  const produtosExibidos = produtos.filter((item) => item.categoria === categoriaAtiva);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carrosselRef.current.offsetLeft);
    setScrollLeft(carrosselRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carrosselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carrosselRef.current.scrollLeft = scrollLeft - walk;
  };

  const rolarEsquerda = () => carrosselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  const rolarDireita = () => carrosselRef.current.scrollBy({ left: 200, behavior: 'smooth' });

  return (
    <div className="cardapio-container">
      
      <div className="cardapio-cabecalho">
        <h1 className="cardapio-titulo">
          O Nosso Cardápio
        </h1>
        <div className="cardapio-linha-destaque"></div>
      </div>

      <div className="cardapio-navegacao">
        
        <button onClick={rolarEsquerda} className="cardapio-btn-seta">&#10094;</button>

        <div 
          ref={carrosselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="cardapio-carrossel"
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            scrollBehavior: isDragging ? 'auto' : 'smooth'
          }}
        >
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`cardapio-btn-categoria ${categoriaAtiva === cat.id ? 'ativa' : 'inativa'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button onClick={rolarDireita} className="cardapio-btn-seta">&#10095;</button>

      </div>

      <div className="cardapio-grelha-produtos">
        {produtosExibidos.map((item) => (
          <CardProduto key={item.id} produto={item} />
        ))}
      </div>
    </div>
  );
}