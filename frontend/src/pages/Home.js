import { Link } from "react-router-dom";
import '../css/Home.css';

export default function Home() {
    return(
        <div className="splitScreen">
            <div className="left">
                <img className="imagem-home" src="/img/home.jpg" alt=""/>
            </div>
            <div className="right">
                <div className="texto-1">Veja, faça, experimente, crie</div>
                <div className="texto-2">Descubra com SkinScore os melhores produtos para você</div>
                {!sessionStorage.getItem('token') && <button type="button" className="botao-registrar btn btn-primary rounded-pill"><Link to={'./registrar'} className="link-botao">Comece agora</Link></button>}
                {sessionStorage.getItem('token') && <button type="button" className="botao-registrar btn btn-primary rounded-pill"><Link to={'./produtos'} className="link-botao">Catálogo de produtos</Link></button>}
            </div>
        </div>
    )
}