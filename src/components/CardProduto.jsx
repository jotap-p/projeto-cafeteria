import { useState } from 'react';

export function CardProduto({ produto }) {
  const [tamanho, setTamanho] = useState('padrao');
  const [variacaoEspresso, setVariacaoEspresso] = useState('tradicional');

  const isEspresso = produto.categoria === 'espressos';
  const isCha = produto.categoria === 'chas' || produto.nome.toLowerCase().includes('chá');
  
  const permiteTamanho = !isEspresso && !isCha && [
    'bebidas-quentes',
    'bebidas-geladas',
    'cafes-tradicionais'
  ].includes(produto.categoria);

  // Cálculo de preço dinâmico
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
      border: '1px solid #e0e0e0', 
      padding: '20px', 
      borderRadius: '8px', 
      background: '#fff', 
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>{produto.nome}</h3>
        <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 16px 0' }}>{produto.descricao}</p>

        {/* Seletor para Bebidas: P / M / G */}
        {permiteTamanho && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>
              Tamanho:
            </label>
            <select value={tamanho} onChange={(e) => setTamanho(e.target.value)} style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="padrao">Padrão (300ml)</option>
              <option value="medio">Médio (400ml) + R$ 2,00</option>
              <option value="grande">Grande (500ml) + R$ 4,00</option>
            </select>
          </div>
        )}

        {/* Seletor exclusivo para Espressos */}
        {isEspresso && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>
              Escolha o seu Espresso:
            </label>
            <select value={variacaoEspresso} onChange={(e) => setVariacaoEspresso(e.target.value)} style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="tradicional">Espresso Tradicional (Incluso)</option>
              <option value="doppio">Espresso Doppio (+ R$ 2,00)</option>
              <option value="macchiato">Espresso Macchiato (+ R$ 2,00)</option>
              <option value="panna">Espresso Panna (+ R$ 2,00)</option>
              <option value="grande">Espresso Grande (+ R$ 3,00)</option>
              <option value="macchiato-grande">Espresso Macchiato Grande (+ R$ 5,00)</option>
              <option value="panna-grande">Espresso Panna Grande (+ R$ 5,00)</option>
            </select>
          </div>
        )}

        {/* Aviso de Chás */}
        {isCha && (
          <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#777', marginBottom: '16px' }}>
            Tamanho único: 300ml
          </p>
        )}
      </div>

      {/* Preço e Botão */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <strong style={{ fontSize: '1.25rem', color: '#1e3932' }}>
          R$ {precoFinal.toFixed(2)}
        </strong>
        <button 
          style={{ padding: '8px 16px', background: '#00704A', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => alert(`Adicionado: ${produto.nome} (${isEspresso ? variacaoEspresso : tamanho}) - R$ ${precoFinal.toFixed(2)}`)}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}