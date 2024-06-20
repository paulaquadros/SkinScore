export default function Login (){
    return (
        <form action="login" name="login">
            <label for="email" class="form-label mt-4">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="E-mail"/>
            <label for="senha" class="form-label mt-4">Senha</label>
            <input type="password" class="form-control" id="senha" name="senha" placeholder="Senha" autocomplete="off"/>
            <button type="submit" className="btn btn-primary rounded-pill">Enviar</button>
        </form>
    )
}