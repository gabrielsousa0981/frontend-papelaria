import React, { useState } from "react";
import '../../global.css';
import logo from '../../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Logon() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Verificar se os campos de email e senha estão vazios
        if (!email || !senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        // Obtenha a lista de usuários cadastrados
        const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios") || "[]");

        // Verifique se o email e a senha correspondem a um usuário cadastrado
        const usuario = usuariosCadastrados.find(user => user.email === email && user.senha === senha);
        if (usuario) {
            navigate('/dashboard');
        } else {
            setError('Email ou senha incorretos');
        }
    };

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} width={200} alt="Logo" />
                <h1>Faça seu login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button className="button_login" type="submit">
                        Entrar
                    </button>
                    {error && <p>{error}</p>}
                </form>
            </section>
        </div>
    )
}
