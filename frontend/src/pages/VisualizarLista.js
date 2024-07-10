import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Buffer } from "buffer";
import '../css/VisualizarLista.css';

function ScoreAverage ({score, quantAvaliacoes}){
    const cheias = [...Array(score)].map((e,i) => <img key={i} src="/img/EstrelaCheia.png" alt="" width="30px"/>)
    const vazias = [...Array(5-score)].map((e,i) => <img key={i} src="/img/EstrelaVazia.png" alt="" width="30px"/>)
    return (
        <div className="estrelas">
            {cheias}{vazias}
        </div>
    )
}

function Ingredientes ({ingredientes}){
    return (
        <div>
            <div className="ProdutoTitulo ProdutoIngredientes">
                {ingredientes?.split(",")?.map(ingrediente => <span key={ingrediente} className="badge rounded-pill bg-primary">{ingrediente} </span>)}
            </div>
        </div>
    )
}

function ListaDeProdutos(lista){
    const ImagemComponent = ({ base64String }) => {
        return (
            <div>
                <img src={`data:image/jpeg;base64,${base64String}`} className='imagem' alt="Imagem" width="200px"/>
            </div>
        );
    };
    if(lista){
        const listItems = lista?.lista?.map((produto) =>
            <div>
                <li key={produto.Produto.id_produto} className="splitScreen">
                    <div className="leftPane">
                        <ImagemComponent base64String={Buffer.from(produto.Produto.imagem).toString('base64')} />
                    </div>
                    <div className="rightPane">
                        <h3 className="nome-marca"><Link to={`/produtos/${produto?.Produto.id_produto}`}>{produto?.Produto.nome}, {produto?.Produto.marca}</Link></h3>
                        <p>{produto.Produto.descricao}</p>
                        <Ingredientes ingredientes={produto?.Produto.ingredientes}/>
                        <ScoreAverage score={SCORE} />
                    </div>
                </li>
            </div>);

    return (
        <div className="panel">
            {listItems}
        </div>
    )
    }
}

export default function VisualizarLista () {
    const {id} = useParams();
    const [lista, setLista] = useState();

    useEffect(() => {
        const getLista = async () => {
            try{
                const controller = new AbortController();
                axios.get(`http://3.145.180.184:3001/lista-favoritos/${id}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
                    if (error.response) {
                      controller.abort();
                    }}).then(
                    (response) => setLista(response?.data?.itens)
                )
            }catch(error){
                console.error(error);
            }
        }
        getLista();
    },[]);
    return (
        <div>
            <ListaDeProdutos lista={lista}/>
        </div>
    )
}

const SCORE = 3;