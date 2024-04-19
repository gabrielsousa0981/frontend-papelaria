import React, { useState } from "react";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import { useNavigate } from "react-router-dom";
import '../../global.css';

export default function Cadastrousuario() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleNomeChange = (e) => setNome(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleSenhaChange = (e) => setSenha(e.target.value);

    const salvardados = (e) => {
        e.preventDefault();

        // Verificar se todos os campos estão preenchidos
        if (!nome || !email || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Verificar se a senha tem pelo menos 6 caracteres
        if (senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        const usuario = {
            id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
            nome,
            email,
            senha
        };

        const banco = JSON.parse(localStorage.getItem("usuarios") || "[]");
        banco.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(banco));

        alert("Cadastro concluído!");
        navigate("/listausuario");
    };

    return (
        <div className="dashboard-container">
            <div className="menu">
                <Menu />
            </div>
            <div className="main">
                <Head title="Cadastro de Usuário" />
                <form onSubmit={salvardados}>
                    <input type="text" placeholder="Nome" value={nome} onChange={handleNomeChange} />
                    <input type="email" placeholder="E-mail" value={email} onChange={handleEmailChange} />
                    <input type="password" placeholder="Senha" value={senha} onChange={handleSenhaChange} />
                    <button type="submit" className="btn-salvar">Salvar</button>
                </form>
            </div>
        </div>
    );
}
