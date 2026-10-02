import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCarrinho } from "../Context/CarrinhoContext"; 

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const { carrinho } = useCarrinho(); 

    const usuarioLogado = localStorage.getItem("logado") === "true";

    const fazerLogout = () => {
        localStorage.removeItem("logado"); 
        navigate("/login"); 
    };

    return (
        <nav className="navbar">
            <span className="navbar-marca">Cafeteria Oliva</span>
            
            <div className="navbar-links">
                <Link to="/"> Início </Link>
                <Link to="/cardapio"> Cardápio </Link>
                
                {usuarioLogado ? (
                    <Link to="/carrinho" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}> 
                        Carrinho 
                        {carrinho.length > 0 && (
                            <span style={{ background: '#00704A', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', marginTop: '-2px' }}>
                                {carrinho.length}
                            </span>
                        )}
                    </Link>
                ) : (
                    <span 
                        title="Faça login para acessar o carrinho"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'not-allowed', opacity: 0.6 }}
                    >
                        Carrinho
                    </span>
                )}

                {usuarioLogado ? (
                    <>
                        <Link to="/favoritos"> Favoritos </Link>
                        <button onClick={fazerLogout} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit', fontSize: '16px' }}>
                            Sair
                        </button>
                    </>
                ) : (
                    <Link to="/login"> Entrar </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;