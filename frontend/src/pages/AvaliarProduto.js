import { useEffect, useState } from 'react';
import '../css/AvaliarProduto.css';
import { Modal } from 'react-bootstrap';
import Rating from 'react-rating';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from "buffer";

function Nome ({nome, marca}) {
    return (
        <div className="ProdutoNome">
            <h3>{nome}, {marca}</h3>
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

function ListaDeListas ({listas, onChange}){
    const linhas = [];

    if(listas){
        listas?.forEach((lista) => {
            linhas.push(
                <div className="container-texto">
                    <input type="radio" name="listas" id={lista.nome_lista} className="flex-item" value={lista.id_lista_favoritos} onChange={onChange}/><label className="label" htmlFor={lista.nome_lista}>{lista.nome_lista}</label>
                </div>
            )
        });
    }
    return (
        <div className="container-container">
            {linhas}
        </div>
    )
}

function AdicionarLista(props){
    const [lista, setLista] = useState();
    const {id} = useParams();
    const [id_lista, setId_lista] = useState(null);
    
    const adicionarParaLista = async () => {
        try{
            const controller = new AbortController();
            axios.post(`http://3.145.180.184/lista-favoritos/adicionar`,{
                id_lista_favoritos: id_lista,
                id_produto: id
            }, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
                if (error.response) {
                  controller.abort();
                }}).then(props.setModalShow(false))
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        const getListas = async () => {
            try{
                const controller = new AbortController();
                axios.get(`http://3.145.180.184/lista-favoritos`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
                    if (error.response) {
                      controller.abort();
                    }}).then(
                    (response) => setLista(response?.data)
                )
            }catch(error){
                console.error(error);
            }
        }
        
        getListas();
    },[]);

    const handleSubmitLista = (e) => {e.preventDefault(); adicionarParaLista();}

    const handleChangeIdLista = (e) => setId_lista(e.target.value);

    return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Salvar em qual lista?
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmitLista}>
        <Modal.Body>
            <div className="panel"><ListaDeListas listas={lista} id_lista={id_lista} onChange={handleChangeIdLista}/></div>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-primary rounded-pill botao-publicar" type="submit" disabled={!id_lista}>🤍 Salvar</button>
        </Modal.Footer>
      </form>
    </Modal>
    )
}

function AdicionarReview (){
    const [rating, setRating] = useState(0);
    const [comentario, setComentario] = useState();
    const [alergia, setAlergia] = useState();
    const [pele, setPele] = useState();
    const { id } = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [showOk, setShowOk] = useState(false);

    const navigate = useNavigate();

    function handleRatingChange(value){
        setRating(value);
    }

    const handleComentarioChange = (e)=>setComentario(e.target.value);
    const handleAlergiaChange = (e)=>setAlergia(e.target.value);
    const handlePeleChange = (e)=>setPele(e.target.value);

    const BotaoEstrelas = () => (
        <div>
            <h3>Quantas estrelas você atribui?</h3>
            <Rating
                emptySymbol={<img src="/img/EstrelaVazia.png" alt="" width="50px" className="icon" />}
                fullSymbol={<img src="/img/EstrelaCheia.png" alt="" width="50px" className="icon" />}
                onChange={handleRatingChange}
            />
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            axios.post('http://3.145.180.184/reviews',{
                id_produto: id,
                nota_estrelas: rating,
                comentario: comentario,
                tipo_pele: pele,
                alergia: alergia
            }, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }})
            .then(setShowOk(true))
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
              })
            }catch(error){
                console.log(error);
            }
    }

    return (
        <div>
            <form className="input-group avaliar-split" id="EnviarReview" method='POST' onSubmit={handleSubmit}>
                <BotaoEstrelas />
                <div className="splitScreen">
                    <div className='form-check tipo-pele'>
                        <legend className='mt-4'>Qual seu tipo de pele?</legend>
                        <div className="flex-item"><input type="radio" name="tipo_pele" id="normal" value="normal" onChange={handlePeleChange}/><label htmlFor="normal">Normal</label></div>
                        <div className="flex-item"><input type="radio" name="tipo_pele" id="seca" value="seca" onChange={handlePeleChange}/><label htmlFor="seca">Seca</label></div>
                        <div className="flex-item"><input type="radio" name="tipo_pele" id="oleosa" value="oleosa" onChange={handlePeleChange}/><label htmlFor="oleosa">Oleosa</label></div>
                        <div className="flex-item"><input type="radio" name="tipo_pele" id="mista" value="mista" onChange={handlePeleChange}/><label htmlFor="mista">Mista</label></div>
                    </div>
                    <div className='form-check tem-alergia'>
                        <legend className='mt-4'>Possui alergia?</legend>
                        <div className="flex-item"><input type="radio" name="alergia" id="alergia-sim" value="sim" onChange={handleAlergiaChange}/><label htmlFor="alergia-sim">Sim</label></div>
                        <div className="flex-item"><input type="radio" name="alergia" id="alergia-nao" value="nao" onChange={handleAlergiaChange}/><label htmlFor="alergia-nao">Não</label></div>
                        <div className="flex-item"><input type="text" className="form-control rounded-pill" name="alergia" id="alergia-especifica" placeholder="Diga qual sua alergia" onChange={handleAlergiaChange}/></div>
                    </div>
                </div>
                <div className="container-texto">
                    <span className="rounded-circle"><img src={USER.ProfilePicture} alt="" width="30px"/></span>
                    <textarea className="form-control rounded-pill" name="comentario" id="comentario" placeholder="Adicione seu review" rows={3} onChange={handleComentarioChange}/>
                    <input type="hidden" name="nota_estrelas" value={rating} />
                    <input type="hidden" name="id_produto" value={id}/>
                </div>
                <div className="botoes">
                    <button type="submit" className="btn btn-primary rounded-pill botao-publicar" >Publicar</button>
                    <button type="button" className="btn btn-primary rounded-pill botao-publicar" onClick={() => setModalShow(true)}>🤍 Salvar na sua lista</button>
                    <AdicionarLista
                        show={modalShow}
                        setModalShow={setModalShow}
                        onHide={() => {setModalShow(false); setShowOk(false);}}
                    />
                </div>
            </form>
            <Modal
                show={showOk}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => {setShowOk(false); navigate(`/produtos/${id}`)}}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2 className="texto-login-ok">Review publicada com sucesso</h2>
                </Modal.Body>
                <Modal.Footer>
                    <div className="confirmar">
                        <button className="btn btn-primary rounded-pill botao-login-ok" type="button" onClick={() => {setShowOk(false); navigate(`/produtos/${id}`)}}>Ok</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default function AvaliarProduto () {
    const {id} = useParams();
    const [produto, setProduto] = useState();
    const [imageData, setImageData] = useState();

    useEffect(() => {
        const getData = async () => {
            try{
                await axios.get(`http://3.145.180.184/produtos/${id}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).then(
                    (response) => {
                        setProduto(response?.data);
                        setImageData(response?.data.imagem.data);
                    }
                );
                
            }catch(error){
                console.log(error);
            }
        }

        getData();
    },[]);

    return (
        <div className="splitScreen">
            <div className="leftPane">
                <Nome nome={produto?.nome} marca={produto?.marca} />
                {imageData && <ImagemComponent base64String={Buffer.from(imageData).toString('base64')} />}
                <Ingredientes ingredientes={produto?.ingredientes}/>
            </div>
            <div className="rightPane">
                <AdicionarReview />
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