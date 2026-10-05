import { useState } from 'react';
import { useFavoritos } from '../Context/FavoritosContext';
import { useCarrinho } from '../Context/CarrinhoContext';

export function CardProduto({ produto }) {
  const { favoritos, alternarFavorito } = useFavoritos();
  const { adicionarAoCarrinho } = useCarrinho();

  const jaFavoritado = favoritos.some((item) => item.id === produto.id);

  const [tamanho, setTamanho] = useState('padrao');
  const [variacaoEspresso, setVariacaoEspresso] = useState('tradicional');

  const isEspresso = produto.categoria === 'espressos';
  const isCha = produto.categoria === 'chas' || produto.nome.toLowerCase().includes('chá');
  
  const permiteTamanho = !isEspresso && !isCha && [
    'bebidas-quentes', 'bebidas-geladas', 'cafe-tradicional'
  ].includes(produto.categoria);

  let acrescimo = 0;
  if (permiteTamanho) {
    if (tamanho === 'medio') acrescimo = 2.00;
    if (tamanho === 'grande') acrescimo = 4.00;
  }
  if (isEspresso) {
    if (variacaoEspresso === 'doppio') acrescimo = 2.00;
    if (variacaoEspresso === 'macchiato') acrescimo = 2.00;
    if (variacaoEspresso === 'panna') acrescimo = 2.00;
    if (variacaoEspresso === 'grande') acrescimo = 3.00;
    if (variacaoEspresso === 'macchiato-grande') acrescimo = 5.00;
    if (variacaoEspresso === 'panna-grande') acrescimo = 5.00;
  }

  const precoFinal = produto.preco + acrescimo;

  return (
    <div className="card-produto">
      <div>
        <div className="card-imagem-wrapper">
          <img src={produto.imagem || 'https://via.placeholder.com/200x200?text=Kroma+Coffee'} alt={produto.nome} className="card-imagem" />
        </div>

        <div className="card-conteudo">
          <h3 className="card-titulo">{produto.nome}</h3>
          <p className="card-descricao">{produto.descricao}</p>

          {permiteTamanho && (
            <div className="card-seletor-wrapper">
              <label className="card-label">Tamanho</label>
              <select value={tamanho} onChange={(e) => setTamanho(e.target.value)} className="card-select">
                <option value="padrao">Padrão (300ml)</option>
                <option value="medio">Médio (400ml) + R$ 2,00</option>
                <option value="grande">Grande (500ml) + R$ 4,00</option>
              </select>
            </div>
          )}

          {isEspresso && (
            <div className="card-seletor-wrapper">
              <label className="card-label">Variação</label>
              <select value={variacaoEspresso} onChange={(e) => setVariacaoEspresso(e.target.value)} className="card-select">
                <option value="tradicional">Tradicional (Incluso)</option>
                <option value="doppio">Doppio (+ R$ 2,00)</option>
                <option value="macchiato">Macchiato (+ R$ 2,00)</option>
                <option value="panna">Panna (+ R$ 2,00)</option>
                <option value="grande">Grande (+ R$ 3,00)</option>
                <option value="macchiato-grande">Macchiato G (+ R$ 5,00)</option>
                <option value="panna-grande">Panna G (+ R$ 5,00)</option>
              </select>
            </div>
          )}

          {isCha && (
            <p className="card-aviso-cha">Tamanho único: 300ml</p>
          )}
        </div>
      </div>

      <div className="card-rodape">
        <strong className="card-preco">
          R$ {precoFinal.toFixed(2)}
        </strong>
        
        <div className="card-botoes-wrapper">
          <button
            title="Adicionar aos Favoritos"
            className={`card-btn-favorito ${jaFavoritado ? 'ativo' : ''}`}
            onClick={() => {
              const usuarioLogado = localStorage.getItem("logado") === "true";
              if (!usuarioLogado) { alert("Por favor, entre ou crie uma conta para favoritar."); return; }
              alternarFavorito(produto);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={jaFavoritado ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <button 
            className="card-btn-adicionar"
            onClick={() => {
              const usuarioLogado = localStorage.getItem("logado") === "true";
              if (!usuarioLogado) { alert("Por favor, entre ou crie uma conta para adicionar ao carrinho."); return; }
              const produtoParaCarrinho = { ...produto, preco: precoFinal, nome: `${produto.nome} (${isEspresso ? variacaoEspresso : tamanho})`, idUnico: Math.random() };
              adicionarAoCarrinho(produtoParaCarrinho);
              alert(`${produtoParaCarrinho.nome} foi adicionado ao carrinho!`);
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}