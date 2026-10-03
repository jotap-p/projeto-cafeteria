import { useFavoritos } from "../Context/FavoritosContext";
import { CardProduto } from "../components/CardProduto";
import { Link } from 'react-router-dom';

export default function Favoritos() {
  const { favoritos } = useFavoritos();

  return (
    <div style={{ padding: '40px 5%', fontFamily: 'Helvetica Neue, sans-serif', maxWidth: '1400px', margin: '0 auto', minHeight: '60vh' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '900', 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          color: '#1a1a1a', 
          borderLeft: '5px solid #d9a05b', 
          paddingLeft: '15px', 
          margin: 0 
        }}>
          Favoritos
        </h1>
      </div>

      {favoritos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: 'bold', color: '#1a1a1a' }}>
            A sua lista está vazia.
          </h2>
          <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
            Que tal explorar o nosso cardápio e escolher as suas bebidas preferidas?
          </p>
          <Link 
            to="/cardapio" 
            style={{
              display: 'inline-block',
              padding: '12px 35px',
              background: '#1a1a1a',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '30px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'background 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#d9a05b'}
            onMouseOut={(e) => e.currentTarget.style.background = '#1a1a1a'}
          >
            Ver Cardápio
          </Link>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '30px' 
        }}>
          {favoritos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}