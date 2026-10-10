import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ListaTarefas from './components/ListaTarefas';
import Login from './components/Login';
import { UserContext } from './context/UserContext.jsx'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    padding: clamp(24px, 7vw, 72px) 16px;
    background: linear-gradient(135deg, #eef7ff 0%, #f8f5ff 100%);
    color: #172033;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
  }
`;

const Main = styled.main`
  width: min(100%, 560px);
  margin: 0 auto;
  padding: clamp(24px, 5vw, 36px) clamp(18px, 5vw, 32px);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 18px;
  box-shadow: 0 18px 45px rgba(55, 78, 120, 0.14);
  backdrop-filter: blur(10px);

  @media (max-width: 420px) {
    padding: 20px 14px;
  }
`;

const Title = styled.h1`
  margin: 0 0 18px;
  color: #172033;
  font-size: clamp(19px, 4vw, 22px);
  font-weight: 750;
  letter-spacing: -0.02em;
  text-align: center;
`;

function App() {

  const [usuario, setUsuario] = useState({nome: null, estaLogado: false});

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      <>
        <GlobalStyle />
        <Main>
          <Title>{usuario.nome}'s List App</Title>
        {usuario.estaLogado ? <ListaTarefas/> : <Login/>}
        </Main>
      </>
    </UserContext.Provider>
  )
}

export default App
