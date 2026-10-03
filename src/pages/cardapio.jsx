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
    <div style={{ padding: '40px 5%', fontFamily: 'Helvetica Neue, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#1a1a1a', margin: 0 }}>
          O Nosso Cardápio
        </h1>
        <div style={{ width: '60px', height: '4px', backgroundColor: '#d9a05b', margin: '10px auto 0 auto' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', borderBottom: '1px solid #eaeaea', paddingBottom: '15px' }}>
        
        <button onClick={rolarEsquerda} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#1a1a1a' }}>&#10094;</button>

        <div 
          ref={carrosselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ 
            display: 'flex', 
            gap: '15px', 
            overflowX: 'auto', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            cursor: isDragging ? 'grabbing' : 'grab',
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            width: '100%'
          }}
        >
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              style={{
                flexShrink: 0, 
                padding: '10px 24px',
                background: categoriaAtiva === cat.id ? '#1a1a1a' : '#f5f5f5',
                color: categoriaAtiva === cat.id ? '#d9a05b' : '#666',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button onClick={rolarDireita} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#1a1a1a' }}>&#10095;</button>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
        {produtosExibidos.map((item) => (
          <CardProduto key={item.id} produto={item} />
        ))}
      </div>
    </div>
  );
}