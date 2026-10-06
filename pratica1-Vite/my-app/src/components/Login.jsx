import { useContext } from "react";
import { useInput } from "../hooks/useInput";
import { UserContext } from "../context/UserContext";


function Login() {

    const nomeDoUsuario = useInput();
    const nomeBotao = nomeDoUsuario.valor.trim();
    const { setUsuario } = useContext(UserContext);
    const handleLogin = (e) => {
        e.preventDefault();
        //validar
        setUsuario({ nome: nomeDoUsuario.valor, estaLogado: true });
    }

    return (
        <form onSubmit={handleLogin}>
            <input type="text"
            placeholder="Digite seu nome"
            value={nomeDoUsuario.valor}
            onChange={nomeDoUsuario.onChange}/>
            <button type="submit">Entrar</button>
        </form>
    );
}

export default Login;