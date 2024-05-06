import React, { useState, useEffect } from "react";
import '../../global.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import Barrasuperior from "../componentes/barrasuperior";

export default function ListaEstoque() {
    const navigate = useNavigate();
    const [estoque, setEstoque] = useState([]);
    const [quantidade, setQuantidade] = useState(0);

    function mostrarEstoque() {
        const banco = JSON.parse(localStorage.getItem("estoque") || "[]")
        setQuantidade(banco.length)
        setEstoque(banco);
    }

    function editarItem(id) {
        alert(`Estou editando o item de estoque com o ID: ${id}`);
        navigate(`/editarestoque/${id}`);
    }

    const excluirItem = (id) => {
        confirmAlert({
            title: 'Excluir item de estoque',
            message: 'Deseja realmente excluir este item de estoque?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        const banco = JSON.parse(localStorage.getItem("estoque") || "[]")
                        const novoEstoque = banco.filter(item => item.id !== id);
                        localStorage.setItem("estoque", JSON.stringify(novoEstoque));
                        mostrarEstoque();
                    }
                },
                {
                    label: 'Não',
                    onClick: () => alert('Ação cancelada!')
                }
            ]
        });
    };

    useEffect(() => {
        mostrarEstoque()
    }, [])

    return (
        <div className="dashboard-container">
            <Barrasuperior />
            <div className="header">
                <div className="menu">
                    <Menu />
                </div>
                <div className="main">
                    <Head title="Lista de Estoque" />
                    <div style={{ marginBottom: "20px" }}></div> {/* Espaçamento entre Head e tabela */}
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>id_Produto</th>
                                <th>Quantidade</th>
                                <th>Valor Unitário</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {estoque.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{item.preco_unitario}</td>
                                    <td>{item.data_validade}</td>
                                    <td>
                                        <FiEdit size={24} color="blue" cursor="pointer" onClick={() => editarItem(item.id)} />
                                    </td>
                                    <td>
                                        <FiTrash size={24} color="red" cursor="pointer" onClick={() => excluirItem(item.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={5}>Total de Registros: {quantidade}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}
