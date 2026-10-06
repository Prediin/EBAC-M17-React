import { useContext } from "react";
import { useInput } from "../hooks/useInput";
import { UserContext } from "../context/UserContext";
import styles from "./Login.module.css"


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
        <form onSubmit={handleLogin} className={styles.form}>
            <input type="text"
            placeholder="Digite seu nome"
            value={nomeDoUsuario.valor}
            onChange={nomeDoUsuario.onChange}
            className={styles.input}/>
            <button type="submit" className={styles.button}>Entrar</button>
        </form>
    );
}

export default Login;