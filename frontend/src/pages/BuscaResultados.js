import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Buffer } from "buffer";
import '../css/BuscaResultados.css';

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
                await axios.get(`http://localhost:3001/produtos/${produto?.id_produto}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).then(
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
            <div className="flex-item"><Link to={`/produtos/${produto.id_produto}`} className="link-produto">{imageData && <ImagemComponent base64String={Buffer.from(imageData).toString('base64')} />}</Link></div>
            <div className="flex-item nome-produto"><Link to={`/produtos/${produto.id_produto}`} className="link-produto">{produto.nome}, {produto.marca}</Link></div>
            <div className="flex-item estrelas-produto"><ScoreAverage score={produto.nota}/></div>
        </div>
    );
}

function ListaDeProdutos ({produtos}){
    const linhas = [];
    if(produtos){
        produtos?.forEach((produto) => {
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

export default function BuscaResultados() {
    const location = useLocation();
    const busca = location.state.busca;
    const [produtos, setProdutos] = useState([]);
    const [usuario, setUsuario] = useState();
    const [produtosFiltrado, setProdutosFiltrado] = useState();
    const [filtro, setFiltro] = useState("Sem filtro");

    const handleFilterSemFiltro = (e) => {
        e.preventDefault();
        setFiltro("Sem filtro");
        setProdutosFiltrado(produtos);
    }

    const handleFilterMarca = (e) => {
        e.preventDefault();
        setFiltro("Marca");
        setProdutosFiltrado(produtos.filter(produtos => produtos.marca.toLowerCase().includes(busca.toLowerCase())));
    }

    const handleFilterNome = (e) => {
        e.preventDefault();
        setFiltro("Nome");
        setProdutosFiltrado(produtos.filter(produtos => produtos.nome.toLowerCase().includes(busca.toLowerCase())));
    }

    const handleFilterIngredientes = (e) => {
        e.preventDefault();
        setFiltro("Ingredientes");
        setProdutosFiltrado(produtos.filter(produtos => produtos.ingredientes.toLowerCase().includes(busca.toLowerCase())));
    }

    useEffect(() => {
        const getProdutos = async () => {
            try{
                await axios.get(`http://localhost:3001/produtos/search`, {params: {termo: busca}}, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }})
                .then((response) => {setProdutos(response.data); setProdutosFiltrado(response.data);})
            }catch(error){
                console.log(error);
            }
        }
    
        const getUsuario = async () => {
                try{
                    await axios.get(`http://localhost:3001/usuarios/search`, {params: {nome_usuario: busca}}, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }})
                    .then((response) => setUsuario(response.data))
                }catch(error){
                    console.log(error);
                }
        }
        getProdutos();
        getUsuario();
    },[])
    

    return (
        <div>
            <h1>Resultados da Pesquisa</h1>
            
            <h3>Usuários:</h3>
            {usuario && <Link to={`/usuarios/${usuario?.id_usuario}`}><img src="/img/DefaultUser.png" alt="" width="30px"/> {usuario?.nome}</Link>}
            {!usuario && <div className="texto">Nenhum usuário encontrado</div>}
            <hr/>
            <h3>Produtos:</h3>
            <div className="filtros-container">
                <h5 className="filtros">Filtrar por:</h5>
                <div className="filtros">
                    <button className="btn btn-outline-primary rounded-pill" onClick={handleFilterSemFiltro}>Sem Filtro</button>
                    <button className="btn btn-outline-primary rounded-pill" onClick={handleFilterNome}>Nome</button>
                    <button className="btn btn-outline-primary rounded-pill" onClick={handleFilterMarca}>Marca</button>
                    <button className="btn btn-outline-primary rounded-pill" onClick={handleFilterIngredientes}>Ingredientes</button>
                </div>
                <h6 className="filtros">Filtrando por: <span className="texto">{filtro}</span></h6>
            </div>
            <ListaDeProdutos produtos={produtosFiltrado}/>
        </div>
    )
}