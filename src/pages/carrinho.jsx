import { useState } from "react";
import { useCarrinho } from "../Context/CarrinhoContext";
import { Link, useNavigate } from "react-router-dom";

export default function Carrinho() {
  const { carrinho, removerDoCarrinho, limparCarrinho, valorTotal } = useCarrinho();
  const navigate = useNavigate();

  // Estados atualizados com todos os campos solicitados
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [metodo, setMetodo] = useState('entrega');
  const [endereco, setEndereco] = useState('');
  const [observacao, setObservacao] = useState('');
  const [pagamento, setPagamento] = useState('');

  if (carrinho.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>
        <h1>🛒 Meu Carrinho</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/cardapio" style={{ color: '#00704A', fontWeight: 'bold' }}>Voltar para o cardápio</Link>
      </div>
    );
  }

  const handleFinalizar = (e) => {
    e.preventDefault(); 

    // Validações de segurança (Campos Obrigatórios)
    if (nome.trim() === '') {
      alert('Por favor, informe o seu nome.');
      return;
    }
    if (telefone.trim() === '') {
      alert('Por favor, informe o seu telefone.');
      return;
    }
    if (metodo === 'entrega' && endereco.trim() === '') {
      alert('Por favor, informe o endereço para entrega.');
      return;
    }
    if (pagamento === '') {
      alert('Por favor, selecione uma forma de pagamento.');
      return;
    }

    // Pacote completo com todos os dados do cliente e do pedido
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

  // Estilo padrão para os inputs para não dar conflito com o fundo escuro do seu CSS
  const inputStyle = { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#333' };
  const labelStyle = { display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <h1>🛒 Meu Carrinho</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {carrinho.map((produto) => (
          <div key={produto.idUnico} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #555', paddingBottom: '10px' }}>
            <span style={{ fontSize: '1.1rem' }}>{produto.nome}</span>
            <span style={{ fontWeight: 'bold' }}>R$ {produto.preco.toFixed(2)}</span>
            <button 
              onClick={() => removerDoCarrinho(produto.idUnico)}
              style={{ background: '#cc0000', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ textAlign: 'right', marginTop: '20px', color: '#00704A' }}>
        Total: R$ {valorTotal.toFixed(2)}
      </h2>

      <form onSubmit={handleFinalizar} style={{ background: '#f4f4f4', padding: '25px', borderRadius: '8px', marginTop: '30px' }}>
        
        <h3 style={{ marginBottom: '15px', color: '#1e3932' }}>Dados do Cliente</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Nome:*</label>
          <input type="text" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Telefone:*</label>
          <input type="text" placeholder="(XX) XXXXX-XXXX" value={telefone} onChange={(e) => setTelefone(e.target.value)} style={inputStyle} />
        </div>

        <h3 style={{ marginBottom: '15px', color: '#1e3932', paddingTop: '10px', borderTop: '1px solid #ccc' }}>Opções de Entrega</h3>
        
        <div style={{ marginBottom: '15px', color: '#333' }}>
          <label style={{ marginRight: '20px', cursor: 'pointer' }}>
            <input type="radio" value="entrega" checked={metodo === 'entrega'} onChange={() => setMetodo('entrega')} style={{ marginRight: '5px' }} />
            Entregar em casa
          </label>
          <label style={{ cursor: 'pointer' }}>
            <input type="radio" value="retirada" checked={metodo === 'retirada'} onChange={() => setMetodo('retirada')} style={{ marginRight: '5px' }} />
            Retirar na loja
          </label>
        </div>

        {metodo === 'entrega' && (
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Endereço de Entrega:*</label>
            <input type="text" placeholder="Ex: Rua das Flores, 123 - Centro" value={endereco} onChange={(e) => setEndereco(e.target.value)} style={inputStyle} />
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Observação (Opcional):</label>
          <textarea 
            placeholder="Alguma instrução especial (Ex: Trocar leite integral por desnatado, sem açúcar...)" 
            value={observacao} 
            onChange={(e) => setObservacao(e.target.value)} 
            rows="3" 
            style={{ ...inputStyle, resize: 'vertical' }} 
          />
        </div>

        <h3 style={{ marginBottom: '15px', color: '#1e3932', paddingTop: '10px', borderTop: '1px solid #ccc' }}>Pagamento</h3>
        <div style={{ marginBottom: '25px' }}>
          <select value={pagamento} onChange={(e) => setPagamento(e.target.value)} style={inputStyle}>
            <option value="">Selecione uma forma de pagamento...</option>
            <option value="Pix">Pix</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '15px', background: '#00704A', color: 'white', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '8px' }}>
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
}