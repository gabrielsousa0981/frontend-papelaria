import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import Barrasuperior from "../componentes/barrasuperior";

export default function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [produto, setProduto] = useState({
    id: "",
    produto: "",
    estoque_minimo: "",
    estoque_maximo: "",
    valor_unitario: "",
  });

  useEffect(() => {
    mostrarProduto();
  }, [id]);

  function mostrarProduto() {
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    const produtoEncontrado = banco.find(item => item.id === id);
    if (produtoEncontrado) {
      setProduto(produtoEncontrado);
    }
  }

  const salvarDados = (e) => {
    e.preventDefault();
    // Atualizar os dados do produto no localStorage
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    const index = produtos.findIndex(item => item.id === id);
    if (index !== -1) {
      produtos[index] = produto;
      localStorage.setItem("produtos", JSON.stringify(produtos));
      alert("Dados Salvos com Sucesso!");
      navigate("/listaproduto");
    } else {
      alert("Produto não encontrado!");
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
          <Head title="Editar Produto" />
          <form onSubmit={salvarDados}>
            <input
              type="text"
              placeholder="Produto"
              value={produto.produto}
              onChange={(e) => setProduto({ ...produto, produto: e.target.value })}
            />
            <input
              type="number"
              placeholder="Estoque Mínimo"
              value={produto.estoque_minimo}
              onChange={(e) => setProduto({ ...produto, estoque_minimo: e.target.value })}
            />
            <input
              type="number"
              placeholder="Estoque Máximo"
              value={produto.estoque_maximo}
              onChange={(e) => setProduto({ ...produto, estoque_maximo: e.target.value })}
            />
            <input
              type="number"
              placeholder="Valor Unitário"
              value={produto.valor_unitario}
              onChange={(e) => setProduto({ ...produto, valor_unitario: e.target.value })}
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
