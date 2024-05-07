import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function Cadastroentrada() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [id_produto, setId_Produto] = useState("");
  const [qtde, setQTDE] = useState("");
  const [valor_unitario, setValor_Unitario] = useState("");
  const [data_entrada, setData_entrada] = useState("");

  useEffect(() => {
    mostrarProdutos();
  }, []);

  function mostrarProdutos() {
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    setProdutos(banco);
  }

  const salvarDados = (e) => {
    e.preventDefault();
    // seu código de salvamento aqui
  };

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="header">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Cadastro de Entrada" />
          <form onSubmit={salvarDados}>
            <select
              value={id_produto}
              onChange={(e) => setId_Produto(e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.produto}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Quantidade"
              value={qtde}
              onChange={(e) => setQTDE(e.target.value)}
            />
            <input
              type="number"
              placeholder="Valor Unitário"
              value={valor_unitario}
              onChange={(e) => setValor_Unitario(e.target.value)}
            />
            <input
              type="date"
              placeholder="Data de entrada"
              value={data_entrada}
              onChange={(e) => setData_entrada(e.target.value)}
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
