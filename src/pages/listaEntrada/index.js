import React, { useState, useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import Barrasuperior from "../componentes/barrasuperior";
import Head from "../componentes/head";
import Menu from "../componentes/menu";

export default function ListaEntrada() {
    const navigate = useNavigate();
    const [entradas, setEntradas] = useState([]);
    const [quantidade, setQuantidade] = useState(0);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        mostrarEntradas();
    }, []);

    useEffect(() => {
        const listaProdutos = JSON.parse(localStorage.getItem("produtos") || "[]");
        setProdutos(listaProdutos);
    }, []);

    const mostrarEntradas = () => {
        const listaEntradas = JSON.parse(localStorage.getItem("entradas") || "[]");
        const entradasComNomeProduto = listaEntradas.map(entrada => {
            const produto = produtos.find(produto => produto.id === entrada.produto);
            const nomeProduto = produto ? produto.produto : "Produto não encontrado";
            return { ...entrada, produto: nomeProduto };
        });

        setEntradas(entradasComNomeProduto);
        setQuantidade(entradasComNomeProduto.length);
    };

    const editarEntrada = (id) => {
        alert(`Estou editando a entrada de produto com o ID: ${id}`);
        navigate(`/editarentrada/${id}`);
    };

    const confirmarExclusao = (id) => {
        confirmAlert({
            title: 'Excluir Entrada',
            message: 'Tem certeza que deseja excluir esta entrada?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => excluirEntrada(id)
                },
                {
                    label: 'Cancelar',
                    onClick: () => {}
                }
            ]
        });
    };

    const excluirEntrada = (id) => {
        const novaLista = entradas.filter(item => item.id !== id);
        setEntradas(novaLista);
        localStorage.setItem("entradas", JSON.stringify(novaLista));
        setQuantidade(novaLista.length);
    };

    return (
        <div className="dashboard-container">
            <Barrasuperior />
            <div className="header">
                <div className="menu">
                    <Menu />
                </div>
                <div className="main">
                    <Head title="Lista de Entrada" />
                    <div style={{ marginBottom: "20px" }}></div>
                    <div>
                        <Link to="/cadastroentrada" className='btn-novo'>Novo</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Valor Unitário</th>
                                <th>Data de Entrada</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {entradas.map((linha) => (
                                <tr key={linha.id}>
                                    <td>{linha.id}</td>
                                    <td>{linha.produto}</td>
                                    <td>{linha.qtde}</td>
                                    <td>{parseFloat(linha.valor_unitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>{linha.data_entrada}</td>
                                    <td>
                                        <FiEdit size={24} color="blue" style={{ cursor: "pointer" }} onClick={() => editarEntrada(linha.id)} />
                                    </td>
                                    <td>
                                        <FiTrash size={24} color="red" style={{ cursor: "pointer" }} onClick={() => confirmarExclusao(linha.id)} />
                                    </td>
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
    );
}
