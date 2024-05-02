import { useState } from "react";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import { useNavigate } from "react-router-dom";

import '../../global.css';

export default function Cadastrousuario() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSalvarDados = (e) => {
        e.preventDefault();
        // Verifica se todos os campos foram preenchidos
        if (nome && email && senha) {
            const usuario = {
                id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
                nome,
                email,
                senha
            };
            const banco = JSON.parse(localStorage.getItem("usuarios") || "[]");
            banco.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(banco));
            alert("Dados Salvos com Sucesso!!!!!")
            navigate("/listausuario");
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="menu">
                <Menu />
            </div>
            <div className="main">
                <Head title="Cadastro de Usuário" />

                <form onSubmit={handleSalvarDados}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button type="submit" className="btn-salvar">
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    );
}
