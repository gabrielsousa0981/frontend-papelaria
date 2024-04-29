import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function Cadastroproduto() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [id, setId] = useState(""); // Novo estado para o ID
  const [status, setStatus] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade_minima, setQuantidade_minima] = useState("");
  const [quantidade_maxima, setQuantidade_maxima] = useState("");

  function mostrarprodutos() {
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    setProdutos(banco);
  }

  useEffect(() => {
    mostrarprodutos();
  }, []);

  const salvardados = (e) => {
    e.preventDefault();
    const produto = {
      id, // Incluindo o ID no objeto do produto
      status,
      descricao,
      quantidade_minima,
      quantidade_maxima,
    };
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    banco.push(produto);
    localStorage.setItem("produtos", JSON.stringify(banco));
    alert("Dados Salvos com Sucesso!!!!!");
    navigate("/listaproduto");
  };

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="header">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Cadastro de Usuário" />
          <form onSubmit={salvardados}>
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)} // Atualiza o estado do ID
            />
            <select name="select" value={status} onChange={(e) => setStatus(e.target.value)}>
              {produtos.map((linha) => (
                <option key={linha.id} value={linha.id}>{linha.descricao}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type="number"
              placeholder="quantidade minima"
              value={quantidade_minima}
              onChange={(e) => setQuantidade_minima(e.target.value)}
            />
            <input
              type="number"
              placeholder="quantidade maxima"
              value={quantidade_maxima}
              onChange={(e) => setQuantidade_maxima(e.target.value)}
            />
            <button type="submit" className="btn-salvar">
              Salvar
            </button>
          </form>
          {status}
        </div>
      </div>
    </div>
  );
}
