import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function VisualizarProdutos() {
    const [produtos, setProdutos] = useState([]);
    const getData = async () => {
        try{
            await axios.get(`http://3.145.180.184:3001/produtos/`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }}).then((response) => {
                setProdutos(response.data.map(produto => produto))
            });
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    return(
        <div>
            <h3>Produtos</h3>
            <ul>
                {produtos.map(produto => <li><Link to={`./${produto.id_produto}`}>{produto.nome}</Link></li>)}
            </ul>
            
        </div>
    )
}