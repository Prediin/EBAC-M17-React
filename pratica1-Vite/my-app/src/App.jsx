import { useEffect, useState } from "react";
import Tarefa from './components/Tarefa';
import ListaTarefas from './components/ListaTarefas';
import Login from './components/Login.jsx';
import { UserContext } from './context/UserContext.jsx'
import styles from './App.module.css';

function App() {

  const [usuario, setUsuario] = useState({nome: null, estaLogado: false});

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      <main className={styles.main}>
        <h1 className={styles.title}>{usuario.nome}'s List App</h1>
        {usuario.estaLogado ? <ListaTarefas/> : <Login/>}
      </main>
    </UserContext.Provider>
  )
}

export default App
