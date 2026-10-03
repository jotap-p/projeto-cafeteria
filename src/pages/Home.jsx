import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#f4f4f4' }}>
      
      <div style={{ width: '100%', background: '#fff' }}>
        <img 
          src="public/imagens/imagem-cardapio.png" 
          alt="Banner Promocional" 
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
        />
      </div>

      <div style={{ 
        position: 'relative',
        width: '100%', 
        minHeight: '500px',
        backgroundImage: '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px'
      }}>
        
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1
        }}></div>

        <div style={{ position: 'relative', zIndex: 2, color: '#fff', maxWidth: '800px' }}>
          <h2 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '10px', 
            fontWeight: 'bold', 
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            A sua dose diária de inspiração.
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#eaeaea' }}>
            Grãos selecionados, preparados com paixão e entregues onde você estiver.
          </p>
          
          <Link 
            to="/cardapio" 
            style={{ 
              display: 'inline-block',
              padding: '15px 40px', 
              background: '#00704A', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '30px', 
              fontWeight: 'bold', 
              fontSize: '1.2rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            Acesse nosso cardápio
          </Link>
        </div>
      </div>

    </div>
  );
}