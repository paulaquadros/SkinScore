import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import '../css/MinhasListas.css';
import { Modal } from "react-bootstrap";


function Lista ({lista}){
    const imagem = "/img/Produto.png";
    const imagem_editar = "/img/edit.png";
    const imagem_compartilhar = "/img/share.png";
    const nome = lista.nome_lista;
    const [privado, setPrivado] = useState(lista.privado)
    const [modalShow, setModalShow] = useState(false);

    const handlePrivadoChange = (e) => {
        e.preventDefault();
        lista.privado = !lista.privado;
        setPrivado(lista.privado);
        try{
            axios.put(`http://3.145.180.184:3001/lista-favoritos/${lista.id_lista_favoritos}`,{
              nome_lista: nome,
              privado: lista.privado,
              id_lista_favoritos: lista.id_lista_favoritos
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
        <div className="container">
            <img src={imagem} alt=""/>
            <button type="button" className="botao-acessar btn btn-primary rounded-pill"><Link to={`./${lista.id_lista_favoritos}`} className="link-botao">{nome}</Link></button>
            <button type="button" className="botao-editar btn btn-primary rounded-circle" onClick={() => setModalShow(true)}><img className="imagem-editar" src={imagem_editar} alt=""/></button>
            <EditarLista
                show={modalShow}
                lista={lista}
                onHide={() => window.location.reload().then(setModalShow(false))}
            />
            <button type="button" className="botao-editar btn btn-primary rounded-circle" onClick={handlePrivadoChange}>{privado ? <img className="imagem-editar" src="/img/privado_on.png" alt=""/> : <img className="imagem-editar" src="/img/privado_off.png" alt=""/>}</button>
            <button type="button" className="botao-editar btn btn-primary rounded-circle"><img className="imagem-compartilhar" src={imagem_compartilhar} alt=""/></button>
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

function EditarLista(props){
    const [nome_lista, setNome_lista] = useState();

    const handleNomeListaChange = (e) => setNome_lista(e.target.value);

    const handleEditarLista = (e) => {
        e.preventDefault();
        try{
            axios.put(`http://3.145.180.184:3001/lista-favoritos/${props.lista.id_lista_favoritos}`,{
              nome_lista: nome_lista,
              privado: props.lista.privado,
              id_lista_favoritos: props.lista.id_lista_favoritos
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
        <form onSubmit={handleEditarLista}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editando Lista {props.lista.nome_lista}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="nome-lista" className="form-label mt-4">Nome da Lista</label>
                <input type="text" id="nome-lista" name="nome-lista" onChange={handleNomeListaChange}/>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary rounded-pill botao-publicar" type="submit">Salvar</button>
            </Modal.Footer>
          </form>
      </Modal>
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
                    Criar Nova Lista
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
            <h2>Minhas Listas</h2>
            <button type="button" className="btn btn-primary rounded-pill botao-criar" onClick={() => setModalShow(true)}>Criar Lista</button>
            <AdicionarLista
                show={modalShow}
                onHide={() => window.location.reload().then(setModalShow(false))}
            />
            <ListaDeListas listas={lista}/>
        </div>
    )
}