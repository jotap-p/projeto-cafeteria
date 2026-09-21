import { Link } from "react-router-dom"

function Navbar (){
    return (
        <nav className="navbar">
            <span className="navbar-marca">Cafeteria Oliva</span>
            <div className="navbar-links">
                <Link to="/"> Início </Link>
                <Link to="/cardapio"> Cardápio </Link>
                <Link to="/carrinho">Carrinho</Link>
                <Link to="/login"> Entrar </Link>
            </div>
        </nav>
    )
}
export default Navbar;