import React, { useState, useEffect } from "react";
import '../../global.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function Listausuario() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [quantidade, setQuantidade] = useState(0);
  
  function mostrarusuarios() {
    const banco = JSON.parse(localStorage.getItem("usuarios") || "[]");
    setUsuarios(banco);
    setQuantidade(banco.length); // Atualiza o total de registros
  }

  function editarusuario(id) {
    alert(`Estou editando usuário de id: ${id}`);
    navigate(`/editarusuario/${id}`);
  }

  const excluirusuario = (id) => {
    confirmAlert({
      title: 'Excluir usuário',
      message: 'Deseja excluir esse usuário?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            const banco = JSON.parse(localStorage.getItem("usuarios") || "[]");
            const dadosvelhos = banco.filter(linha => linha.id !== id);
            localStorage.setItem("usuarios", JSON.stringify(dadosvelhos));
            mostrarusuarios();
          }
        },
        {
          label: 'Não',
          onClick: () => alert('Ação Cancelada!')
        }
      ]
    });
  };

  useEffect(() => {
    mostrarusuarios();
  }, []);

  const cadastrarUsuario = (usuario) => {
    const banco = JSON.parse(localStorage.getItem("usuarios") || "[]");
    banco.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(banco));
    setQuantidade(quantidade + 1); // Incrementa a quantidade após cadastrar
  };

  return (
    <div className="dashboard-container">
      <div className="menu">
        <Menu />
      </div>
      <div className="main">
        <Head title="Lista de Usuários" />
        <div>
          <Link to="/cadastrousuario" className='btn-novo'>Novo</Link>
        </div>
        <table>
          
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>

          
            {
              usuarios.map((linha) => {
                return (
                  <tr key={linha.id}>
                    <td>{linha.id}</td>
                    <td>{linha.nome}</td>
                    <td>{linha.email}</td>
                    <td>
                      <FiEdit size={24} color="blue" cursor="pointer" onClick={(e) => { editarusuario(linha.id) }} />
                    </td>
                    <td>
                      <FiTrash size={24} color="red" cursor="pointer" onClick={(e) => { excluirusuario(linha.id) }} />
                    </td>
                  </tr>
                )
              })
            }
            <tr>
                    <th colSpan="5">
                    Total de registros: {quantidade}
                    </th>
                  </tr>

        </table>
      </div>
    </div>
  )
}
