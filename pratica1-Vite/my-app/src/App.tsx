import { useEffect, useState, type FormEvent } from "react";
import Tarefa from "./components/Tarefa";

const API_URL = "https://crudcrud.com/api/41456e5ea65d4e57ab2945d865b2e2b6/tarefas";

type TarefaData = {
  _id?: string;
  texto: string;
};

function App() {
  const [tarefas, setTarefas] = useState<TarefaData[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const texto = novaTarefa.trim();
    if (texto === "") return;

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
        setNovaTarefa("");
      })
      .catch((error) => console.error("Erro ao criar tarefa", error));
  };

  return (
    <main>
      <h1>To-Do List App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite uma nova tarefa" 
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
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
