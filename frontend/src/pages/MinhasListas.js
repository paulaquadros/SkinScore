import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import '../css/MinhasListas.css';


function Lista ({lista}){
    const imagem = "/img/Produto.png"
    const nome = lista.nome_lista;

    return (
        <div className="container">
            <img src={imagem} alt=""/>
            <button type="button" className="btn btn-primary rounded-pill"><Link to={`./${lista.id_lista_favoritos}`} >{nome}</Link></button>
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


export default function MinhasListas () {
    const [lista, setLista] = useState();

    useEffect(() => {
        const getListas = async () => {
            try{
                const controller = new AbortController();
                axios.get(`http://localhost:3001/lista-favoritos`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
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
    return (
        <div className="panel">
            <h3>Minhas Listas</h3>
            <button type="button" className="btn btn-primary rounded-pill">Criar Lista</button>
            <ListaDeListas listas={lista}/>
        </div>
    )
}