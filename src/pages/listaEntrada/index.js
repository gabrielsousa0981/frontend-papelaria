import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function Listaentradas() {
  const navigate = useNavigate();
  const [entradas, setEntradas] = useState([]);
  const [quantidade, setQuantidade] = useState(0);

  function mostrarentrada() {
    const banco = JSON.parse(localStorage.getItem("entradas") || "[]");
    setQuantidade(banco.length);
    setEntradas(banco);
  }
const buscarproduto=(id)=>{
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]")
    const produto = banco.filter(linha => linha.id === id);
    if(produto.length === 0){
        return "Produto não encontrado";
    }
    return produto[0].descricao;


}
  function editarentrada(id) {
    alert(`Estou editando produto de id:${id}`);
    navigate(`/editarproduto/${id}`);
  }

  const excluirentrada = (id) => {
    confirmAlert({
      title: 'Excluir produto',
      message: 'Deseja realmente excluir esse produto?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            const banco = JSON.parse(localStorage.getItem("entradas") || "[]");
            const dadosvelhos = banco.filter(linha => linha.id !== id);
            localStorage.setItem("entradas", JSON.stringify(dadosvelhos));
            mostrarentrada();
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
    mostrarentrada();
  }, []);

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="header">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Lista de Entrada" />
          <div>
            <Link to="/cadastroentrada" className='btn-novo'>Novo</Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Id_Produto</th>
                <th>QTD</th>
                <th>Valor Unitario</th>
                <th>Data_Entrada</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entradas.map((linha) => (
                <tr key={linha.id}>
                  <td>{linha.id}</td>
                  <td>{buscarproduto(linha.id_produto)}</td>
                  <td>{linha.qtde}</td>
                  <td>{linha.valor_unitario}</td>
                  <td>{linha.data_entrada}</td>
                  <td>
                    <FiEdit size={24} color="blue" cursor="pointer" onClick={() => editarentrada(linha.id)} />
                  </td>
                  <td>
                    <FiTrash size={24} color="red" cursor="pointer" onClick={() => excluirentrada(linha.id)} />
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