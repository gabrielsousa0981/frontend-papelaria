import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logon from './pages/logon';
import Dashboard from './pages/dashboard';
import Cadastrousuario from './pages/cadastroUsuario';
import Cadastroproduto from './pages/cadastroProduto';
import CadastroEntrada from './pages/cadastroEntrada';
import CadastroEstoque from './pages/cadastroEstoque';
import CadastroSaida from './pages/cadastroSaida'; // Importe a página de cadastro de saída

import Listausuarios from './pages/listaUsuarios';
import Listaprodutos from './pages/listaProdutos';
import ListaEntrada from './pages/listaEntrada';
import ListaEstoque from './pages/listaEstoque';
import ListaSaida from './pages/listaSaida';

import Editarusuario from './pages/editarUsuario';
import Editarproduto from './pages/editarProduto';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Logon />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastrousuario" element={<Cadastrousuario />} />
        <Route path="/cadastroproduto" element={<Cadastroproduto />} />
        <Route path="/cadastroentrada" element={<CadastroEntrada />} />
        <Route path="/cadastrosaida" element={<CadastroSaida />} /> {/* Adicione a rota para o cadastro de saída */}
        <Route path="/cadastroestoque" element={<CadastroEstoque />} />

        <Route path="/listausuario" element={<Listausuarios />} />
        <Route path="/listaproduto" element={<Listaprodutos />} />
        <Route path="/listaentrada" element={<ListaEntrada />} />
        <Route path="/listaestoque" element={<ListaEstoque />} />
        <Route path="/listasaida" element={<ListaSaida />} />

        <Route path="/editarusuario/:id" element={<Editarusuario />} />
        <Route path="/editarproduto/:id" element={<Editarproduto />} />
      </Routes>
    </BrowserRouter>
  );
}
