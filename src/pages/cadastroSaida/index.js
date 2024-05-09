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
    const [data_saida, setData_Saida] = useState("");

    useEffect(() => {
        mostrarProdutos();
    }, []);

    function mostrarProdutos() {
        const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
        setProdutos(banco);
    }

    const salvarDados = (e) => {
        e.preventDefault();

        const produtoSelecionado = produtos.find(produto => produto.id === id_produto);
        
        if (!produtoSelecionado) {
            alert("Produto não encontrado!");
            return;
        }

        if (parseInt(qtde) > parseInt(produtoSelecionado.quantidade)) {
            alert("Quantidade de saída maior do que a quantidade em estoque!");
            return;
        }

        const valorUnitarioFormatado = parseFloat(valor_unitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const saida = {
            id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
            id_produto,
            produto: produtoSelecionado.produto,
            qtde,
            valor_unitario: valorUnitarioFormatado,
            data_saida,
        };

        const saidas = JSON.parse(localStorage.getItem("saidas") || "[]");
        saidas.push(saida);
        localStorage.setItem("saidas", JSON.stringify(saidas));

        // Atualiza a quantidade no estoque após a saída
        produtoSelecionado.quantidade -= parseInt(qtde);
        localStorage.setItem("produtos", JSON.stringify(produtos));

        alert("Saída cadastrada com sucesso!");
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
                            placeholder="Data de Saída"
                            value={data_saida}
                            onChange={(e) => setData_Saida(e.target.value)}
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
