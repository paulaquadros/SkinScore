import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import '../css/MinhasListas.css';
import { Buffer } from "buffer";


const ImagemComponent = ({ base64String }) => {
  return (
      <div>
          <img src={`data:image/jpeg;base64,${base64String}`} className='imagem-produto' alt="Imagem" />
      </div>
  );
};

function Lista ({lista}){
    const {id} = useParams();
    const nome = lista.nome_lista;
    const [imageData, setImageData] = useState();

    useEffect(() => {
        const getImagem = async () => {
            try{
                await axios.get(`http://localhost:3001/produtos/${lista?.primeiro_produto.id_produto}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).then(
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
           {imageData && <ImagemComponent base64String={Buffer.from(imageData).toString('base64')} />}
           {!imageData && <img src="/img/Produto.png" alt=""/>}
            <button type="button" className="botao-acessar btn btn-primary rounded-pill"><Link to={`/listas/usuario/${id}/${lista.id_lista_favoritos}`} className="link-botao">{nome}</Link></button>
        </div>
    );
}

function ListaDeListas ({listas}){
    const linhas = [];
    if(listas){
        listas?.forEach((lista) => {
            linhas.push(
                <Lista lista={lista} key={lista?.id_lista_favoritos} />
            )
        });
    }
    return (
        <div className="ListaNome">
            {linhas}
        </div>
    )
}

export default function Usuario () {
    const [lista, setLista] = useState();
    const [user, setUser] = useState();
    const {id} = useParams();

    useEffect(() => {
      const getUsuario = async () => {
        try{
            const controller = new AbortController();
            axios.get(`http://localhost:3001/usuarios/${id}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
                if (error.response) {
                  controller.abort();
                }}).then(
                (response) => {setUser(response?.data);}
            )
        }catch(error){
            console.error(error);
        }
    }
        const getListas = async () => {
            try{
                const controller = new AbortController();
                axios.get(`http://localhost:3001/lista-favoritos/favoritos/usuario/${id}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
                    if (error.response) {
                      controller.abort();
                    }}).then(
                    (response) => {setLista(response?.data);}
                )
            }catch(error){
                console.error(error);
            }
        }
        getUsuario();
        getListas();
    },[]);

    return (
        <div className="panel">
            <h2>Listas de {user?.nome}</h2>
            {(lista || lista?.lenght>0) && <ListaDeListas listas={lista}/>}
            {(!lista || lista?.length<1) && <div className="texto">{user?.nome} não possui nenhuma lista pública</div>}
        </div>
    )
}