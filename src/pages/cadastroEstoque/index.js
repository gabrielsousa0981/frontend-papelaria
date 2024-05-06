import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function CadastroEstoque() {
  const navigate = useNavigate();
  const [idProduto, setIdProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");

  const salvardados = (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!idProduto || !quantidade || !valorUnitario) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const estoque = {
      id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
      idProduto,
      quantidade,
      valorUnitario,
    };
    const banco = JSON.parse(localStorage.getItem("estoque") || "[]");
    banco.push(estoque);
    localStorage.setItem("estoque", JSON.stringify(banco));
    alert("Dados Salvos com Sucesso!");
    navigate("/listaestoque");
  };

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="header">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Cadastro de Estoque" />
          <form onSubmit={salvardados}>
            <input
              type="text"
              placeholder="Produto"
              value={idProduto}
              onChange={(e) => setIdProduto(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
            <input
              type="number"
              placeholder="Valor Unitário"
              value={valorUnitario}
              onChange={(e) => setValorUnitario(e.target.value)}
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
