import { Link } from "react-router-dom";

export default function Home() {
    return(
        <div>
            <Link to={'./cadastrar'}>Cadastrar Produto</Link>
            <br/>
            <Link to={'./produtos/'}>Visualizar Produtos</Link>
        </div>
    )
}