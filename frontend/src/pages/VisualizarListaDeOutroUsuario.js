import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Buffer } from "buffer";
import '../css/VisualizarLista.css';

function ScoreAverage ({score, quantAvaliacoes}){
    if(score && score>-1){
        score = Math.floor(score);
        const cheias = [...Array(score)].map((e,i) => <img key={i} src="/img/EstrelaCheia.png" alt="" width="30px"/>)
        const vazias = [...Array(5-score)].map((e,i) => <img key={i} src="/img/EstrelaVazia.png" alt="" width="30px"/>)
        return (
            <div className="avaliacoes">
                {cheias}{vazias}
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
            <div className="ProdutoTitulo ProdutoIngredientes">
                {ingredientes?.split(",")?.map(ingrediente => <span key={ingrediente} className="badge rounded-pill bg-primary">{ingrediente} </span>)}
            </div>
        </div>
    )
}

function ListaDeProdutos({lista}){
    console.log(lista);
    const ImagemComponent = ({ base64String }) => {
        return (
            <div>
                <img src={`data:image/jpeg;base64,${base64String}`} className='imagem' alt="Imagem" width="200px"/>
            </div>
        );
    };

    if(lista){
        const listItems = lista?.map((produto) =>
            <div>
                <li key={produto.Produto.id_produto} className="splitScreen">
                    <div className="leftPane">
                        {produto.Produto.imagem && <ImagemComponent base64String={Buffer.from(produto.Produto.imagem).toString('base64')} />}
                    </div>
                    <div className="rightPane">
                        <h3 className="nome-marca"><Link to={`/produtos/${produto?.Produto.id_produto}`}>{produto?.Produto.nome}, {produto?.Produto.marca}</Link></h3>
                        <p>{produto.Produto.descricao}</p>
                        <Ingredientes ingredientes={produto?.Produto.ingredientes}/>
                        <ScoreAverage score={produto?.Produto.nota} />
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

export default function VisualizarListaDeOutroUsuario () {
    const {id_usuario, id_lista} = useParams();
    const [lista, setLista] = useState();

    useEffect(() => {
        const getLista = async () => {
            try{
                const controller = new AbortController();
                axios.get(`http://localhost:3001/lista-favoritos/favoritos/usuario/${id_usuario}/lista/${id_lista}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
                    if (error.response) {
                      controller.abort();
                    }}).then(
                    (response) => {setLista(response?.data);console.log(response?.data)}
                )
            }catch(error){
                console.error(error);
            }
        }
        getLista();
    },[]);

    return (
        <div className="panel">
            <div className="titulo-lista">
                <h2>{lista?.nome_lista}</h2>
            </div>
            <ListaDeProdutos lista={lista?.ItemLista}/>
        </div>
    )
}