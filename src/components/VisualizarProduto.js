function Nome ({nome}) {
    return (
        <div className="ProdutoNome">
            <h3>{nome}</h3>
        </div>
    )
}

function Score ({score}){
    const cheias = [...Array(score)].map((e,i) => <img src="img/EstrelaCheia.png" alt="" width="30px"/>)
    const vazias = [...Array(5-score)].map((e,i) => <img src="img/EstrelaVazia.png" alt="" width="30px"/>)
    return (
        <div className="ProdutoTitulo">
            {cheias}{vazias}
        </div>
    )
}

function Ingredientes ({ingredientes}){
    return (
        <div className="ProdutoTitulo">
            <h4>Ingredientes</h4>
            {ingredientes.map(ingrediente => <span className="badge rounded-pill bg-primary">{ingrediente} </span>)}
        </div>
    )
}

function Descricao ({ descricao }){
    return (
        <div className="ProdutoTitulo">
            {descricao}
        </div>
    )
}

function Review ({review}){
    const imagem = review.ProfilePicture;
    const nome = review.Nome;
    const texto = review.Review;

    return (
        <div>
            <img src={imagem} alt="Imagem de usuário" width="20px" /> <strong>{nome}:</strong> {texto}
        </div>
    );
}

function ListaDeReviews ({reviews}){
    const linhas = [];
    reviews.forEach((review) => {
        linhas.push(
            <Review review={review} key={review.nome}/>
        )
    });
    return (
        <div className="ProdutoTitulo">
            <h4>Review</h4>
            {linhas}
        </div>
    )
}

export default function VisualizarProduto () {
    return (
        <div className="splitScreen">
            <div className="leftPane">
                <img src="img/Produto.png" alt="Imagem do produto" className="rounded-pill" />
            </div>
            <div className="rightPane">
                <Nome nome={NOME}/>
                <Score score={SCORE} />
                <Ingredientes ingredientes={INGREDIENTES}/>
                <Descricao descricao={DESCRICAO}/>
                <ListaDeReviews reviews={REVIEWS}/>
                <hr />
                <h5>{REVIEWCOUNT} Reviews</h5>
                <div className="input-group">
                    <div class="input-group-prepend">
                        <span className="input-group-text rounded-pill"><img src="img/DefaultUser.png" alt="" width="30px"/></span>
                    </div>
                    <input type="text" className="form-control rounded-pill" name="AdicionarReview" id="AdicionarReview" placeholder="Adicione seu review"/>
                </div>
            </div>
        </div>
        
    )
}

const NOME = "Perfume Black, VitLojas";
const SCORE = 3;
const INGREDIENTES = ["Óleo de Rosas", "Baunilha", "Sândalo", "Jasmim", "Âmbar", "Lavanda", "Almiscar"];
const DESCRICAO = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const REVIEWCOUNT = 40;
const REVIEWS = [
    {ProfilePicture: "img/DefaultUser.png", Nome:"DMac", Review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {ProfilePicture: "img/DefaultUser.png", Nome:"Florzinha", Review:"❤❤❤"}
]