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
    if(score && score>-1){
        score = Math.floor(score);
        const cheias = [...Array(score)].map((e,i) => <img key={i} src="/img/EstrelaCheia.png" alt="" width="30px"/>)
        const vazias = [...Array(5-score)].map((e,i) => <img key={i} src="/img/EstrelaVazia.png" alt="" width="30px"/>)
        return (
            <div className="avaliacoes">
                {cheias}{vazias} {quantAvaliacoes} avaliações
            </div>
        )
    }else{
        const vazias = [...Array(5)].map((e,i) => <img key={i} className="estrelas-sem-avaliacoes" src="/img/EstrelaVazia.png" alt="" width="30px"/>)
        return (
            <div className="avaliacoes">
                {vazias} Produto sem avaliações
            </div>
        )
    }
    
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
    const [nome, setNome] = useState("Usuario");
    const texto = review.comentario;

    useEffect(() => {
        const getData = async () => {
            try{
                await axios.get(`http://localhost:3001/usuarios/${review?.id_usuario}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).then(
                    (response) => {
                        setNome(response?.data.nome);
                    }
                );
                
            }catch(error){
                console.log(error);
            }
        }

        getData();
    },[]);

    return (
        <div>
            <img src={imagem} alt="Imagem de usuário" width="20px" /> <strong>{nome}:</strong> {texto}
        </div>
    );
}

function ListaDeReviews ({reviews}){
    console.log(reviews);
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
            <div className="leftPanel">
                {imageData && <ImagemComponent base64String={Buffer.from(imageData).toString('base64')} />}
            </div>
            <div className="rightPanel">
                <Nome nome={produto?.nome} marca={produto?.marca} />
                <ScoreAverage score={produto?.nota} quantAvaliacoes={reviews?.length} />
                <Ingredientes ingredientes={produto?.ingredientes}/>
                <Descricao descricao={produto?.descricao}/>
                <ListaDeReviews reviews={reviews} />
                {sessionStorage.getItem('token') && <button type="button" className="btn btn-primary rounded-pill botao-publicar"><Link to={`/avaliar/${id}`} className="link-botao">Avaliar Produto</Link></button>}
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