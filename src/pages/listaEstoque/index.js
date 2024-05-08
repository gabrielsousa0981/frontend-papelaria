import React, { useState, useEffect } from "react";
import '../../global.css'
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import Barrasuperior from "../componentes/barrasuperior";

export default function ListaEstoque() {
    const [entradas, setEntradas] = useState([]);
    const [quantidade, setQuantidade] = useState(0);
    const [produtos, setProdutos] = useState([]);

    // Função para buscar o nome do produto com base no ID
    const buscarNomeProduto = (id) => {
        const produto = produtos.find(produto => produto.id === id);
        return produto ? produto.produto : "Produto não encontrado";
    };

    function mostrarEntradas() {
        const listaEntradas = JSON.parse(localStorage.getItem("entradas") || "[]");
        setQuantidade(listaEntradas.length);
        setEntradas(listaEntradas);
    }

    function carregarProdutos() {
        const listaProdutos = JSON.parse(localStorage.getItem("produtos") || "[]");
        setProdutos(listaProdutos);
    }

    useEffect(() => {
        mostrarEntradas();
        carregarProdutos();
    }, []);

    const atualizarEstoque = (id_produto, quantidade) => {
        const novoEstoque = produtos.map(produto => {
            if (produto.id === id_produto) {
                return {
                    ...produto,
                    quantidade: produto.quantidade - quantidade
                };
            }
            return produto;
        });
        localStorage.setItem("produtos", JSON.stringify(novoEstoque));
        setProdutos(novoEstoque);
    };

    return (
        <div className="dashboard-container">
            <Barrasuperior />
            <div className="header">
                <div className="menu">
                    <Menu />
                </div>
                <div className="main">
                    <Head title="Lista de Estoques" />
                    <div style={{ marginBottom: "20px" }}></div> {/* Espaçamento entre Head e tabela */}
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Valor Unitário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entradas.map(entrada => (
                                <tr key={entrada.id}>
                                    <td>{entrada.id}</td>
                                    <td>{buscarNomeProduto(entrada.id_produto)}</td>
                                    <td>{entrada.qtde}</td>
                                    <td>{entrada.valor_unitario}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={5}>Total de Entradas: {quantidade}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}
