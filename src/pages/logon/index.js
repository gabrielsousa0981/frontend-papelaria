import React, { useState } from "react";
import '../../global.css';
import logo from '../../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import api from "../../server/api";


export default function Logon(){
    const navigate = useNavigate();

    const [email,setEmail] = useState();
    const [senha,setSenha] = useState();
    
    const banco = JSON.parse(localStorage.getItem("usuarios")|| "[]")

    const logar=(e)=>{
      e.preventDefault()
      if(!email ||  !senha){
            alert("Há campos vazios")
      }else{
        

        api.post("/usuario/login",{email,senha})
        .then(resposta=>{
            if(resposta.status==200)
            console.log(resposta.data.usuarios)
            if(resposta.status==500)
            alert("houve um erro")

        })
        //const usuariologado=banco.filter(linha=>{
           // return linha.email===email && linha.senha==senha
        //})

        console.log(usuariologado)
        if(usuariologado.length>0){
            navigate('/dashboard')
        }else{
            alert("E-mail ou senha incorretos!")
        }

      }

    }
   return(
    <div className="logon-container">
        <section className="form">
           <img src={logo} width={200} />
           <h1>Faça seu login</h1>
            <form onSubmit={logar}>
                <input 
                placeholder="E-mail"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                
                />
                <input 
                placeholder="Senha"
                type="password"
                value={senha}
                onChange={(e)=>setSenha(e.target.value)}
                               
                />
                <button className="button_login" type="submit">
                    Entrar
                </button>
            </form>
        </section>
    </div>
   ) 
}