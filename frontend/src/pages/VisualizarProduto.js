import { useEffect, useState } from 'react';
import '../css/VisualizarProduto.css';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import Rating from 'react-rating';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from "buffer";
import { Link } from 'react-router-dom';

function Nome ({nome, marca}) {
    return (
        <div className="ProdutoNome">
            <h3>{nome}, {marca}</h3>
        </div>
    )
}

function ScoreAverage ({score, quantAvaliacoes}){
    const cheias = [...Array(score)].map((e,i) => <img key={i} src="/img/EstrelaCheia.png" alt="" width="30px"/>)
    const vazias = [...Array(5-score)].map((e,i) => <img key={i} src="/img/EstrelaVazia.png" alt="" width="30px"/>)
    return (
        <div className="ProdutoTitulo">
            {cheias}{vazias} {quantAvaliacoes} avaliações
        </div>
    )
}

function Ingredientes ({ingredientes}){
    return (
        <div>
            <h4>Ingredientes</h4>
            <div className="ProdutoTitulo ProdutoIngredientes">
                {ingredientes?.split(",")?.map(ingrediente => <span key={ingrediente} className="badge rounded-pill bg-primary">{ingrediente} </span>)}
            </div>
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
    const imagem = "/img/DefaultUser.png" //review.ProfilePicture;
    const nome = "Usuario1" //review.Nome;
    const texto = review.comentario;

    return (
        <div>
            <img src={imagem} alt="Imagem de usuário" width="20px" /> <strong>{nome}:</strong> {texto}
        </div>
    );
}

function ListaDeReviews ({reviews}){
    const linhas = [];
    if(reviews){
        reviews?.forEach((review) => {
            linhas.push(
                <Review review={review} key={review?.id_review} />
            )
        });
    }
    return (
        <div className="ProdutoTitulo">
            <h4>Reviews</h4>
            {linhas}
            <hr/>
            <h5>{linhas.length} reviews</h5>
        </div>
    )
}

export default function VisualizarProduto () {
    const {id} = useParams();
    const [produto, setProduto] = useState();
    const [reviews, setReviews] = useState();
    const [imageData, setImageData] = useState();

    useEffect(() => {
        const getReviews = async () => {
            try{
                const controller = new AbortController();
                axios.get(`http://localhost:3001/reviews/produto/${id}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
                    if (error.response) {
                      controller.abort();
                    }}).then(
                    (response) => setReviews(response?.data)
                )
            }catch(error){
                console.error(error);
            }
        }
    
        const getData = async () => {
            try{
                await axios.get(`http://localhost:3001/produtos/${id}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).then(
                    (response) => {
                        setProduto(response?.data);
                        setImageData(response?.data.imagem.data);
                    }
                );
                
            }catch(error){
                console.log(error);
            }
        }

        getReviews();
        getData();
    },[]);

    return (
        <div className="splitScreen">
            <div className="leftPane">
                {imageData && <ImagemComponent base64String={Buffer.from(imageData).toString('base64')} />}
            </div>
            <div className="rightPane">
                <Nome nome={produto?.nome} marca={produto?.marca} />
                <ScoreAverage score={SCORE} quantAvaliacoes={AVALIACOES} />
                <Ingredientes ingredientes={produto?.ingredientes}/>
                <Descricao descricao={produto?.descricao}/>
                <ListaDeReviews reviews={reviews} />
                <button type="button" className="btn btn-primary rounded-pill botao-publicar"><Link to={`/avaliar/${id}`} className="link-botao">Avaliar Produto</Link></button>
            </div>
        </div>
    )
}

const ImagemComponent = ({ base64String }) => {
    return (
        <div>
            <img src={`data:image/jpeg;base64,${base64String}`} className='imagem' alt="Imagem" />
        </div>
    );
};

const USER = {ProfilePicture: "/img/DefaultUser.png"};
//const IMAGEM = "/img/Produto.png";
//const NOME = "Perfume Black";
//const MARCA = "VitLojas";
const SCORE = 3;
const AVALIACOES = 22000;
/*const INGREDIENTES = "Óleo de Rosas, Baunilha, Sândalo, Jasmim, Âmbar, Lavanda, Almiscar";
const DESCRICAO = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const REVIEWCOUNT = 40;
const REVIEWS = [
    {id_review: 1, ProfilePicture: "/img/DefaultUser.png", nome:"DMac", comentario:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {id_review: 2, ProfilePicture: "/img/DefaultUser.png", nome:"Florzinha", comentario:"❤❤❤"}
]*/