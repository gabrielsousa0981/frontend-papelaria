import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function Listasaidas() {
  const navigate = useNavigate();
  const [saidas, setSaidas] = useState([]);
  const [quantidade, setQuantidade] = useState(0);

  function mostrarSaida() {
    const banco = JSON.parse(localStorage.getItem("saidas") || "[]");
    setQuantidade(banco.length);
    setSaidas(banco);
  }

  const buscarProduto = (id) => {
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    const produto = banco.find((item) => item.id === id);
    return produto ? produto.descricao : "Produto não encontrado";
  };

  function editarSaida(id) {
    alert(`Estou editando a saída de ID: ${id}`);
    navigate(`/editarsaida/${id}`);
  }

  const excluirSaida = (id) => {
    confirmAlert({
      title: 'Excluir saída',
      message: 'Deseja realmente excluir essa saída?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            const banco = JSON.parse(localStorage.getItem("saidas") || "[]");
            const novosDados = banco.filter((item) => item.id !== id);
            localStorage.setItem("saidas", JSON.stringify(novosDados));
            mostrarSaida();
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
    mostrarSaida();
  }, []);

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="header">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Lista de Saída" />
          <div>
            <Link to="/cadastrosaida" className='btn-novo'>Novo</Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id_Produto</th>
                <th>QTD</th>
                <th>Valor Unitário</th>
                <th>Data_Saida</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {saidas.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{buscarProduto(item.id_produto)}</td>
                  <td>{item.qtde}</td>
                  <td>{item.valor_unitario}</td>
                  <td>{item.data_saida}</td>
                  <td>
                    <FiEdit size={24} color="blue" cursor="pointer" onClick={() => editarSaida(item.id)} />
                  </td>
                  <td>
                    <FiTrash size={24} color="red" cursor="pointer" onClick={() => excluirSaida(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total de Registros: {quantidade}</p>
        </div>
      </div>
    </div>
  );
}
