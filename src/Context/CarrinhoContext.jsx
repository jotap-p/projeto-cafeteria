import { createContext, useContext, useState } from "react";

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);

    const adicionarAoCarrinho = (produto) => {
        setCarrinho([...carrinho, produto]);
    };

    const removerDoCarrinho = (idUnico) => {
        // Agora ele procura o id temporário (idUnico) para remover exatamente a linha em que clicou
        setCarrinho(carrinho.filter((item) => item.idUnico !== idUnico));
    };

    const limparCarrinho = () => {
        setCarrinho([]);
    }

    // O reduce passa por todos os itens somando o preço de cada um, começando do 0
    const valorTotal = carrinho.reduce((total, item) => total + item.preco, 0);

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, valorTotal }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

// O atalho para usarmos em qualquer tela, igual a Laura fez!
export function useCarrinho() {
    return useContext(CarrinhoContext);
}