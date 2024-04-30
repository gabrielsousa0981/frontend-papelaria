import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function ListaEstoque() {
  const navigate = useNavigate();
  const [estoque, setEstoque] = useState([]);
  const [quantidade, setQuantidade] = useState(0);

  function mostrarEstoque() {
    const banco = JSON.parse(localStorage.getItem("estoque") || "[]");
    setQuantidade(banco.length);
    setEstoque(banco);
  }

  const buscarProduto = (id) => {
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    const produto = banco.find((item) => item.id === id);
    return produto ? produto.descricao : "Produto não encontrado";
  };

  const editarEntrada = (id) => {
    alert(`Estou editando produto de ID: ${id}`);
    navigate(`/editarproduto/${id}`);
  };

  const excluirEntrada = (id) => {
    confirmAlert({
      title: 'Excluir produto',
      message: 'Deseja realmente excluir esse produto?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            const banco = JSON.parse(localStorage.getItem("estoque") || "[]");
            const dadosAtualizados = banco.filter((item) => item.id !== id);
            localStorage.setItem("estoque", JSON.stringify(dadosAtualizados));
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
    mostrarEstoque();
  }, []);

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="header">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Lista de Estoque" />
          <div>
          <Link to="/cadastroestoque" className='btn-novo'>Novo</Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Produto</th>
                <th>QTDE</th>
                <th>Valor Unitario</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {estoque.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{buscarProduto(item.id_produto)}</td>
                  <td>{item.qtde}</td>
                  <td>{item.valor_unitario}</td>
                  <td>
                    <FiEdit size={24} color="blue" cursor="pointer" onClick={() => editarEntrada(item.id)} />
                  </td>
                  <td>
                    <FiTrash size={24} color="red" cursor="pointer" onClick={() => excluirEntrada(item.id)} />
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
