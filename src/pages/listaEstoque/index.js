import React, { useState, useEffect } from "react";
import '../../global.css'
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import Barrasuperior from "../componentes/barrasuperior";

export default function ListaEstoque() {
    const [estoque, setEstoque] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [produtos, setProdutos] = useState([]);

    // Função para buscar o nome do produto com base no ID
    const buscarNomeProduto = (id) => {
        const produto = produtos.find(produto => produto.id === id);
        return produto ? produto.produto : "Produto não encontrado";
    };

    function mostrarEstoque() {
        const entradas = JSON.parse(localStorage.getItem("entradas") || "[]");
        const saidas = JSON.parse(localStorage.getItem("saidas") || "[]");
    
        const estoqueAtualizado = [];
    
        // Inclui as entradas no estoque
        entradas.forEach(entrada => {
            const nomeProduto = buscarNomeProduto(entrada.id_produto);
            if (nomeProduto) {
                estoqueAtualizado.push({ ...entrada, tipo: "Entrada", produto: nomeProduto });
            } else {
                console.error("Entrada inválida: produto não encontrado", entrada);
            }
        });
    
        // Subtrai as saídas do estoque total
        saidas.forEach(saida => {
            const nomeProduto = buscarNomeProduto(saida.id_produto);
            if (nomeProduto) {
                const produtoSaida = estoqueAtualizado.find(item => item.id_produto === saida.id_produto);
                if (produtoSaida) {
                    produtoSaida.qtde -= saida.qtde;
                    estoqueAtualizado.push({ ...saida, tipo: "Saída", produto: nomeProduto });
                } else {
                    estoqueAtualizado.push({ ...saida, tipo: "Saída", produto: nomeProduto, qtde: -saida.qtde });
                }
            } else {
                console.error("Saída inválida: produto não encontrado", saida);
            }
        });
    
        // Ordena o estoque por data
        estoqueAtualizado.sort((a, b) => new Date(b.data) - new Date(a.data));
    
        // Atualiza o estado do estoque
        setEstoque(estoqueAtualizado);

        // Calcula o total de unidades no estoque
        const totalQuantidade = estoqueAtualizado.reduce((acc, item) => acc + parseInt(item.qtde), 0);
        setQuantidadeTotal(totalQuantidade);
    }
    

    function carregarProdutos() {
        const listaProdutos = JSON.parse(localStorage.getItem("produtos") || "[]");
        setProdutos(listaProdutos);
    }

    useEffect(() => {
        mostrarEstoque();
        carregarProdutos();
    }, []);

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
                            {estoque.map(linha => (
                                <tr key={linha.id}>
                                    <td>{linha.id}</td>
                                    <td>{linha.produto}</td>
                                    <td>{linha.qtde}</td>
                                    <td>{parseFloat(linha.valor_unitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={5}>Total no Estoque: {quantidadeTotal}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}
