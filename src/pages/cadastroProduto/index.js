import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function Cadastroproduto() {
  const navigate = useNavigate();
  const [produto, setProduto] = useState("");
  const [estoque_minimo, setEstoqueMinimo] = useState("");
  const [estoque_maximo, setEstoqueMaximo] = useState("");
  const [valor_unitario, setValorUnitario] = useState("");
  const [status, setStatus] = useState("ativo");

  useEffect(() => {
    // Aqui você pode realizar alguma lógica se necessário
  }, []);

  const salvardados = (e) => {
    e.preventDefault();
    // Verifica se algum campo está vazio antes de salvar
    if (!produto || !estoque_minimo || !estoque_maximo || !valor_unitario) {
      alert("Por favor, preencha todos os campos antes de salvar!");
      return;
    }
    const novoProduto = {
      id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
      produto,
      estoque_minimo,
      estoque_maximo,
      valor_unitario: parseFloat(valor_unitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), // Convertendo para formato de moeda brasileira
      status,
    };
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    banco.push(novoProduto);
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
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
            <input
              type="text"
              placeholder="Produto"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
            />
            <input
              type="number"
              placeholder="Estoque Mínimo"
              value={estoque_minimo}
              onChange={(e) => setEstoqueMinimo(e.target.value)}
            />
            <input
              type="number"
              placeholder="Estoque Máximo"
              value={estoque_maximo}
              onChange={(e) => setEstoqueMaximo(e.target.value)}
            />
            <input
              type="number" 
              placeholder="Valor Unitário"
              value={valor_unitario}
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