import { useState } from 'react';
import '../css/VisualizarProduto.css';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import Rating from 'react-rating';

function Nome ({nome, marca}) {
    return (
        <div className="ProdutoNome">
            <h3>{nome}, {marca}</h3>
        </div>
    )
}

function ScoreAverage ({score, quantAvaliacoes}){
    const cheias = [...Array(score)].map((e,i) => <img src="img/EstrelaCheia.png" alt="" width="30px"/>)
    const vazias = [...Array(5-score)].map((e,i) => <img src="img/EstrelaVazia.png" alt="" width="30px"/>)
    return (
        <div className="ProdutoTitulo">
            {cheias}{vazias} {quantAvaliacoes} avaliações
        </div>
    )
}

function Ingredientes ({ingredientes}){
    return (
        <div className="ProdutoTitulo">
            <h4>Ingredientes</h4>
            {ingredientes.map(ingrediente => <span className="badge rounded-pill bg-primary">{ingrediente} </span>)}
        </div>
    )
}

function Descricao ({ descricao }){
    return (
        <div className="ProdutoTitulo">
            {descricao}
        </div>
    )
}

function Review ({review}){
    const imagem = review.ProfilePicture;
    const nome = review.Nome;
    const texto = review.Review;

    return (
        <div>
            <img src={imagem} alt="Imagem de usuário" width="20px" /> <strong>{nome}:</strong> {texto}
        </div>
    );
}

function ListaDeReviews ({reviews}){
    const linhas = [];
    reviews.forEach((review) => {
        linhas.push(
            <Review review={review} key={review.nome}/>
        )
    });
    return (
        <div className="ProdutoTitulo">
            <h4>Review</h4>
            {linhas}
        </div>
    )
}

function AdicionarReview (user){
    const [rating, setRating] = useState(null);

    function handleRatingChange(value){
        setRating(value);
    }

    const popover = (
        <Popover id="popover">
            <Popover.Body>
            <Rating
                emptySymbol={<img src="img/EstrelaVazia.png" alt="" width="20px" className="icon" />}
                fullSymbol={<img src="img/EstrelaCheia.png" alt="" width="20px" className="icon" />}
                onChange={handleRatingChange}
            />
            </Popover.Body>
        </Popover>
    );

    const BotaoEstrelas = () => (
        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <Button variant="rounded-circle botao-estrelas"><img src="img/EstrelaVazia.png" alt="" width="30px"/></Button>
        </OverlayTrigger>
    );

    return (
        <form className="input-group avaliar-split" id="EnviarReview" method='POST'>
            <div className="container-texto">
                <span className="rounded-circle"><img src={USER.ProfilePicture} alt="" width="30px"/></span>
                <textarea className="form-control rounded-pill" name="AdicionarReview" id="AdicionarReview" placeholder="Adicione seu review" rows={3}/>
                <BotaoEstrelas />
                <input type="hidden" name="rating" value={rating} />
            </div>
            <div className="splitScreen">
                <div className='form-check tem-alergia'>
                    <legend className='mt-4'>Possui alergia?</legend>
                    <input type="radio" name="alergia" id="alergia-sim" value="sim"/><label for="alergia-sim">Sim</label><br />
                    <input type="radio" name="alergia" id="alergia-nao" value="nao"/><label for="alergia-nao">Não</label>
                    <input type="text" className="form-control rounded-pill" name="alergia-especifica" id="alergia-especifica" placeholder="Diga qual sua alergia" />
                </div>
                <div className='form-check tipo-pele'>
                    <legend className='mt-4'>Qual seu tipo de pele?</legend>
                    <input type="radio" name="pele" id="normal" value="normal" /><label for="normal">Normal</label><br />
                    <input type="radio" name="pele" id="seca" value="seca"/><label for="seca">Seca</label><br />
                    <input type="radio" name="pele" id="oleosa" value="oleosa"/><label for="oleosa">Oleosa</label><br />
                    <input type="radio" name="pele" id="mista" value="mista"/><label for="mista">Mista</label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary rounded-pill botao-publicar" >Publicar</button>
        </form>
    )
}

export default function VisualizarProduto () {
    return (
        <div className="splitScreen">
            <div className="leftPane">
                <img src={IMAGEM} alt="Imagem do produto" className='imagem-produto'/>
            </div>
            <div className="rightPane">
                <Nome nome={NOME} marca={MARCA} />
                <ScoreAverage score={SCORE} quantAvaliacoes={AVALIACOES} />
                <Ingredientes ingredientes={INGREDIENTES}/>
                <Descricao descricao={DESCRICAO}/>
                <ListaDeReviews reviews={REVIEWS}/>
                <hr />
                <h5>{REVIEWCOUNT} Reviews</h5>
                <AdicionarReview />
            </div>
        </div>
    )
}

const USER = {ProfilePicture: "img/DefaultUser.png"};
const IMAGEM = "img/Produto.png";
const NOME = "Perfume Black";
const MARCA = "VitLojas";
const SCORE = 3;
const AVALIACOES = 22000;
const INGREDIENTES = ["Óleo de Rosas", "Baunilha", "Sândalo", "Jasmim", "Âmbar", "Lavanda", "Almiscar"];
const DESCRICAO = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const REVIEWCOUNT = 40;
const REVIEWS = [
    {ProfilePicture: "img/DefaultUser.png", Nome:"DMac", Review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {ProfilePicture: "img/DefaultUser.png", Nome:"Florzinha", Review:"❤❤❤"}
]