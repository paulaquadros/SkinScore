import axios from "axios";
import { useState } from "react"
import {useNavigate} from 'react-router-dom';
import '../css/Login.css';

export default function Login (props){
    const [nome_usuario, setNome_usuario] = useState();
    const [senha, setSenha] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleUsuarioChange = (e) => setNome_usuario(e.target.value);
    const handleSenhaChange = (e) => setSenha(e.target.value);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        axios.post('http://localhost:3001/auth/login',{
          nome_usuario: nome_usuario,
          senha: senha,
        }).then(
          (response)=>sessionStorage.setItem('token', response.data.token)
        ).catch(function (error) {
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
        }).then(navigate("/produtos"))
      }catch(error){
        console.log(error);
      }
    }

    return (
      <div className="panel">
        <form action="login" name="login" onSubmit={handleSubmit}>
            <label htmlFor="nome_usuario" className="form-label mt-4">Nome de Usuário</label>
            <input type="text" className="form-control rounded-pill" id="nome_usuario" name="nome_usuario" onChange={handleUsuarioChange}/>
            <label htmlFor="senha" className="form-label mt-4">Senha</label>
            <input type="password" className="form-control rounded-pill" id="senha" name="senha" autoComplete="off" onChange={handleSenhaChange}/>
            <div className="div-botao-publicar">
              <button type="submit" className="btn btn-primary rounded-pill botao-publicar">Enviar</button>
            </div>
        </form>
      </div>
    )
}