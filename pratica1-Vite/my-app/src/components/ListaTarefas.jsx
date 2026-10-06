import { useContext, useEffect, useState } from "react";
import Tarefa from './Tarefa';
import { useInput } from "../hooks/useInput";
import { UserContext } from "../context/UserContext.jsx";

const API_URL = "https://crudcrud.com/api/1eeb8e5b138a4ced82e67e8b2c162611b/tarefas";
const LOCAL_STORAGE_KEY = "tarefas";

function carregarTarefasLocais() {
  try {
    const tarefasSalvas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    return Array.isArray(tarefasSalvas) ? tarefasSalvas : [];
  } catch (error) {
    console.error("Erro ao carregar tarefas locais", error);
    return [];
  }
}

function ListaTarefas() {

  const [tarefas, setTarefas] = useState([]);
  const [apiDisponivel, setApiDisponivel] = useState(true);
  const tarefa = useInput();
  const {usuario} = useContext(UserContext);

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
      .catch((error) => {
        console.warn("API indisponível; carregando tarefas locais.", error);
        setApiDisponivel(false);
        setTarefas(carregarTarefasLocais());
      });
  }, []);

  const salvarTarefaLocal = (nova) => {
    const tarefaCriada = { ...nova, _id: crypto.randomUUID() };
    const tarefasAtualizadas = [...carregarTarefasLocais(), tarefaCriada];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tarefasAtualizadas));
    setTarefas((tarefasAtuais) => [...tarefasAtuais, tarefaCriada]);
    tarefa.limpar();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const texto = tarefa.valor.trim();
    if (texto === '') return;

    //Evio da tarefa para API
    const nova = { usuario: usuario.nome, texto};
    if (!apiDisponivel) {
      salvarTarefaLocal(nova);
      return;
    }

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
      .catch((error) => {
        console.warn("API indisponível; salvando tarefa localmente.", error);
        setApiDisponivel(false);
        salvarTarefaLocal(nova);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite uma nova tarefa" 
        value={tarefa.valor}
        onChange={tarefa.onChange}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tarefas
            .filter(tarefa => tarefa.usuario === usuario.nome)
        .map(tarefa => <Tarefa key={tarefa._id} texto={tarefa.texto}/>)}
      </ul>
    </>
  )
}

export default ListaTarefas
