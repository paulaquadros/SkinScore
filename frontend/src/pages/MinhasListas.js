import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import '../css/MinhasListas.css';
import { Modal } from "react-bootstrap";


function Lista ({lista}){
    const imagem = "/img/Produto.png"
    const nome = lista.nome_lista;

    return (
        <div className="container">
            <img src={imagem} alt=""/>
            <button type="button" className="btn btn-primary rounded-pill"><Link to={`./${lista.id_lista_favoritos}`} className="link-botao">{nome}</Link></button>
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

function AdicionarLista(props){
    const [nome_lista, setNome_lista] = useState();
    const [privado, setPrivado] = useState(true);

    const handleNomeListaChange = (e) => setNome_lista(e.target.value);
    const handlePrivadoChange = (e) => setPrivado(e.target.value);

    const handleCriarLista = (e) => {
        e.preventDefault();
        try{
            axios.post('http://3.145.180.184:3001/lista-favoritos/',{
              nome_lista: nome_lista,
              privado: privado
            }, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
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
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <form onSubmit={handleCriarLista}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Salvar em qual lista?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="nome-lista" className="form-label mt-4">Nome da Lista</label>
                <input type="text" id="nome-lista" name="nome-lista" onChange={handleNomeListaChange}/>
                <p>Lista Privada?</p>
                <input type="radio" id="radio-privado-sim" name="radio-privado" value={true} onChange={handlePrivadoChange}/><label htmlFor="radio-privado-sim">Sim</label>
                <input type="radio" id="radio-privado-nao" name="radio-privado" value={false} onChange={handlePrivadoChange}/><label htmlFor="radio-privado-nao">Não</label>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary rounded-pill botao-publicar" type="submit">Criar Lista</button>
            </Modal.Footer>
          </form>
      </Modal>
    )
}

export default function MinhasListas () {
    const [lista, setLista] = useState();
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const getListas = async () => {
            try{
                const controller = new AbortController();
                axios.get(`http://3.145.180.184:3001/lista-favoritos`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).catch(function (error) {
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
            <button type="button" className="btn btn-primary rounded-pill botao-publicar" onClick={() => setModalShow(true)}>Criar Lista</button>
            <AdicionarLista
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <ListaDeListas listas={lista}/>
        </div>
    )
}