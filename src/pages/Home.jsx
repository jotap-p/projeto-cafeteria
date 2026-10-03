import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#ffffff' }}>
      
      <div style={{ 
        position: 'relative',
        width: '100%', 
        minHeight: '65vh',
        backgroundImage: 'url("/imagens/banner-boas-vindas.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end', 
        justifyContent: 'center',
        padding: '0 8%'
      }}>
        
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>

        <div style={{ position: 'relative', zIndex: 2, color: '#fff', maxWidth: '450px', textAlign: 'right' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '15px', fontWeight: '900', lineHeight: '1.1', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Bem-vindo à nossa casa.
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '35px', color: '#eaeaea', fontWeight: '300', lineHeight: '1.5' }}>
            Entre, puxe uma cadeira e descubra o seu novo café favorito na Kroma Coffee.
          </p>
          
          <Link 
            to="/login" 
            style={{ 
              display: 'inline-block', padding: '15px 35px', background: '#1a1a1a', color: '#ffffff', 
              textDecoration: 'none', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '1px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#d9a05b'; e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)'; }}
          >
            Faça o seu login aqui
          </Link>
        </div>
      </div>

      <div style={{ 
        position: 'relative',
        width: '100%', 
        minHeight: '500px', 
        backgroundImage: 'url("/imagens/imagem-cardapio.png")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px'
      }}>
        
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }}></div>

        <div style={{ position: 'relative', zIndex: 2, color: '#fff', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '15px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>
            A sua dose diária de inspiração.
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '35px', color: '#eaeaea', fontWeight: '300', lineHeight: '1.5' }}>
            Grãos selecionados, preparados com paixão e entregues onde você estiver.
          </p>
          
          <Link 
            to="/cardapio" 
            style={{ 
              display: 'inline-block', padding: '15px 40px', background: '#1a1a1a', color: '#ffffff', 
              textDecoration: 'none', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '1px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#d9a05b'; e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)'; }}
          >
            Acesse nosso cardápio
          </Link>
        </div>
      </div>

    </div>
  );
}