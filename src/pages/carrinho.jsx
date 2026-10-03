import { useState } from "react";
import { useCarrinho } from "../Context/CarrinhoContext";
import { Link, useNavigate } from "react-router-dom";

export default function Carrinho() {
  const { carrinho, removerDoCarrinho, limparCarrinho, valorTotal } = useCarrinho();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [metodo, setMetodo] = useState('entrega');
  const [endereco, setEndereco] = useState('');
  const [observacao, setObservacao] = useState('');
  const [pagamento, setPagamento] = useState('');

  if (carrinho.length === 0) {
    return (
      <div style={{ padding: '40px 5%', fontFamily: 'Helvetica Neue, sans-serif', maxWidth: '1400px', margin: '0 auto', minHeight: '60vh' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#1a1a1a', borderLeft: '5px solid #d9a05b', paddingLeft: '15px', margin: 0 }}>
            Carrinho
          </h1>
        </div>
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: 'bold', color: '#1a1a1a' }}>
            O seu carrinho está vazio.
          </h2>
          <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
            Ainda não escolheu nenhuma bebida para acompanhar o seu dia.
          </p>
          <Link 
            to="/cardapio" 
            style={{ display: 'inline-block', padding: '12px 35px', background: '#1a1a1a', color: '#fff', textDecoration: 'none', borderRadius: '30px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', transition: 'background 0.2s ease' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#d9a05b'}
            onMouseOut={(e) => e.currentTarget.style.background = '#1a1a1a'}
          >
            Ver Cardápio
          </Link>
        </div>
      </div>
    );
  }

  const handleFinalizar = (e) => {
    e.preventDefault(); 
    if (nome.trim() === '') return alert('Por favor, informe o seu nome.');
    if (telefone.trim() === '') return alert('Por favor, informe o seu telefone.');
    if (metodo === 'entrega' && endereco.trim() === '') return alert('Por favor, informe o endereço para entrega.');
    if (pagamento === '') return alert('Por favor, selecione uma forma de pagamento.');

    const dadosDoPedido = {
      itens: carrinho,
      total: valorTotal,
      nome: nome,
      telefone: telefone,
      metodo: metodo,
      endereco: metodo === 'entrega' ? endereco : 'Retirada na loja',
      observacao: observacao,
      pagamento: pagamento,
      numeroPedido: Math.floor(Math.random() * 90000) + 10000 
    };

    limparCarrinho(); 
    navigate('/finalizar-compra', { state: dadosDoPedido }); 
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '0', border: '1px solid #ccc', borderBottom: '2px solid #1a1a1a', backgroundColor: '#fff', color: '#1a1a1a', outline: 'none', fontFamily: 'inherit', fontSize: '0.95rem' };
  const labelStyle = { display: 'block', marginBottom: '8px', color: '#888', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' };

  return (
    <div style={{ padding: '40px 5%', fontFamily: 'Helvetica Neue, sans-serif', maxWidth: '1000px', margin: '0 auto', color: '#1a1a1a' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#1a1a1a', borderLeft: '5px solid #d9a05b', paddingLeft: '15px', margin: 0 }}>
          Carrinho
        </h1>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {carrinho.map((produto) => (
          <div key={produto.idUnico} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '15px' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{produto.nome}</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontWeight: '900', fontSize: '1.2rem' }}>R$ {produto.preco.toFixed(2)}</span>
              
              <button 
                onClick={() => removerDoCarrinho(produto.idUnico)}
                style={{ background: 'transparent', color: '#c0392b', border: '1px solid #c0392b', padding: '6px 15px', borderRadius: '30px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', transition: 'all 0.2s ease' }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#c0392b'; e.currentTarget.style.color = '#fff'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c0392b'; }}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ textAlign: 'right', marginTop: '30px', color: '#1a1a1a', fontSize: '1.8rem', fontWeight: '900' }}>
        Total: <span style={{ color: '#d9a05b' }}>R$ {valorTotal.toFixed(2)}</span>
      </h2>

      <form onSubmit={handleFinalizar} style={{ background: '#f9f9f9', padding: '40px', borderRadius: '12px', marginTop: '40px', border: '1px solid #eaeaea', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        
        <h3 style={{ marginBottom: '25px', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.2rem' }}>Dados do Cliente</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Nome Completo</label>
            <input type="text" placeholder="Ex: João Silva" value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Telefone</label>
            <input type="text" placeholder="(XX) XXXXX-XXXX" value={telefone} onChange={(e) => setTelefone(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <h3 style={{ marginBottom: '25px', color: '#1a1a1a', paddingTop: '20px', borderTop: '1px solid #eaeaea', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.2rem' }}>Opções de Entrega</h3>
        
        <div style={{ display: 'flex', gap: '30px', marginBottom: '25px', color: '#1a1a1a', fontWeight: '500' }}>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="radio" value="entrega" checked={metodo === 'entrega'} onChange={() => setMetodo('entrega')} style={{ accentColor: '#1a1a1a', transform: 'scale(1.2)' }} />
            Entregar em casa
          </label>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="radio" value="retirada" checked={metodo === 'retirada'} onChange={() => setMetodo('retirada')} style={{ accentColor: '#1a1a1a', transform: 'scale(1.2)' }} />
            Retirar na loja
          </label>
        </div>

        {metodo === 'entrega' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Endereço Completo</label>
            <input type="text" placeholder="Ex: Av. Paulista, 1578 - Apto 32" value={endereco} onChange={(e) => setEndereco(e.target.value)} style={inputStyle} />
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Observações Especiais (Opcional)</label>
          <textarea 
            placeholder="Alguma restrição ou pedido especial?" 
            value={observacao} 
            onChange={(e) => setObservacao(e.target.value)} 
            rows="2" 
            style={{ ...inputStyle, resize: 'vertical' }} 
          />
        </div>

        <h3 style={{ marginBottom: '25px', color: '#1a1a1a', paddingTop: '20px', borderTop: '1px solid #eaeaea', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.2rem' }}>Pagamento</h3>
        
        <div style={{ marginBottom: '35px' }}>
          <select value={pagamento} onChange={(e) => setPagamento(e.target.value)} style={{...inputStyle, cursor: 'pointer'}}>
            <option value="">Selecione a forma de pagamento...</option>
            <option value="Pix">Pix (Recomendado)</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', padding: '18px', background: '#1a1a1a', color: 'white', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', border: 'none', borderRadius: '30px', transition: 'background 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.background = '#d9a05b'}
          onMouseOut={(e) => e.currentTarget.style.background = '#1a1a1a'}
        >
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
}