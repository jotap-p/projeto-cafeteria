import { useLocation, Link } from "react-router-dom";

export default function FinalizarCompra() {
  const location = useLocation();
  const pedido = location.state;

  if (!pedido) {
    return (
      <div className="finalizar-erro-container">
        <h2 className="finalizar-erro-titulo">
          Nenhum pedido encontrado.
        </h2>
        <p className="finalizar-erro-texto">
          Parece que acedeu a esta página por engano ou o seu carrinho estava vazio.
        </p>
        <Link to="/cardapio" className="btn-voltar-cardapio-grande">
          Voltar ao Cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="finalizar-sucesso-container">
      
      <div className="finalizar-recibo">
        
        <div className="finalizar-recibo-cabecalho">
          <h1 className="finalizar-recibo-titulo">
            Pedido Confirmado
          </h1>
          <div className="finalizar-linha-destaque"></div>
        </div>
        
        <p className="finalizar-mensagem">
          Obrigado, <strong className="finalizar-cliente-nome">{pedido.nome}</strong>.<br /> 
          O seu pedido <strong className="finalizar-numero-pedido">#{pedido.numeroPedido}</strong> foi registado com sucesso.
        </p>

        <div className="finalizar-resumo-wrapper">
          <h3 className="finalizar-resumo-titulo">Resumo dos Itens</h3>
          <ul className="finalizar-lista-itens">
            {pedido.itens.map((item) => (
              <li key={item.idUnico} className="finalizar-item">
                <span className="finalizar-item-nome">1x {item.nome}</span>
                <span className="finalizar-item-preco">R$ {item.preco.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="finalizar-detalhes-wrapper">
          <div className="finalizar-linha-detalhe">
            <span>Método de Pagamento:</span>
            <span className="finalizar-valor-detalhe">{pedido.pagamento}</span>
          </div>
          <div className="finalizar-linha-detalhe">
            <span>Entrega:</span>
            <span className="finalizar-valor-endereco">{pedido.endereco}</span>
          </div>
          
          <div className="finalizar-linha-total">
            <span className="finalizar-total-label">Total:</span>
            <strong className="finalizar-total-valor">R$ {pedido.total.toFixed(2)}</strong>
          </div>
        </div>

        <div className="finalizar-rodape">
          <Link to="/cardapio" className="btn-novo-pedido">
            Fazer um novo pedido
          </Link>
        </div>

      </div>
    </div>
  );
}