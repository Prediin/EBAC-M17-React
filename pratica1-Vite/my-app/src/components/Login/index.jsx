import { useContext } from "react";
import { useInput } from "../../hooks/useInput";
import { UserContext } from "../../context/UserContext";
import { Form, Input, Button } from "./styles";

function Login() {
  const nomeDoUsuario = useInput();
  const { setUsuario } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setUsuario({ nome: nomeDoUsuario.valor, estaLogado: true });
  };

  return (
    <Form onSubmit={handleLogin}>
      <Input type="text" placeholder="Digite seu nome" value={nomeDoUsuario.valor}
        onChange={nomeDoUsuario.onChange} />
      <Button type="submit">Entrar</Button>
    </Form>
  );
}

export default Login;
