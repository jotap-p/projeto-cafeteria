import { Link } from "react-router-dom";

export default function Home() {
  const usuarioLogado = localStorage.getItem("logado") === "true";

  const lidarComCliqueLogin = (e) => {
    if (usuarioLogado) {
      e.preventDefault(); 
      alert("Você já está logado! Fique à vontade para explorar o nosso cardápio.");
    }
  };

  return (
    <div className="home-container">
      
      <div className="banner-boas-vindas">
        <div className="banner-overlay overlay-boas-vindas"></div>
        
        <div className="banner-content content-boas-vindas">
          <h1 className="banner-title title-boas-vindas">Bem-vindo à nossa casa.</h1>
          <p className="banner-text">Entre, puxe uma cadeira e descubra o seu novo café favorito na Kroma Coffee.</p>
          
          <Link to="/login" onClick={lidarComCliqueLogin} className="btn-kroma">
            Faça o seu login aqui
          </Link>
        </div>
      </div>

      <div className="banner-cardapio">
        <div className="banner-overlay overlay-cardapio"></div>
        
        <div className="banner-content content-cardapio">
          <h2 className="banner-title">A sua dose diária de inspiração.</h2>
          <p className="banner-text">Grãos selecionados, preparados com paixão e entregues onde você estiver.</p>
          
          <Link to="/cardapio" className="btn-kroma">
            Acesse nosso cardápio
          </Link>
        </div>
      </div>

    </div>
  );
}