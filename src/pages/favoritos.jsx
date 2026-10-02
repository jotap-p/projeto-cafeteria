import { useFavoritos } from "../Context/FavoritosContext";
import { CardProduto } from "../components/CardProduto";
import "./favoritos.css";

export default function Favoritos() {
  const { favoritos } = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Meus Favoritos ❤️</h1>
        <p>Você ainda não possui nenhum café favoritado.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Meus Favoritos ❤️</h1>

      <div className="lista-favoritos" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {favoritos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}