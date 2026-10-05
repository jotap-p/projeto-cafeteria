import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    function entrar(event) {
        event.preventDefault();

        if (usuario === "cliente" && senha === "1234") {
            navigate("/cardapio");
        } else {
            alert("Usuário ou senha incorretos!");
        }
    }

    return (
        <div className="container">
            <form onSubmit={entrar}>

                <h1>Login</h1>

                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-field">
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

            </form>
        </div>
    );
}

export default Login;