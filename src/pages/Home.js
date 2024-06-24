import { Link } from "react-router-dom";

export default function Home() {
    return(
        <div>
            <Link to={'./cadastrar'}>Cadastrar Produto</Link>
            <br/>
            <Link to={'./produtos/'}>Visualizar Produtos</Link>
            <br/>
            <Link to={'./registrar'}>Registrar Usuário</Link>
            <br/>
            <Link to={'./login'}>Login</Link>
        </div>
    )
}