import React, { useState, useEffect } from "react";
import '../../global.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import Barrasuperior from "../componentes/barrasuperior";

export default function ListaEntrada() {
    const navigate = useNavigate();
    const [entradas, setEntradas] = useState([]);
    const [quantidade, setQuantidade] = useState(0);

    function mostrarEntradas() {
        const listaEntradas = JSON.parse(localStorage.getItem("entradas") || "[]")
        setQuantidade(listaEntradas.length)
        setEntradas(listaEntradas);
    }

    function editarEntrada(id) {
        alert(`Estou editando a entrada de produto com o ID: ${id}`);
        navigate(`/editarentrada/${id}`);
    }

    const excluirEntrada = (id) => {
        confirmAlert({
            title: 'Excluir entrada de produto',
            message: 'Deseja realmente excluir esta entrada de produto?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        const listaEntradas = JSON.parse(localStorage.getItem("entradas") || "[]")
                        const novaLista = listaEntradas.filter(item => item.id !== id);
                        localStorage.setItem("entradas", JSON.stringify(novaLista));
                        mostrarEntradas();
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
        mostrarEntradas()
    }, [])

    return (
        <div className="dashboard-container">
            <Barrasuperior />
            <div className="header">
                <div className="menu">
                    <Menu />
                </div>
                <div className="main">
                    <Head title="Lista de Entrada" />
                    <div style={{ marginBottom: "20px" }}></div> {/* Espaçamento entre Head e tabela */}
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
                            {entradas.map(entrada => (
                                <tr key={entrada.id}>
                                    <td>{entrada.id}</td>
                                    <td>{entrada.produto}</td>
                                    <td>{entrada.quantidade}</td>
                                    <td>{entrada.data_entrada}</td>
                                    <td>
                                        <FiEdit size={24} color="blue" cursor="pointer" onClick={() => editarEntrada(entrada.id)} />
                                    </td>
                                    <td>
                                        <FiTrash size={24} color="red" cursor="pointer" onClick={() => excluirEntrada(entrada.id)} />
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
    )
}
