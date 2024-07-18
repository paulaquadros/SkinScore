import { Link } from "react-router-dom";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { Button } from "react-bootstrap";
import '../css/Header.css';

function BotaoLoginCadastrar () {
    return (
        <div>
            <button type="button" className="botao btn btn-primary rounded-pill"><Link to={'./login'} className="link-botao">Login</Link></button>
            <button type="button" className="botao btn btn-primary rounded-pill"><Link to={'./registrar'} className="link-botao">Cadastro</Link></button>
        </div>
    )
}

export default function AppHeader (){

    const popover = (
        <Popover id="popover">
            <Popover.Body>
                <div className="botoes">
                    <button type="button" className="btn btn-primary rounded-pill" ><Link to={'./listas'} className="link-botao">Ver Perfil</Link></button>
                    <button type="button" className="btn btn-primary rounded-pill" >Log Out</button>
                </div>
            </Popover.Body>
        </Popover>
    );

    const BotaoUsuario = () => (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button variant="rounded-circle"><img src="/img/DefaultUser.png" alt="" width="30px"/></Button>
        </OverlayTrigger>
    );

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
                            <Link to={'./produtos'} className="nav-link">Melhores</Link>
                        </li>
                        <li className="nav-item">
                            {sessionStorage.getItem("token") && <Link to={'./cadastrar'} className="nav-link">Criar</Link>}
                        </li>
                        
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-sm-2 rounded-pill" type="search" placeholder="🍳 Pesquisar" />
                        <button className="btn btn-primary rounded-pill my-2 my-sm-0" type="submit">Pesquisar</button>
                    </form>
                    {sessionStorage.getItem('token') && <BotaoUsuario />}
                    {!sessionStorage.getItem('token') && <BotaoLoginCadastrar />}
                </div>
            </div>
        </nav>
    );
}