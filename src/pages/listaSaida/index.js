import React, { useState, useEffect } from "react";
import '../../global.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import Barrasuperior from "../componentes/barrasuperior";
import Head from "../componentes/head";
import Menu from "../componentes/menu";

export default function ListaSaida() {
    const navigate = useNavigate();
    const [saidas, setSaidas] = useState([]);
    const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {
        mostrarSaidas();
    }, []);

    const mostrarSaidas = () => {
        const listaSaidas = JSON.parse(localStorage.getItem("saidas") || "[]");
        const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");

        const saidasComNomeProduto = listaSaidas.map(saida => {
            const produto = produtos.find(produto => produto.id === saida.id_produto);
            const nomeProduto = produto ? produto.produto : "Produto não encontrado";
            return { ...saida, produto: nomeProduto };
        });

        setSaidas(saidasComNomeProduto);
        setQuantidade(saidasComNomeProduto.length);
    };

    const editarSaida = (id) => {
        alert(`Estou editando a saída de produto com o ID: ${id}`);
        navigate(`/editarsaida/${id}`);
    };

    const confirmarExclusao = (id) => {
        confirmAlert({
            title: 'Excluir Saída',
            message: 'Tem certeza que deseja excluir esta saída?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => excluirSaida(id)
                },
                {
                    label: 'Cancelar',
                    onClick: () => {}
                }
            ]
        });
    };

    const excluirSaida = (id) => {
        const novaLista = saidas.filter(item => item.id !== id);
        setSaidas(novaLista);
        localStorage.setItem("saidas", JSON.stringify(novaLista));
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
                    <Head title="Lista de Saída" />
                    <div style={{ marginBottom: "20px" }}></div>
                    <div>
                        <Link to="/cadastrosaida" className='btn-novo'>Novo</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Valor Unitário</th>
                                <th>Data de Saída</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {saidas.map((linha) => (
                                <tr key={linha.id}>
                                    <td>{linha.id}</td>
                                    <td>{linha.produto}</td>
                                    <td>{linha.qtde}</td>
                                    <td>{linha.valor_unitario}</td>
                                    <td>{linha.data_saida}</td>
                                    <td>
                                        <FiEdit size={24} color="blue" style={{ cursor: "pointer" }} onClick={() => editarSaida(linha.id)} />
                                    </td>
                                    <td>
                                        <FiTrash size={24} color="red" style={{ cursor: "pointer" }} onClick={() => confirmarExclusao(linha.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={5}>Total de Saídas: {quantidade}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
