import axios from "axios";
import { useState } from "react"
import {useNavigate} from 'react-router-dom';
import '../css/Login.css';
import { Modal } from "react-bootstrap";

export default function Login (props){
    const [nome_usuario, setNome_usuario] = useState();
    const [senha, setSenha] = useState();
    const [error, setError] = useState();
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate();

    const handleUsuarioChange = (e) => setNome_usuario(e.target.value);
    const handleSenhaChange = (e) => setSenha(e.target.value);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        axios.post('http://3.145.180.184:3001/auth/login',{
          nome_usuario: nome_usuario,
          senha: senha,
        }).then(
          (response)=>{sessionStorage.setItem('token', response.data.token); setModalShow(true);}
        ).catch(function (error) {
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
        <h2 className="panel">Login</h2>
        {error===400 && <div className="texto-erro"><img src="/img/error.png" alt="" width="20px"/> Não foi possível efetuar o login. Verifique suas credenciais e tente novamente.</div>}
        <form action="login" name="login" onSubmit={handleSubmit}>
            <label htmlFor="nome_usuario" className="form-label mt-4">Nome de Usuário</label>
            <input type="text" className="form-control rounded-pill" id="nome_usuario" name="nome_usuario" onChange={handleUsuarioChange}/>
            <label htmlFor="senha" className="form-label mt-4">Senha</label>
            <input type="password" className="form-control rounded-pill" id="senha" name="senha" autoComplete="off" onChange={handleSenhaChange}/>
            <div className="div-botao-publicar">
              <button type="submit" className="btn btn-primary rounded-pill botao-publicar">Enviar</button>
            </div>
        </form>
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => {setModalShow(false); navigate('/produtos')}}
        >
          <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h2 className="texto-login-ok">Login bem-sucedido!</h2>
          </Modal.Body>
          <Modal.Footer>
              <div className="confirmar">
                  <button className="btn btn-primary rounded-pill botao-login-ok" type="button" onClick={() => {setModalShow(false); navigate('/produtos')}}>Ok</button>
              </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
}