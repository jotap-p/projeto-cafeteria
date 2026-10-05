import { createContext, useContext, useState } from "react";

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);

    const adicionarAoCarrinho = (produto) => {
        setCarrinho([...carrinho, produto]);
    };

    const removerDoCarrinho = (idUnico) => {
        setCarrinho(carrinho.filter((item) => item.idUnico !== idUnico));
    };

    const limparCarrinho = () => {
        setCarrinho([]);
    }

    const valorTotal = carrinho.reduce((total, item) => total + item.preco, 0);

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, valorTotal }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    return useContext(CarrinhoContext);
}