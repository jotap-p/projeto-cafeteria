import { useLocation, Link } from "react-router-dom";

export default function FinalizarCompra() {
  const location = useLocation();
  const pedido = location.state;

  if (!pedido) {
    return (
      <div style={{ padding: '40px 5%', fontFamily: 'Helvetica Neue, sans-serif', maxWidth: '1400px', margin: '0 auto', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', color: '#1a1a1a', marginBottom: '20px' }}>
          Nenhum pedido encontrado.
        </h2>
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>
          Parece que acedeu a esta página por engano ou o seu carrinho estava vazio.
        </p>
        <Link 
          to="/cardapio" 
          style={{ display: 'inline-block', padding: '15px 35px', background: '#1a1a1a', color: '#fff', textDecoration: 'none', borderRadius: '30px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', transition: 'background 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.background = '#d9a05b'}
          onMouseOut={(e) => e.currentTarget.style.background = '#1a1a1a'}
        >
          Voltar ao Cardápio
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', fontFamily: 'Helvetica Neue, sans-serif', color: '#1a1a1a' }}>
      
      <div style={{ background: '#ffffff', padding: '50px 40px', borderRadius: '12px', width: '100%', maxWidth: '600px', border: '1px solid #eaeaea', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1a1a1a', fontSize: '2.2rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 10px 0' }}>
            Pedido Confirmado
          </h1>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#d9a05b', margin: '0 auto' }}></div>
        </div>
        
        <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '40px', color: '#555', lineHeight: '1.6' }}>
          Obrigado, <strong style={{ color: '#1a1a1a' }}>{pedido.nome}</strong>.<br /> 
          O seu pedido <strong style={{ color: '#d9a05b', fontSize: '1.2rem' }}>#{pedido.numeroPedido}</strong> foi registado com sucesso.
        </p>

        <div style={{ borderTop: '2px dashed #eaeaea', borderBottom: '2px dashed #eaeaea', padding: '25px 0', marginBottom: '25px' }}>
          <h3 style={{ textTransform: 'uppercase', fontSize: '0.9rem', color: '#888', letterSpacing: '1px', marginBottom: '20px' }}>Resumo dos Itens</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {pedido.itens.map((item) => (
              <li key={item.idUnico} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1.05rem', fontWeight: '500' }}>
                <span style={{ textTransform: 'uppercase' }}>1x {item.nome}</span>
                <span style={{ fontWeight: 'bold' }}>R$ {item.preco.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Método de Pagamento:</span>
            <span style={{ fontWeight: 'bold', color: '#1a1a1a' }}>{pedido.pagamento}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Entrega:</span>
            <span style={{ fontWeight: 'bold', color: '#1a1a1a', textAlign: 'right', maxWidth: '60%' }}>{pedido.endereco}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '15px', borderTop: '1px solid #eaeaea' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Total:</span>
            <strong style={{ fontSize: '1.8rem', color: '#d9a05b', fontWeight: '900' }}>R$ {pedido.total.toFixed(2)}</strong>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link 
            to="/cardapio" 
            style={{ display: 'inline-block', width: '100%', boxSizing: 'border-box', padding: '18px', background: '#1a1a1a', color: '#fff', textDecoration: 'none', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', transition: 'background 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#d9a05b'}
            onMouseOut={(e) => e.currentTarget.style.background = '#1a1a1a'}
          >
            Fazer um novo pedido
          </Link>
        </div>

      </div>
    </div>
  );
}