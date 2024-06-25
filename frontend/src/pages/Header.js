import { Link } from "react-router-dom";

export default function AppHeader (){
    return(
        <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
            <div className="container-fluid">
                <Link to={'./'} className="navbar-brand"><img src="/img/Logo.png" width="40px" alt="logo" /></Link>
                <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={'./'}>Página Inicial</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'./'} className="nav-link">Melhores</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'./'} className="nav-link">Criar</Link>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Pesquisar" />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Pesquisar</button>
                </form>
                </div>
            </div>
        </nav>
    );
}