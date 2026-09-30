import { useState } from 'react';
import { produtos } from '../data/cardapio';
import { CardProduto } from '../components/CardProduto';

export default function Cardapio() {
  // Define 'bebidas-quentes' como a categoria inicial, conforme sua ideia
  const [categoriaAtiva, setCategoriaAtiva] = useState('bebidas-quentes');

  // Mapeamento dos nomes amigáveis para os botões da barra de navegação
  const categorias = [
    { id: 'bebidas-quentes', label: 'Bebidas Quentes' },
    { id: 'bebidas-geladas', label: 'Bebidas Geladas' },
    { id: 'cafe-tradicional', label: 'Cafés Tradicionais' },
    { id: 'espressos', label: 'Espressos' },
    { id: 'chas', label: 'Chás' },
    { id: 'salgados', label: 'Salgados' },
    { id: 'sobremesas', label: 'Sobremesas' }
  ];

  // Filtra a matriz bruta: só passa para a tela quem tiver a mesma categoria do botão clicado
  const produtosExibidos = produtos.filter((item) => item.categoria === categoriaAtiva);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1>☕ Cardápio</h1>
        <p>Escolha seus cafés e bebidas favoritas</p>
      </header>

      {/* Barra de Navegação de Categorias */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '16px', 
        marginBottom: '40px',
        flexWrap: 'wrap' 
      }}>
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaAtiva(cat.id)}
            style={{
              padding: '10px 20px',
              background: categoriaAtiva === cat.id ? '#00704A' : 'transparent',
              color: categoriaAtiva === cat.id ? '#fff' : '#333',
              border: categoriaAtiva === cat.id ? 'none' : '1px solid #ccc',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Produtos Filtrados */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
        gap: '20px' 
      }}>
        {produtosExibidos.map((item) => (
          <CardProduto key={item.id} produto={item} />
        ))}
      </div>
    </div>
  );
}