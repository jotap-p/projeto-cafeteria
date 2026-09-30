import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EsquecerSenha.css";

function EsquecerSenha() {
    const [email, setEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");

        const navigate = useNavigate();

        const alterarSenha = (event) => {
            event.preventDefault();

            const usuario = JSON.parse(localStorage.getItem("usuario"));
                if (!usuario){
                    alert("Nenhum usuário cadastrado.");
                    return;
                }

                    if(email !== usuario.email){
                        alert("E-mail não encontrado.");
                        return;
                    }
                        if(!novaSenha){
                            alert("Digite sua senha nova.");
                            return;
                        }

                        usuario.senha = novaSenha;

                        localStorage.setItem("usuario", JSON.stringify(usuario));
                            alert("Senha alterada com sucesso!");
                            navigate("/login");
        };

        return (
            <div className="esquecer-container">
        
                <h1>Esqueceu sua senha?</h1>
        
                <p>
                    Digite seu E-mail cadastrado e escolha uma nova senha.
                </p>
        
                <form onSubmit={alterarSenha}>
        
                    <div className="input-field">
                        <input
                            type="email"
                            placeholder="E-mail cadastrado"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
        
                    <div className="input-field">
                        <input
                            type="password"
                            placeholder="Nova senha"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />
                    </div>
        
                    <button type="submit">
                        Alterar sua senha
                    </button>
        
                </form>
        
            </div>
        );
}

export default EsquecerSenha;