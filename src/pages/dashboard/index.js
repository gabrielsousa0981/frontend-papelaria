import React from "react";
import '../../global.css'
import Head from "../componentes/head";
import Menu from "../componentes/menu";
import Barrasuperior from "../componentes/barrasuperior";

export default function Dashboard(){
    return(
<div className="dashboard-container">
        <Barrasuperior />
    <div className="header">    
        <div className="menu">
            <Menu />
        </div>
        <div className="main">
            <Head title="Home" />
        </div>
    </div>
</div>
    )
}