import { useLocation, Link } from "react-router-dom";

export default function FinalizarCompra() {
  // O useLocation "pesca" os dados que o carrinho enviou no momento do redirecionamento
  const location = useLocation();
  const pedido = location.state;

  // Trava de segurança: se alguém digitar /finalizar-compra direto na barra do navegador sem ter feito um pedido
  if (!pedido) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#fff' }}>
        <h2>Nenhum pedido recente encontrado.</h2>
        <Link to="/cardapio" style={{ color: '#00704A', fontWeight: 'bold' }}>Voltar ao cardápio</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      
      {/* O "Papel" do recibo */}
      <div style={{ background: '#f9f9f9', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '600px', color: '#333', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
        
        <h1 style={{ color: '#00704A', fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center' }}>
          Pedido confirmado!
        </h1>
        
        <p style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '30px' }}>
          Obrigado, <strong>{pedido.nome}</strong>. O pedido <strong>#{pedido.numeroPedido}</strong> foi registrado.
        </p>

        {/* Detalhes da Compra */}
        <div style={{ borderTop: '2px dashed #ccc', borderBottom: '2px dashed #ccc', padding: '20px 0', marginBottom: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {pedido.itens.map((item) => (
              <li key={item.idUnico} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.1rem' }}>
                <span>1x {item.nome}</span>
                <span>R$ {item.preco.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Totais e Pagamento */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total:</span>
            <strong>R$ {pedido.total.toFixed(2)}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '1.1rem' }}>
            <span>Pagamento:</span>
            <span>{pedido.pagamento}</span>
          </div>
        </div>

        {/* Botão de Novo Pedido */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link 
            to="/cardapio" 
            style={{ display: 'inline-block', padding: '15px 40px', background: '#00704A', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem' }}
          >
            Fazer um novo pedido
          </Link>
        </div>

      </div>
    </div>
  );
}