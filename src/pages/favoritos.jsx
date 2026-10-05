import { useFavoritos } from "../Context/FavoritosContext";
import { CardProduto } from "../components/CardProduto";
import { Link } from 'react-router-dom';

export default function Favoritos() {
  const { favoritos } = useFavoritos();

  return (
    <div className="carrinho-container" style={{ minHeight: '60vh' }}>
      
      <div className="carrinho-cabecalho">
        <h1 className="carrinho-titulo">
          Favoritos
        </h1>
      </div>

      {favoritos.length === 0 ? (
        <div className="carrinho-vazio-mensagem">
          <h2 className="carrinho-vazio-h2">
            A sua lista está vazia.
          </h2>
          <p className="carrinho-vazio-p">
            Que tal explorar o nosso cardápio e escolher as suas bebidas preferidas?
          </p>
          <Link to="/cardapio" className="btn-voltar-cardapio">
            Ver Cardápio
          </Link>
        </div>
      ) : (
        <div className="cardapio-grelha-produtos">
          {favoritos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}