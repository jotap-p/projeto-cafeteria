import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (
            usuario &&
            usuario.email === username &&
            usuario.senha === password
        ) {
            navigate("/cardapio");
        } else {
            alert("E-mail ou senha incorretos!");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>

                <h1>Acesse a Cafeteria</h1>

                <div className="input-field">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className="icon" />
                </div>

                <div className="recall-forget">
                    <label>
                        <input type="checkbox" />
                        Lembre de mim
                    </label>

                    <Link to="/EsquecerSenha">Esqueceu a Senha?</Link>
                </div>

                <button type="submit">Entrar</button>

                <div className="signup-link">
                    <p>
                        Não tem uma conta?{" "}
                        <Link to="/Registro">Registrar</Link>
                    </p>
                </div>

            </form>
        </div>
    );
};

export default Login;