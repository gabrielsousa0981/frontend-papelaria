import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import Barrasuperior from "../componentes/barrasuperior";

export default function EditarEntrada() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entrada, setEntrada] = useState({
    id: "",
    id_produto: "",
    qtde: "",
    valor_unitario: "",
    data_entrada: "",
  });

  useEffect(() => {
    mostrarEntrada();
  }, [id]);

  function mostrarEntrada() {
    const entradas = JSON.parse(localStorage.getItem("entradas") || "[]");
    const entradaEncontrada = entradas.find(item => item.id === id);
    if (entradaEncontrada) {
      setEntrada(entradaEncontrada);
    }
  }

  const salvarDados = (e) => {
    e.preventDefault();
    // Atualizar os dados da entrada no localStorage
    const entradas = JSON.parse(localStorage.getItem("entradas") || "[]");
    const index = entradas.findIndex(item => item.id === id);
    if (index !== -1) {
      entradas[index] = entrada;
      localStorage.setItem("entradas", JSON.stringify(entradas));
      alert("Dados Salvos com Sucesso!");
      navigate("/listaentrada");
    } else {
      alert("Entrada não encontrada!");
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
          <Head title="Editar Entrada" />
          <form onSubmit={salvarDados}>
            <input
              type="text"
              placeholder="Produto"
              value={entrada.produto}
              onChange={(e) => setEntrada({ ...entrada, id_produto: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={entrada.qtde}
              onChange={(e) => setEntrada({ ...entrada, qtde: e.target.value })}
            />
            <input
              type="number"
              placeholder="Valor Unitário"
              value={entrada.valor_unitario}
              onChange={(e) => setEntrada({ ...entrada, valor_unitario: e.target.value })}
            />
            <input
              type="date"
              placeholder="Data de Entrada"
              value={entrada.data_entrada}
              onChange={(e) => setEntrada({ ...entrada, data_entrada: e.target.value })}
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
