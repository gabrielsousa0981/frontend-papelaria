import React,{useState,useEffect} from "react";
import '../../global.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit,FiTrash } from "react-icons/fi";
import Barrasuperior from "../componentes/barrasuperior";

export default function Listaprodutos(){
const navigate = useNavigate();
const [produtos,setProdutos] = useState([]);
const [quantidade,setQuantidade] = useState(0);

function mostrarprodutos(){
    const banco = JSON.parse(localStorage.getItem("produtos")|| "[]")
    setQuantidade(banco.length)
    setProdutos(banco);
}
function editarproduto(id){
 alert(`Estou editando produto de id:${id}`)
 navigate(`/editarproduto/${id}`)
}

  const  excluirproduto = (id) => {
        confirmAlert({
          title: 'Excluir produto',
          message: 'Deseja realmente excluir esse produto?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => {
                const banco = JSON.parse(localStorage.getItem("produtos")|| "[]")
                const dadosvelhos = banco.filter(linha=>
                  {
                      return linha.id!=id
                  }
                  )
                  localStorage.setItem("produtos",JSON.stringify(dadosvelhos))
                  mostrarprodutos();
              }
            },
            {
              label: 'Não',
              onClick: () => alert('Ação cancelada!')
            }
          ]
        });
      };

useEffect(()=>{
    mostrarprodutos()
},[])
    return(
<div className="dashboard-container">
<Barrasuperior />
<div className="header">
        <div className="menu">
            <Menu />
        </div>
        <div className="main">
            <Head title="Lista de Produtos" />
            <div>

                <Link to="/cadastroproduto" className='btn-novo'>Novo</Link>
            </div>
           <table>
            <tr>
             <th>ID</th>
             <th>Descrição</th>
             <th>valor Unitário</th>
             <th>Estoque Mínimo</th>
             <th>Estoque Máximo</th>
             <th></th>
             <th></th>
            </tr>
            
                {
                  produtos.map((linha)=>{
                     return(
                        <tr key={linha.toString()}>
                        <td>{linha.id}</td>
                        <td>{linha.descricao}</td>
                        <td>{linha.valor_unitario}</td>
                        <td>{linha.quantidade_minima}</td>
                        <td>{linha.quantidade_maxima}</td>
                        <td>
                            <FiEdit size={24} color="blue" cursor="pointer" onClick={(e)=>{editarproduto(linha.id)}} />
                        </td>
                        <td>
                            <FiTrash size={24} color="red" cursor="pointer" onClick={(e)=>{excluirproduto(linha.id)}}/>
                        </td>
                        </tr>
                     )
                  })  
                }
     
             <tr>
              <th colSpan={5}>Total de Registros: {quantidade}</th>
   
             </tr>
           </table>



        </div>
        </div>
        
</div>
    )
}