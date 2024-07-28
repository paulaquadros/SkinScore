import axios from "axios";
import { useState } from "react";
import '../css/CadastrarUsuario.css';
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CadastrarUsuario (){
    const [nome, setNome] = useState();
    const [nome_usuario, setNome_usuario] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [tipo_usuario, setTipo_usuario] = useState("C");
    const [error, setError] = useState();
    const [emailError, setEmailError] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate();

    const handleNomeChange = (e) => setNome(e.target.value);
    const handleUsuarioChange = (e) => setNome_usuario(e.target.value);
    const handleSenhaChange = (e) => setSenha(e.target.value);
    const handleTipoChange = (e) => setTipo_usuario(e.target.value);

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }

    const handleEmailChange = (e) => {
      if (!isValidEmail(e.target.value)) {
        setEmailError('Email inválido');
      } else {
        setEmailError(null);
      }
      setEmail(e.target.value);
    }
    
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
        axios.post('http://3.145.180.184/auth/registrar',{
          nome: nome,
          nome_usuario: nome_usuario,
          email: email,
          senha: senha,
          tipo_usuario: tipo_usuario
        })
        .then(setModalShow(true))
        .catch(function (error) {
          if (error.response) {
            setError(error.response.status);
          }
        })
      }catch(error){
        console.log(error);
      }
    }

    return (
      <div className="panel">
        <h2>Cadastrar Usuário</h2>
        <form id="cadastrar_usuario" name="cadastrar_usuario" onSubmit={handleSubmit}>
            <label htmlFor="nome" className="form-label mt-4">Nome Completo</label>
            <input type="text" className="form-control rounded-pill" id="nome" name="nome" onChange={handleNomeChange}/>
            <label htmlFor="nome_usuario" className="form-label mt-4">Nome de Usuário</label>
            <input type="text" className="form-control rounded-pill" id="nome_usuario" name="nome_usuario" onChange={handleUsuarioChange}/>
            {error===400 && <div className="texto-erro"><img src="/img/error.png" alt="" width="20px"/> Nome de usuário já existe.</div>}
            <label htmlFor="email" className="form-label mt-4">Email</label>
            <input type="email" className="form-control rounded-pill" id="email" name="email" onChange={handleEmailChange}/>
            {emailError && <div className="texto-erro"><img src="/img/error.png" alt="" width="20px"/> {emailError}</div>}
            <label htmlFor="senha" className="form-label mt-4">Senha</label>
            <input type="password" className="form-control rounded-pill" id="senha" name="senha" autoComplete="off" onChange={handleSenhaChange}/>
            <div className="div-botao-publicar">
              <button type="submit" className="btn btn-primary rounded-pill botao-publicar" disabled={!nome || !email || !nome_usuario || !senha || emailError}>Cadastrar</button>
            </div>
        </form>
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => {setModalShow(false); navigate('/login')}}
        >
          <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h2 className="texto-login-ok">Usuário cadastrado com sucesso</h2>
          </Modal.Body>
          <Modal.Footer>
              <div className="confirmar">
                  <button className="btn btn-primary rounded-pill botao-login-ok" type="button" onClick={() => {setModalShow(false); navigate('/login')}}>Ok</button>
              </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
}