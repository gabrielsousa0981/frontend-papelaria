import { useState } from "react"


import Menu from "../componentes/menu"

import Head from "../componentes/head"

import {useNavigate,useParams, Link} from "react-router-dom"


import '../../global.css'



export default function Editarusuario(){

    const navigate = useNavigate();

    const {id} = useParams;


    const [nome,setNome] = useState("")

         const [email,setEmail] = useState("")


    const [senha,setSenha] = useState()


    const usuario={
               
          id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),

                  nome,


             email,


        senha

    };


    const salvardados=(e)=>{


        e.preventDefault();


            const banco = JSON.parse(localStorage.getItem("usuarios")|| "[]")


                banco.push(usuario)


            localStorage.setItem("usuarios",JSON.stringify(banco))


        alert("cadastro concluido !")


        navigate("/listausuario")


    }


    return (
        <div className="dashboard-container"> {/* Container principal do dashboard */}
            <div className="menu"> {/* Container para o menu */}
                <Menu /> {/* Renderiza o componente Menu */}
             </div>
             

             <div className="main"> {/* Container principal do conteúdo */}

                <Head title="Editar Usuário" /> 


                <form onSubmit={salvardados} >

                    


        <input type="text" placeholder="Nome"   value={nome} onChange={(e)=>setNome(e.target.value)}/>



        <input type="email" placeholder="email"    value={email} onChange={(e)=>setEmail(e.target.value)}/>



        <input type="password" placeholder="senha"     value={senha} onChange={(e)=>setSenha(e.target.value)}/>


        <button className="btn-salvar">

            Salvar

        </button>

        
 

                </form>
            </div>
        </div>
    );


}