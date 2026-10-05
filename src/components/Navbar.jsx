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
        <nav className="navbar-container">
            
            <div className="navbar-section-left">
                <Link to="/" className="navbar-link navbar-link-bold"> 
                    Início 
                </Link>
            </div>

            <div className="navbar-section-center">
                <span className="navbar-logo">
                    Kroma Coffee
                </span>
            </div>
            
            <div className="navbar-section-right">
                <Link to="/cardapio" className="navbar-link"> 
                    Cardápio 
                </Link>
                
                {usuarioLogado ? (
                    <Link to="/carrinho" className="navbar-link navbar-carrinho-link"> 
                        Carrinho 
                        {carrinho.length > 0 && (
                            <span className="navbar-badge">
                                {carrinho.length}
                            </span>
                        )}
                    </Link>
                ) : (
                    <span 
                        title="Faça login para aceder ao carrinho"
                        className="navbar-carrinho-disabled"
                    >
                        Carrinho
                    </span>
                )}

                {usuarioLogado ? (
                    <>
                        <Link to="/favoritos" className="navbar-link"> 
                            Favoritos 
                        </Link>
                        <button onClick={fazerLogout} className="navbar-btn-sair">
                            Sair
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="navbar-link navbar-link-bold"> 
                        Entrar 
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;