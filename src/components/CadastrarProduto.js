import '../css/CadastrarProduto.css';
import { useState } from 'react';

export default function CadastrarProduto () {
    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState("");
    const [descricao, setDescricao] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState("img/UploadImagem.png");
    
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
    const handleIngredientesChange = (e)=>setIngredientes(e.target.value);

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
              body: formData
            });
            if (response.ok) {
              console.log('Form submitted successfully');
            } else {
              console.error('Form submission error');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return (
        <div>
            <form className="splitScreen" id="FormProduto" onSubmit={handleSubmit} method="GET">
                <div>
                    <form className="image-upload">
                        <label for="input-imagem">
                            <img className="imagem" src={imgData} alt="Escolha sua imagem"/>
                        </label>
                        <input type="file" name="Imagem" accept="image/*" id="input-imagem" onChange={handleChangePicture}/>
                    </form>
                </div>
                <fieldset className='form-produto'>
                    <div>
                        <label for="NomeProduto" className="form-label mt-4">Nome</label>
                        <input required type="text" className="form-control rounded-pill" name="Nome" id="NomeProduto" placeholder="Adicione o nome do produto" onChange={handleNomeChange} />
                    </div>
                    <div>
                        <label for="MarcaProduto" className="form-label mt-4">Marca</label>
                        <input required type="text" className="form-control rounded-pill" name="Marca" id="MarcaProduto" placeholder="Adicione a marca do produto" onChange={handleMarcaChange}/>
                    </div>
                    <div>
                        <label for="Descricao" className="form-label mt-4"><strong>Descrição</strong></label>
                        <textarea required className="form-control rounded-pill" name="Descricao" id="DescricaoProduto" placeholder="Adicione uma descrição detalhada do produto" rows="3" onChange={handleDescricaoChange} />
                    </div>
                    <div>
                        <label for="IngredientesProduto" className="form-label mt-4">Ingredientes</label>
                        <input required type="text" className="form-control rounded-pill" name="Ingredientes" id="IngredientesProduto" placeholder="Adicione os ingredientes do produto, para cada ingrediente use uma # antes" onChange={handleIngredientesChange}/>
                    </div>
                    <button type="submit" className="btn btn-dark rounded-pill" value="Publicar" disabled={!nome || !marca || !descricao || !ingredientes}>Publicar</button>
                </fieldset>
            </form>
        </div>
    )
}