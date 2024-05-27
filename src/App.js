import './App.css';
import CadastrarProduto from './components/CadastrarProduto';
import VisualizarProduto from './components/VisualizarProduto';
import AppHeader from './components/header';

function App() {
  return (
    <div className="App">
      <header id="header">
        <AppHeader />
      </header>
      <div className="CadastrarProduto">
        <CadastrarProduto />
      </div>
      <div className="VisualizarProduto">
        <VisualizarProduto />
      </div>
    </div>
  );
}

export default App;
