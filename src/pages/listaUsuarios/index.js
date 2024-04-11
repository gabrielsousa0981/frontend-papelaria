import React from "react";


import Menu from "../componentes/menu"

import Head from "../componentes/head"

import '../../global.css'; // Importa estilos globais para a aplicação

export default function Listausuarios(){

    const dados=[
        {id:1,nome:"Carlos",email:"carlos@gmail.com",senha:"123"},
        {id:2,nome:"Felipe",email:"felipe@gmail.com",senha:"321"},
        {id:3,nome:"Nilson",email:"nilson@gmail.com",senha:"321"},

    ]
   return(
    <div className="dashboard-container">
        <div className='menu'>
     
        <Menu />
        </div>
        <div className='principal'>
        <h1>Lista de Usuários</h1>
        <table className="table">
           <tr>
                <th></th>
                <th>Nome</th>
                <th>Email</th>
                <th></th>
            </tr>
            {
               dados.map((usu)=>{
                return(
                  <tr key={usu.toString()}>
                    <td>{usu.id}</td>    
                    <td>{usu.nome}</td>    
                    <td>{usu.email}</td>    
                  </tr>  
                )
               }) 
            }

        </table>
        </div>
    </div>

   )

}