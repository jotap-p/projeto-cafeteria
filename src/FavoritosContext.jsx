import { createContext, useContext, useState } from "react";

const FavoritosContext = createContext();

export function
FavoritosProvider({ children }) {
    const [favoritos, setFavoritos] =
    useState([]);

    const alternarFavorito = (produto) => {
      setFavoritos((favoritosAtuais) => {
            const jaFavoritado =
favoritosAtuais.some(
    (item) => item.id === produto.id
);

    if (jaFavoritado) {
        return favoritosAtuais.filter(
            (item) => item.id !== produto.id
        );
    }

    return [...favoritosAtuais, produto];
        });
    };

    return (
        <FavoritosContext.Provider>
   value={{ favoritos, alternarFavorito }}
    {children}
   </FavoritosContext.Provider>
    );
}

export function useFavoritos() {
    return useContext(FavoritosContext);
}
