import { useEffect, useState } from "react";
import Tarefa from './components/Tarefa';
import { useInput } from "./hooks/useInput";

const API_URL = "https://crudcrud.com/api/0e7543a80c94419d9e1d67248241f226/tarefas";

function App() {

  const [tarefas, setTarefas] = useState([]);
  const tarefa = useInput();

  console.log('Componente App executado.');

  useEffect(() => {
    console.log('Componente montado.')
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar tarefas");
        }

        return res.json();
      })
      .then((dados) => setTarefas(dados))
      .catch((error) => console.error("Erro ao buscar tarefas", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const texto = tarefa.valor.trim();
    if (texto === '') return;

    //Evio da tarefa para API
    const nova = { texto };
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nova),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao criar tarefa");
        }

        return res.json();
      })
      .then((tarefaCriada) => {
        setTarefas((tarefasAtuais) => [...tarefasAtuais, tarefaCriada]);
        tarefa.limpar();
      })
      .catch((error) => console.error("Erro ao criar tarefa", error));
  };

  return (
    <main>
      <h1>To-Do List App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite uma nova tarefa" 
        value={tarefa.valor}
        onChange={tarefa.onChange}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tarefas.map(tarefa => <Tarefa key={tarefa._id} texto={tarefa.texto}/>)}
      </ul>
    </main>
  )
}

export default App
