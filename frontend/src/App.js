import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CadastrarProduto from './pages/CadastrarProduto';
import VisualizarProduto from './pages/VisualizarProduto';
import VisualizarProdutos from './pages/VisualizarProdutos';
import Login from './pages/Login';
import CadastrarUsuario from './pages/CadastrarUsuario';
import AppHeader from './pages/Header';
import MinhasListas from './pages/MinhasListas';
import VisualizarLista from './pages/VisualizarLista';
import AvaliarProduto from './pages/AvaliarProduto';
import BuscaResultados from './pages/BuscaResultados';

function App() {
  return (
    <div>
      <AppHeader/>
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route path="/cadastrar" Component={CadastrarProduto}/>
        <Route path="/produtos" Component={VisualizarProdutos}/>
        <Route path="/produtos/:id" Component={VisualizarProduto}/>
        <Route path="/login" Component={Login}/>
        <Route path="/registrar" Component={CadastrarUsuario}/>
        <Route path="/listas" Component={MinhasListas}/>
        <Route path="/listas/:id" Component={VisualizarLista}/>
        <Route path="/avaliar/:id" Component={AvaliarProduto}/>
        <Route path="/search" Component={BuscaResultados}/>
      </Routes>
    </div>
  );
}

export default App;
