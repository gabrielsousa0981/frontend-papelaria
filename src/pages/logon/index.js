import React from "react";
import '../../global.css'
import logo from '../../assets/img/logo.avif'
import {useNavigate} from 'react-router-dom'



export default function Logon(){

     const navigate = useNavigate();

     const logar=(e)=>{

     e.preventDefault()


     navigate('/dashboard')

    }

   return(
    <div className="logon-container">
        <section className="form">
           <img src={logo} width={200} />
            <form onSubmit={logar}> 
                <input 
                placeholder="E-mail"
                type="email"
                />
                <input 
                placeholder="Senha"
                type="password"
                />


                <button className="button_login" type="submit">

                    Entrar

                </button>


            </form>
        </section>
    </div>
   ) 
}