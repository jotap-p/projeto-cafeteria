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
      <div className="carrinho-vazio-container">
        <div className="carrinho-cabecalho">
          <h1 className="carrinho-titulo">
            Carrinho
          </h1>
        </div>
        <div className="carrinho-vazio-mensagem">
          <h2 className="carrinho-vazio-h2">
            O seu carrinho está vazio.
          </h2>
          <p className="carrinho-vazio-p">
            Ainda não escolheu nenhuma bebida para acompanhar o seu dia.
          </p>
          <Link to="/cardapio" className="btn-voltar-cardapio">
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

  return (
    <div className="carrinho-container">
      
      <div className="carrinho-cabecalho">
        <h1 className="carrinho-titulo">
          Carrinho
        </h1>
      </div>
      
      <div className="carrinho-lista">
        {carrinho.map((produto) => (
          <div key={produto.idUnico} className="carrinho-item">
            <span className="carrinho-item-nome">{produto.nome}</span>
            
            <div className="carrinho-item-detalhes">
              <span className="carrinho-item-preco">R$ {produto.preco.toFixed(2)}</span>
              
              <button 
                onClick={() => removerDoCarrinho(produto.idUnico)}
                className="btn-remover-item"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="carrinho-total-wrapper">
        Total: <span className="carrinho-total-valor">R$ {valorTotal.toFixed(2)}</span>
      </h2>

      <form onSubmit={handleFinalizar} className="carrinho-form">
        
        <h3 className="carrinho-form-titulo">Dados do Cliente</h3>
        
        <div className="carrinho-grid-dupla">
          <div>
            <label className="carrinho-label">Nome Completo</label>
            <input type="text" placeholder="Ex: João Silva" value={nome} onChange={(e) => setNome(e.target.value)} className="carrinho-input" />
          </div>
          <div>
            <label className="carrinho-label">Telefone</label>
            <input type="text" placeholder="(XX) XXXXX-XXXX" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="carrinho-input" />
          </div>
        </div>

        <h3 className="carrinho-form-titulo-divisor">Opções de Entrega</h3>
        
        <div className="carrinho-opcoes-entrega">
          <label className="carrinho-radio-label">
            <input type="radio" value="entrega" checked={metodo === 'entrega'} onChange={() => setMetodo('entrega')} className="carrinho-radio-input" />
            Entregar em casa
          </label>
          <label className="carrinho-radio-label">
            <input type="radio" value="retirada" checked={metodo === 'retirada'} onChange={() => setMetodo('retirada')} className="carrinho-radio-input" />
            Retirar na loja
          </label>
        </div>

        {metodo === 'entrega' && (
          <div className="carrinho-form-espacamento">
            <label className="carrinho-label">Endereço Completo</label>
            <input type="text" placeholder="Ex: Av. Paulista, 1578 - Apto 32" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="carrinho-input" />
          </div>
        )}

        <div className="carrinho-form-espacamento">
          <label className="carrinho-label">Observações Especiais (Opcional)</label>
          <textarea 
            placeholder="Alguma restrição ou pedido especial?" 
            value={observacao} 
            onChange={(e) => setObservacao(e.target.value)} 
            rows="2" 
            className="carrinho-textarea" 
          />
        </div>

        <h3 className="carrinho-form-titulo-divisor">Pagamento</h3>
        
        <div className="carrinho-select-wrapper">
          <select value={pagamento} onChange={(e) => setPagamento(e.target.value)} className="carrinho-select">
            <option value="">Selecione a forma de pagamento...</option>
            <option value="Pix">Pix (Recomendado)</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>

        <button type="submit" className="btn-confirmar-pedido">
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
}