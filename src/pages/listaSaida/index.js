import React, { useState, useEffect } from "react";
import '../../global.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import Barrasuperior from "../componentes/barrasuperior";

export default function ListaSaida() {
    const navigate = useNavigate();
    const [saidas, setSaidas] = useState([]);
    const [quantidade, setQuantidade] = useState(0);

    function mostrarSaidas() {
        const listaSaidas = JSON.parse(localStorage.getItem("saidas") || "[]")
        setQuantidade(listaSaidas.length)
        setSaidas(listaSaidas);
    }

    function editarSaida(id) {
        alert(`Estou editando a saída de produto com o ID: ${id}`);
        navigate(`/editarsaida/${id}`);
    }

    const excluirSaida = (id) => {
        confirmAlert({
            title: 'Excluir saída de produto',
            message: 'Deseja realmente excluir esta saída de produto?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        const listaSaidas = JSON.parse(localStorage.getItem("saidas") || "[]")
                        const novaLista = listaSaidas.filter(item => item.id !== id);
                        localStorage.setItem("saidas", JSON.stringify(novaLista));
                        mostrarSaidas();
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
        mostrarSaidas()
    }, [])

    return (
        <div className="dashboard-container">
            <Barrasuperior />
            <div className="header">
                <div className="menu">
                    <Menu />
                </div>
                <div className="main">
                    <Head title="Lista de Saída" />
                    <div style={{ marginBottom: "20px" }}></div> {/* Espaçamento entre Head e tabela */}
                    <div>
                        <Link to="/cadastrosaida" className='btn-novo'>Novo</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ID_Produto</th>
                                <th>Quantidade</th>
                                <th>data_saida</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {saidas.map(saida => (
                                <tr key={saida.id}>
                                    <td>{saida.id}</td>
                                    <td>{saida.produto}</td>
                                    <td>{saida.quantidade}</td>
                                    <td>{saida.data_saida}</td>
                                    <td>
                                        <FiEdit size={24} color="blue" cursor="pointer" onClick={() => editarSaida(saida.id)} />
                                    </td>
                                    <td>
                                        <FiTrash size={24} color="red" cursor="pointer" onClick={() => excluirSaida(saida.id)} />
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
    )
}
