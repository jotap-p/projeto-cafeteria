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
    <div style={{ 
      background: '#ffffff', borderRadius: '12px', color: '#1a1a1a', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', overflow: 'hidden', border: '1px solid #eaeaea',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)', transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}
    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'; }}
    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)'; }}
    >
      <div>
        <div style={{ textAlign: 'center', backgroundColor: '#f9f9f9', padding: '20px' }}>
          <img src={produto.imagem || 'https://via.placeholder.com/200x200?text=Kroma+Coffee'} alt={produto.nome}
            style={{ width: '100%', height: '220px', objectFit: 'contain', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.1))' }} />
        </div>

        <div style={{ padding: '20px 20px 0 20px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: '800', textTransform: 'uppercase' }}>{produto.nome}</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 20px 0', lineHeight: '1.5' }}>{produto.descricao}</p>

          {permiteTamanho && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', marginBottom: '8px', color: '#888' }}>
                Tamanho
              </label>
              <select value={tamanho} onChange={(e) => setTamanho(e.target.value)} 
                style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#ffffff', color: '#1a1a1a', outline: 'none', fontWeight: '500', cursor: 'pointer' }}>
                <option value="padrao">Padrão (300ml)</option>
                <option value="medio">Médio (400ml) + R$ 2,00</option>
                <option value="grande">Grande (500ml) + R$ 4,00</option>
              </select>
            </div>
          )}

          {isEspresso && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', marginBottom: '8px', color: '#888' }}>
                Variação
              </label>
              <select value={variacaoEspresso} onChange={(e) => setVariacaoEspresso(e.target.value)} 
                style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#ffffff', color: '#1a1a1a', outline: 'none', fontWeight: '500', cursor: 'pointer' }}>
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
            <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#999', marginBottom: '16px' }}>
              Tamanho único: 300ml
            </p>
          )}
        </div>
      </div>

      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0' }}>
        <strong style={{ fontSize: '1.4rem', color: '#1a1a1a', fontWeight: '900' }}>
          R$ {precoFinal.toFixed(2)}
        </strong>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            title="Adicionar aos Favoritos"
            style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: jaFavoritado ? '#e74c3c' : '#1a1a1a', transition: 'background 0.2s ease' }}
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
            style={{ padding: '0 20px', height: '40px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', transition: 'background 0.2s ease' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#d9a05b'} 
            onMouseOut={(e) => e.currentTarget.style.background = '#1a1a1a'}
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