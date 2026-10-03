import { Link, useNavigate } from "react-router-dom";
import { useCarrinho } from "../Context/CarrinhoContext"; 

function Navbar() {
    const navigate = useNavigate();
    const { carrinho } = useCarrinho(); 
    const usuarioLogado = localStorage.getItem("logado") === "true";

    const fazerLogout = () => {
        localStorage.removeItem("logado"); 
        navigate("/login"); 
    };

    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '20px 5%', 
            backgroundColor: '#ffffff', 
            borderBottom: '1px solid #e0e0e0',
            color: '#1a1a1a'
        }}>
            
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#1a1a1a', fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}> 
                    Início 
                </Link>
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '3px' }}>
                    Kroma Coffee
                </span>
            </div>
            
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '25px' }}>
                <Link to="/cardapio" style={{ textDecoration: 'none', color: '#1a1a1a', fontWeight: '500', fontSize: '0.95rem', textTransform: 'uppercase' }}> 
                    Cardápio 
                </Link>
                
                {usuarioLogado ? (
                    <Link to="/carrinho" style={{ textDecoration: 'none', color: '#1a1a1a', fontWeight: '500', fontSize: '0.95rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}> 
                        Carrinho 
                        {carrinho.length > 0 && (
                            <span style={{ background: '#d9a05b', color: '#1a1a1a', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {carrinho.length}
                            </span>
                        )}
                    </Link>
                ) : (
                    <span 
                        title="Faça login para acessar o carrinho"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'not-allowed', opacity: 0.5, fontWeight: '500', fontSize: '0.95rem', textTransform: 'uppercase' }}
                    >
                        Carrinho
                    </span>
                )}

                {usuarioLogado ? (
                    <>
                        <Link to="/favoritos" style={{ textDecoration: 'none', color: '#1a1a1a', fontWeight: '500', fontSize: '0.95rem', textTransform: 'uppercase' }}> 
                            Favoritos 
                        </Link>
                        <button onClick={fazerLogout} style={{ background: 'none', border: 'none', color: '#1a1a1a', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem', textTransform: 'uppercase' }}>
                            Sair
                        </button>
                    </>
                ) : (
                    <Link to="/login" style={{ textDecoration: 'none', color: '#1a1a1a', fontWeight: 'bold', fontSize: '0.95rem', textTransform: 'uppercase' }}> 
                        Entrar 
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;