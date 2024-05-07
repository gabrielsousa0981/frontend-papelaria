import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function EditarUsuario() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    // Carregar os dados do usuário com o ID fornecido e preencher os campos
    const usuario = JSON.parse(localStorage.getItem("usuarios") || "[]").find(user => user.id === id);
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
      setSenha(usuario.senha);
    }
  }, [id]);

  const salvarDados = (e) => {
    e.preventDefault();
    // Verifica se algum campo está vazio antes de salvar
    if (!nome || !email || !senha) {
      alert("Por favor, preencha todos os campos antes de salvar!");
      return;
    }
    // Atualizar os dados do usuário no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const index = usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
      usuarios[index] = { id, nome, email, senha };
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Dados Salvos com Sucesso!");
      navigate("/listausuario");
    } else {
      alert("Usuário não encontrado!");
    }
  };

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="header">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Editar Usuário" />
          <form onSubmit={salvarDados}>
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
    </div>
  );
}
