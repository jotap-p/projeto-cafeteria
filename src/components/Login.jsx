import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    function entrar(event) {
        event.preventDefault();

        if (usuario === "cliente" && senha === "kroma2026") {
            localStorage.setItem("logado", "true");
            navigate("/cardapio");
        } else {
            alert("Usuário ou senha incorretos!");
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={entrar}>

                <h1>Login</h1>

                <div className="login-input-field">
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
                </div>

                <div className="login-input-field">
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                        <FaLock className="icon" />
                </div>

                <button type="submit">Entrar</button>

                <p className="login-dica">
                    Acesso para avaliação: <br/>
                    Usuário: <strong>cliente</strong> | Senha: <strong>kroma2026</strong>
                </p>

            </form>
        </div>
    );
}

export default Login;