import axios from "axios";
import { useState } from "react";

export default function CadastrarUsuario (){
    const [nome, setNome] = useState();
    const [nome_usuario, setNome_usuario] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [tipo_usuario, setTipo_usuario] = useState();

    const handleNomeChange = (e) => setNome(e.target.value);
    const handleUsuarioChange = (e) => setNome_usuario(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleSenhaChange = (e) => setSenha(e.target.value);
    const handleTipoChange = (e) => setTipo_usuario(e.target.value);

    const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
        axios.post('http://localhost:3001/auth/registrar',{
          nome: nome,
          nome_usuario: nome_usuario,
          email: email,
          senha: senha,
          tipo_usuario: tipo_usuario
        }).catch(function (error) {
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
        <form name="cadastrar_usuario" onSubmit={handleSubmit}>
            <label htmlFor="nome" className="form-label mt-4">Nome</label>
            <input type="nome" className="form-control" id="nome" name="nome" placeholder="Nome completo" onChange={handleNomeChange}/>
            <label htmlFor="nome_usuario" className="form-label mt-4">Nome de Usuário</label>
            <input type="nome_usuario" className="form-control" id="nome_usuario" name="nome_usuario" placeholder="Nome de usuário" onChange={handleUsuarioChange}/>
            <label htmlFor="email" className="form-label mt-4">E-mail</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="E-mail" onChange={handleEmailChange}/>
            <label htmlFor="senha" className="form-label mt-4">Senha</label>
            <input type="password" className="form-control" id="senha" name="senha" placeholder="Senha" autoComplete="off" onChange={handleSenhaChange}/>
            <p>Tipo de Usuário</p>
            <input type="radio" id="tipo_usuario_admin" name="tipo_usuario" value="A" onChange={handleTipoChange}/><label htmlFor="tipo_usuario_admin" >Admin</label><br />
            <input type="radio" id="tipo_usuario_comum" name="tipo_usuario" value="C" onChange={handleTipoChange}/><label htmlFor="tipo_usuario_comum">Comum</label><br />
            <button type="submit" className="btn btn-primary rounded-pill">Cadastrar</button>
        </form>
    )
}