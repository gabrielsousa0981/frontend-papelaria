import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../componentes/menu";
import Head from "../componentes/head";
import Barrasuperior from "../componentes/barrasuperior";
import "../../global.css";

export default function CadastroEntrada() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [qtde, setQTDE] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");

  useEffect(() => {
    const banco = JSON.parse(localStorage.getItem("produtos") || "[]");
    setProdutos(banco);
  }, []);

  const salvarDados = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
    const estoques = JSON.parse(localStorage.getItem("estoques") || "[]");
    console.log(typeof estoques)
    //iniciando para atualizar entrada
    const entrada = {
      id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
      produto: produtoSelecionado,
      qtde,
      valor_unitario: valorUnitario,
      data_entrada: dataEntrada,
    };
    //buscando todos os produtos no estoque
    
  //filtrando o produto no estoque

    // Se 'estoques' for um array, continue com o código para filtrá-lo.
    console.log("estou no primeiro filter")
    const produtoexiste = estoques.filter((linha) =>{
     return linha.produto === produtoSelecionado
    } );
    // Restante do código...

    //independente de ter o produto no estoque ou nao, aqui será inserido no estoque 
    const entradas = JSON.parse(localStorage.getItem("entradas") || "[]");
    entradas.push(entrada);
    localStorage.setItem("entradas", JSON.stringify(entradas)); 
// até aqui a entrada foi inserida, lembrando que será inserida independente de haver o produto ou nao no estoque


    //atualizando estoque
// aqui verificaremos se o id do produto que foi inserido na entrada, consta no estoque
if (produtoexiste.length > 0 && produtoexiste[0].produto) {
      // caso o produto seja encontrado no estoque, nesse bloco, faremos a atualização da quantidade e do valor desse produto
      console.log("estou no segundo filter")          
      const paraatualizar = estoques.filter((linha)=>{
                 return linha.produto !== produtoSelecionado // fazando um filtro para verificar se o produto esta no estoque
                })
                const qtde_estoque = produtoexiste ? produtoexiste[0].qtde : 0;
                const id_estoque = produtoexiste ? produtoexiste[0].id : 0;
                // aqui faremos a atualização no estoque, na situação de acharmos o produto no estoque
                const atualizarestoque ={
                  id:id_estoque,
                  produto:produtoSelecionado,
                  qtde: parseFloat(qtde_estoque) + parseFloat(entrada.qtde),
                  valor_unitario: valorUnitario,
                }
                paraatualizar.push(atualizarestoque) // aqui estamos juntando o que não foi alterado no estoque com os dados que serão alterados
                localStorage.setItem("estoques", JSON.stringify(paraatualizar));// pronto agora o estoque será alterado
    } else {
      // aqui vai acontecer somente se o produto não foi encontrado no estoque anteriormente.
          
      const novoestoque = {
                id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
                produto: produtoSelecionado,
                qtde: entrada.qtde,
                valor_unitario: valorUnitario,
              };
              estoques.push(novoestoque)  
              localStorage.setItem("estoques", JSON.stringify(estoques));
    }

    alert("Dados Salvos com Sucesso!!!!!");
    navigate("/listaentrada");
  };


  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="header">
        <div className="menu">
          <Menu />
        </div>
        <div className="main">
          <Head title="Cadastro de Entrada" />
          <form onSubmit={salvarDados}>
            <select name="select" value={produtoSelecionado} onChange={(e) => setProdutoSelecionado(e.target.value)}>
              <option value="">Selecione um Produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.descricao}>{produto.descricao}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Quantidade"
              value={qtde}
              onChange={(e) => setQTDE(e.target.value)}
            />
            <input
              type="number"
              placeholder="Valor Unitário"
              value={valorUnitario}
              onChange={(e) => setValorUnitario(e.target.value)}
            />

            <input
              type="date"
              placeholder="data de entrada"
              value={dataEntrada}
              onChange={(e) => setDataEntrada(e.target.value)}
            />
            <button type="submit" className="btn-salvar">
              Salvar
            </button>
          </form>
          {produtoSelecionado}
        </div>
      </div>
    </div>
  );
}
