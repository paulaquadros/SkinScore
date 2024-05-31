import '../css/CadastrarProduto.css';

function UploadImagem () {
    return (
        <div>
            <form className="image-upload">
                <label for="input-imagem">
                    <img src="img/UploadImagem.png" alt="Escolha sua imagem"/>
                </label>
                <input type="file" accept="image/*" id="input-imagem" />
            </form>
        </div>
    );
}

function Formularios () {
    return (
        <div>
            <form className="splitScreen" id="FormProduto" method="POST">
                <UploadImagem />
                <fieldset className='form-produto'>
                    <div>
                        <label for="NomeProduto" className="form-label mt-4">Nome</label>
                        <input type="text" className="form-control rounded-pill" id="NomeProduto" placeholder="Adicione o nome do produto" />
                    </div>
                    <div>
                        <label for="MarcaProduto" className="form-label mt-4">Marca</label>
                        <input type="text" className="form-control rounded-pill" id="MarcaProduto" placeholder="Adicione a marca do produto" />
                    </div>
                    <div>
                        <label for="Descricao" className="form-label mt-4"><strong>Descrição</strong></label>
                        <textarea className="form-control rounded-pill" id="DescricaoProduto" name="Descricao" placeholder="Adicione uma descrição detalhada do produto" rows="3"></textarea>
                    </div>
                    <div>
                        <label for="IngredientesProduto" className="form-label mt-4">Ingredientes</label>
                        <input type="text" className="form-control rounded-pill" id="IngredientesProduto" placeholder="Adicione os ingredientes do produto, para cada ingrediente use uma # antes" />
                    </div>
                    <br />
                    <input type="submit" className="btn btn-dark rounded-pill" value="Publicar" />
                </fieldset>
            </form>
        </div>
    );
}

export default function CadastrarProduto () {
    return (
        <div>
            <Formularios />
        </div>
    )
}