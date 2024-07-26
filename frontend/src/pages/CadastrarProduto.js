import '../css/CadastrarProduto.css';
import { useState } from 'react';
import ChipInput from './ChipInput';
import { Modal } from "react-bootstrap";

export default function CadastrarProduto () {
    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState("");
    const [descricao, setDescricao] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState("/img/UploadImagem.png");
    const [modalShow, setModalShow] = useState(false);
    
    const handleChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
            setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleNomeChange = (e)=>setNome(e.target.value);
    const handleMarcaChange = (e)=>setMarca(e.target.value);
    const handleDescricaoChange = (e)=>setDescricao(e.target.value);
    const handleIngredientesChange = (e)=>setIngredientes(e);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('imagem', picture);
        formData.append('nome', nome);
        formData.append('marca', marca);
        formData.append('descricao', descricao);
        formData.append('ingredientes', ingredientes);

        try {
            const response = await fetch('http://localhost:3001/produtos', {
              method: 'POST',
              body: formData,
              headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
            });
            if (response.ok) {
                setModalShow(true);
            } else {
              console.error('Form submission error');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    if(sessionStorage.getItem('token')){
        return (
            <div>
                <h2 className="panel">Cadastrar Produto</h2>
                <form className="splitScreen" id="FormProduto" onSubmit={handleSubmit} method="GET">
                    <div className="image-upload leftPane">
                        <label htmlFor="input-imagem">
                            <img className="imagem" src={imgData} alt="Escolha sua imagem"/>
                        </label>
                        <input type="file" name="Imagem" accept="image/*" id="input-imagem" onChange={handleChangePicture}/>
                    </div>
                    <fieldset className='form-produto rightPane'>
                        <div>
                            <label htmlFor="NomeProduto" className="form-label mt-4">Nome</label>
                            <input required type="text" className="form-control rounded-pill" name="Nome" id="NomeProduto" placeholder="Adicione o nome do produto" onChange={handleNomeChange} />
                        </div>
                        <div>
                            <label htmlFor="MarcaProduto" className="form-label mt-4">Marca</label>
                            <input required type="text" className="form-control rounded-pill" name="Marca" id="MarcaProduto" placeholder="Adicione a marca do produto" onChange={handleMarcaChange}/>
                        </div>
                        <div>
                            <label htmlFor="Descricao" className="form-label mt-4"><strong>Descrição</strong></label>
                            <textarea required className="form-control rounded-pill" name="Descricao" id="DescricaoProduto" placeholder="Adicione uma descrição detalhada do produto" rows="3" onChange={handleDescricaoChange} />
                        </div>
                        <div>
                            <ChipInput onDataFromChips={handleIngredientesChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary rounded-pill botao-publicar" value="Publicar" disabled={imgData==="/img/UploadImagem.png" || !nome || !marca || !descricao || !ingredientes} onClick={handleIngredientesChange}>Publicar</button>
                    </fieldset>
                </form>
                <Modal
                    show={modalShow}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={() => setModalShow(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2 className="texto-login-ok">Produto cadastrado com sucesso</h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="confirmar">
                            <button className="btn btn-primary rounded-pill botao-login-ok" type="button" onClick={() => setModalShow(false)}>Ok</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }else{
        return(
            <h1>Usuário precisa estar logado!</h1>
        )
    }
    
}