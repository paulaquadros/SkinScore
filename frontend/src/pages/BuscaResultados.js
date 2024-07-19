import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Buffer } from "buffer";

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
            <div className="flex-item"><Link to={`./${produto.id_produto}`} className="link-produto">{imageData && <ImagemComponent base64String={Buffer.from(imageData).toString('base64')} />}</Link></div>
            <div className="flex-item nome-produto"><Link to={`./${produto.id_produto}`} className="link-produto">{produto.nome}</Link></div>
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

    useEffect(() => {
        const getProdutos = async () => {
            try{
                await axios.get(`http://localhost:3001/produtos/search`, {params: {termo: busca}}, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }})
                .then((response) => {setProdutos(response.data); console.log(response.data);})
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
            <Link to={`/usuarios/${usuario?.id_usuario}`}><img src="/img/DefaultUser.png" alt="" width="30px"/> {usuario?.nome}</Link>
            <hr/>
            <h3>Produtos:</h3>
            <ListaDeProdutos produtos={produtos}/>
        </div>
    )
}