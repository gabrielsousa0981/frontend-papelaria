import { useEffect, useState } from "react"
import Menu from "../componentes/menu"
import Head from "../componentes/head"
import {useNavigate,useParams, Link} from "react-router-dom"


import '../../global.css'

export default function Editarproduto(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [descricao,setDescricao] = useState("")
    const [quantidade_minima,setQuantidade_minima] = useState("")
    const [quantidade_maxima,setQuantidade_maxima] = useState()
    // const [usuarios,setUsuarios] = useState([])


    const usuario={
        id:id,
        descricao,
        quantidade_minima,
        quantidade_maxima
    };

    useEffect(()=>{
       
        exibirdados()
    },[])


    const exibirdados=()=>{
    
        const banco = JSON.parse(localStorage.getItem("produtos")|| "[]")
        banco.filter(linha=>{
           return linha.id===id
        }
        ).map(value=>{
            
                setDescricao(value.descricao)
                setQuantidade_minima(value.quantidade_minima)
                setQuantidade_maxima(value.quantidade_maxima)
          

            
        }
       
        )
     
        
      
    
    }
    const salvardados=(e)=>{
      e.preventDefault();
     const banco = JSON.parse(localStorage.getItem("produtos")|| "[]")
     const dadosvelhos = banco.filter(linha=>
        {
            return linha.id!=id
        }
        )
     dadosvelhos.push(usuario)
     console.log(dadosvelhos)
     localStorage.setItem("produtos",
      JSON.stringify(dadosvelhos))
    alert("Dados Salvos com Sucesso!!!!!")
     navigate("/listaproduto")
    }
    return(
        <div className="dashboard-container">
                <div className="menu">
                    <Menu />
                </div>
                <div className="main">
                    <Head title="Editar Produto" />
    
                    <form onSubmit={salvardados} > 
                        
                       <input 
                       type="text" 
                       placeholder="descrição"
                       value={descricao}
                       onChange={(e)=>setDescricao(e.target.value)}
                       
                       />
                       <input 
                       type="number" 
                       placeholder="quantidade minima"
                       value={quantidade_minima}
                       onChange={(e)=>setQuantidade_minima(e.target.value)}                      
                       />
                       <input 
                       type="number" 
                       placeholder="quantidade maxima"
                       value={quantidade_maxima}
                       onChange={(e)=>setQuantidade_maxima(e.target.value)}                     
                       />
                       <button className="btn-salvar">
                        Salvar
                       </button>
                      
                    </form>
                </div>
        </div>
            )
}