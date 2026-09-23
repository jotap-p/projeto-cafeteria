import { useState } from "react";
import "./favoritos.css";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  if(favoritos.length === 0) 
  return (
    <div>
        <h1>Favoritos</h1>

        <p>
            Voce ainda não possui favoritos.
        </p>
    </div>
  );
}
    
return (
  <div>
    <h1>Favoritos</h1>

    {favoritos.map((produto=>(
        <div key={produto.id}>
            <h2>{produto.nome}</h2>

            <p>{produto.descricao}</p>

            <p>{produto.preco}</p>
            </div>
    )))}
  </div>
);

 
