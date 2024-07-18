import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/VisualizarProdutos.css';
import { Buffer } from "buffer";

function ScoreAverage ({score}){
    const cheias = [...Array(score)].map((e,i) => <img key={i} src="/img/EstrelaCheia.png" alt="" width="30px"/>)
    const vazias = [...Array(5-score)].map((e,i) => <img key={i} src="/img/EstrelaVazia.png" alt="" width="30px"/>)
    return (
        <div className="estrelas">
            {cheias}{vazias}
        </div>
    )
}

const ImagemComponent = ({ base64String }) => {
    return (
        <div>
            <img src={`data:image/jpeg;base64,${base64String}`} className='imagem-produto' alt="Imagem" />
        </div>
    );
};

function Produto ({produto}){
    const [imageData, setImageData] = useState();

    useEffect(() => {
        const getImagem = async () => {
            try{
                await axios.get(`http://3.145.180.184:3001/produtos/${produto?.id_produto}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).then(
                    (response) => {
                        setImageData(response?.data.imagem.data);
                    }
                );
                
            }catch(error){
                console.log(error);
            }
        }
        getImagem();
    },[]);
    
    return (
        <div className="container">
            <div className="flex-item"><Link to={`./${produto.id_produto}`} className="link-produto">{imageData && <ImagemComponent base64String={Buffer.from(imageData).toString('base64')} />}</Link></div>
            <div className="flex-item nome-produto"><Link to={`./${produto.id_produto}`} className="link-produto">{produto.nome}</Link></div>
            <div className="flex-item estrelas-produto"><ScoreAverage score={SCORE}/></div>
        </div>
    );
}

function ListaDeProdutos ({produtos}){
    const linhas = [];
    if(produtos){
        produtos?.forEach((produto) => {
            console.log(produto)
            linhas.push(
                <Produto produto={produto} key={produto?.id_produto} />
            )
        });
    }
    return (
        <div className="lista-produtos">
            {linhas}
        </div>
    )
}



export default function VisualizarProdutos() {
    const [produtos, setProdutos] = useState([]);
    
    useEffect(() => {
        const getProdutos = async () => {
            try{
                const controller = new AbortController();
                axios.get(`http://3.145.180.184:3001/produtos`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
                    if (error.response) {
                      controller.abort();
                    }}).then(
                    (response) => setProdutos(response?.data)
                )
            }catch(error){
                console.error(error);
            }
        }
        getProdutos();
    },[]);

    return(
        <div className="panel">
            <ListaDeProdutos produtos={produtos}/>
        </div>
    )
}

const SCORE = 3;