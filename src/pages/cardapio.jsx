import { produtos } from '../data/cardapio';
import { CardProduto } from '../components/CardProduto';

export default function Cardapio() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1>☕ Cardápio</h1>
        <p>Escolha seus cafés e bebidas favoritas</p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
        gap: '20px' 
      }}>
        {produtos.map((item) => (
          <CardProduto key={item.id} produto={item} />
        ))}
      </div>
    </div>
  );
}