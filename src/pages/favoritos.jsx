import { useFavoritos } from "../FavoritosContext";
import "./favoritos.css";

export default function Favoritos() {
  const {favoritos} = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <div>
        <h1>Favoritos</h1>
        <p>Você ainda não possui favoritos.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Favoritos</h1>

      {favoritos.map((produto) => (
        <div key={produto.id}>
          <h3>{produto.nome}</h3>
          <p>{produto.categoria}</p>
          <p>R$ {produto.preco.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
