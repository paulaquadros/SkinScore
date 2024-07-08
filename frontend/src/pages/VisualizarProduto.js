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

function AdicionarReview (user){
    const [rating, setRating] = useState(0);
    const [comentario, setComentario] = useState();
    const [alergia, setAlergia] = useState();
    const [pele, setPele] = useState();
    const [id_usuario, setId_usuario] = useState(1);
    const { id } = useParams();

    function handleRatingChange(value){
        setRating(value);
    }

    const handleComentarioChange = (e)=>setComentario(e.target.value);
    const handleAlergiaChange = (e)=>setAlergia(e.target.value);
    const handlePeleChange = (e)=>setPele(e.target.value);

    const popover = (
        <Popover id="popover">
            <Popover.Body>
            <Rating
                emptySymbol={<img src="/img/EstrelaVazia.png" alt="" width="20px" className="icon" />}
                fullSymbol={<img src="/img/EstrelaCheia.png" alt="" width="20px" className="icon" />}
                onChange={handleRatingChange}
            />
            </Popover.Body>
        </Popover>
    );

    const BotaoEstrelas = () => (
        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <Button variant="rounded-circle botao-estrelas"><img src="/img/EstrelaVazia.png" alt="" width="30px"/></Button>
        </OverlayTrigger>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id_usuario', id_usuario);
        formData.append('id_produto', id);
        formData.append('nota_estrelas', rating);
        formData.append('comentario', comentario);
        formData.append('tipo_pele', pele);
        formData.append('alergia', alergia);
        
        try {
            //console.log(formData); //<- verificar os dados que estão sendo enviados
            const response = await fetch('http://3.145.180.184:3001/reviews', {
              method: 'POST',
              body: formData
            });
            if (response.ok) {
              console.log('Form submitted successfully');
            } else {
                console.error('Form submission error');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return (
        <form className="input-group avaliar-split" id="EnviarReview" method='POST' onSubmit={handleSubmit}>
            <div className="container-texto">
                <span className="rounded-circle"><img src={USER.ProfilePicture} alt="" width="30px"/></span>
                <textarea className="form-control rounded-pill" name="comentario" id="comentario" placeholder="Adicione seu review" rows={3} onChange={handleComentarioChange}/>
                <BotaoEstrelas />
                <input type="hidden" name="nota_estrelas" value={rating} />
                <input type="hidden" name="id_produto" value={id}/>
                <input type="hidden" name="id_usuario" value={id_usuario}/>
            </div>
            <div className="splitScreen">
                <div className='form-check tem-alergia'>
                    <legend className='mt-4'>Possui alergia?</legend>
                    <input type="radio" name="alergia" id="alergia-sim" value="sim" onChange={handleAlergiaChange}/><label htmlFor="alergia-sim">Sim</label><br />
                    <input type="radio" name="alergia" id="alergia-nao" value="nao" onChange={handleAlergiaChange}/><label htmlFor="alergia-nao">Não</label>
                    <input type="text" className="form-control rounded-pill" name="alergia" id="alergia-especifica" placeholder="Diga qual sua alergia" onChange={handleAlergiaChange}/>
                </div>
                <div className='form-check tipo-pele'>
                    <legend className='mt-4'>Qual seu tipo de pele?</legend>
                    <input type="radio" name="tipo_pele" id="normal" value="normal" onChange={handlePeleChange}/><label htmlFor="normal">Normal</label><br />
                    <input type="radio" name="tipo_pele" id="seca" value="seca" onChange={handlePeleChange}/><label htmlFor="seca">Seca</label><br />
                    <input type="radio" name="tipo_pele" id="oleosa" value="oleosa" onChange={handlePeleChange}/><label htmlFor="oleosa">Oleosa</label><br />
                    <input type="radio" name="tipo_pele" id="mista" value="mista" onChange={handlePeleChange}/><label htmlFor="mista">Mista</label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary rounded-pill botao-publicar" >Publicar</button>
        </form>
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
                axios.get(`http://3.145.180.184:3001/reviews/produto/${id}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
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
                await axios.get(`http://3.145.180.184:3001/produtos/${id}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).then(
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
                <button type="button" className="btn btn-primary rounded-pill botao-publicar"><Link to={`/avaliar/${id}`}>Avaliar Produto</Link></button>
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