import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logon from './pages/logon';
import Dashboard from './pages/dashboard';
import Cadastrousuario from './pages/cadastroUsuario';
import Cadastroproduto from './pages/cadastroProduto';
import CadastroEntrada from './pages/cadastroEntrada';
import CadastroSaida from './pages/cadastroSaida';
import Listausuarios from './pages/listaUsuarios';
import Listaprodutos from './pages/listaProdutos';
import ListaEntrada from './pages/listaEntrada';
import ListaEstoque from './pages/listaEstoque';
import ListaSaida from './pages/listaSaida';
import Editarusuario from './pages/editarUsuario';
import Editarproduto from './pages/editarProduto';
import EditarEntrada from './pages/editarEntrada'; // Importe a página de edição de entrada

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Logon />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastrousuario" element={<Cadastrousuario />} />
        <Route path="/cadastroproduto" element={<Cadastroproduto />} />
        <Route path="/cadastroentrada" element={<CadastroEntrada />} />
        <Route path="/cadastrosaida" element={<CadastroSaida />} />

        <Route path="/listausuario" element={<Listausuarios />} />
        <Route path="/listaproduto" element={<Listaprodutos />} />
        <Route path="/listaentrada" element={<ListaEntrada />} />
        <Route path="/listaestoque" element={<ListaEstoque />} />
        <Route path="/listasaida" element={<ListaSaida />} />

        <Route path="/editarusuario/:id" element={<Editarusuario />} />
        <Route path="/editarproduto/:id" element={<Editarproduto />} />
        <Route path="/editarentrada/:id" element={<EditarEntrada />} /> {/* Adicione a rota para a edição de entrada */}
      </Routes>
    </BrowserRouter>
  );
}