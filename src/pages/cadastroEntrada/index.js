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

    // Busca os produtos do localStorage
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    
    // Encontra o produto correspondente ao id_produto selecionado
    const produtoSelecionado = produtos.find(produto => produto.id === id_produto);

    // Verifica se o produto foi encontrado
    const nomeProduto = produtoSelecionado ? produtoSelecionado.produto : "Produto não encontrado";

    // Cria o objeto de entrada com o nome do produto incluído
    const entrada = {
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        id_produto,
        produto: nomeProduto, // Nome do produto incluído aqui
        qtde,
        valor_unitario,
        data_entrada,
    };

    // Salva a entrada no localStorage
    const entradas = JSON.parse(localStorage.getItem("entradas") || "[]");
    entradas.push(entrada);
    localStorage.setItem("entradas", JSON.stringify(entradas)); 

    // Atualiza a página para exibir a lista de entrada
    alert("Dados Salvos com Sucesso!!!!!");
    navigate("/listaentrada");
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
              placeholder="Data_Entrada"
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