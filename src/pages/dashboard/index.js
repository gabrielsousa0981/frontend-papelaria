import React from "react"; // Importa a biblioteca React para utilizar componentes e funcionalidades do React
import '../../global.css'; // Importa estilos globais para a aplicação
import Head from "../componentes/head"; // Importa o componente Head do diretório '../componentes/head'
import Menu from "../componentes/menu"; // Importa o componente Menu do diretório '../componentes/menu'

export default function Dashboard() {
    return (
        <div className="dashboard-container"> {/* Container principal do dashboard */}
            <div className="menu"> {/* Container para o menu */}
                <Menu /> {/* Renderiza o componente Menu */}
             </div>
             
             <div className="main"> {/* Container principal do conteúdo */}
                <Head title="Home" /> {/* Renderiza o componente Head */}
            </div>
        </div>
    );
}
