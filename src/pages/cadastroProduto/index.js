import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function Cadastroproduto() {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState("");
  const [quantidade_minima, setQuantidade_minima] = useState("");
  const [quantidade_maxima, setQuantidade_maxima] = useState("");

  useEffect(() => {
    // Aqui você pode realizar alguma lógica se necessário
  }, []);

  const salvardados = (e) => {
    e.preventDefault();
    const produto = {
      id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
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
          <Head title="Cadastro de Produto" />
          <form onSubmit={salvardados}>
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantidade Mínima"
              value={quantidade_minima}
              onChange={(e) => setQuantidade_minima(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantidade Máxima"
              value={quantidade_maxima}
              onChange={(e) => setQuantidade_maxima(e.target.value)}
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
