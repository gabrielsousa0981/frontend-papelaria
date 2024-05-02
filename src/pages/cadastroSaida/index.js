import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function CadastroSaida() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [id_produto, setId_Produto] = useState("");
  const [qtde, setQTDE] = useState("");
  const [valor_unitario, setValor_Unitario] = useState("");
  const [data_saida, setData_saida] = useState("");

  function mostrarProdutos() {
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    setProdutos(banco);
  }

  useEffect(() => {
    mostrarProdutos();
  }, []);

  const salvarDados = (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!id_produto || !qtde || !valor_unitario || !data_saida) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const saida = {
      id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
      id_produto,
      qtde,
      valor_unitario,
      data_saida,
    };
    const banco = JSON.parse(localStorage.getItem("saidas") || "[]");
    banco.push(saida);
    localStorage.setItem("saidas", JSON.stringify(banco));
    alert("Dados Salvos com Sucesso!!!!!");
    navigate("/listasaida");
  };

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="header">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Cadastro de Saída" />
          <form onSubmit={salvarDados}>
            <input
              type="text"
              placeholder="ID Produto"
              value={id_produto}
              onChange={(e) => setId_Produto(e.target.value)}
            />
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
              placeholder="Data de Saída"
              value={data_saida}
              onChange={(e) => setData_saida(e.target.value)}
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
