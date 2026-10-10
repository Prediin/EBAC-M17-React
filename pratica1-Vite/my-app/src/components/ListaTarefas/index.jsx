import { useContext, useEffect, useState } from "react";
import Tarefa from "../Tarefa";
import { useInput } from "../../hooks/useInput";
import { UserContext } from "../../context/UserContext.jsx";
import { Form, Input, Button, List } from "./styles";

const STORAGE_KEY = "tarefasPorUsuario";

function obterTarefasSalvas() {
  try {
    const tarefasSalvas = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return tarefasSalvas && typeof tarefasSalvas === "object" ? tarefasSalvas : {};
  } catch (error) {
    console.error("Erro ao carregar tarefas salvas", error);
    return {};
  }
}

function chaveDoUsuario(nome) { return nome.trim().toLowerCase(); }

function carregarTarefasDoUsuario(nome) {
  const tarefasDoUsuario = obterTarefasSalvas()[chaveDoUsuario(nome)];
  return Array.isArray(tarefasDoUsuario) ? tarefasDoUsuario : [];
}

function salvarTarefasDoUsuario(nome, tarefas) {
  const tarefasPorUsuario = obterTarefasSalvas();
  tarefasPorUsuario[chaveDoUsuario(nome)] = tarefas;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefasPorUsuario));
}

function criarId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function ListaTarefas() {
  const { usuario } = useContext(UserContext);
  const tarefa = useInput();
  const [tarefas, setTarefas] = useState(() => carregarTarefasDoUsuario(usuario.nome));

  useEffect(() => { salvarTarefasDoUsuario(usuario.nome, tarefas); }, [usuario.nome, tarefas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const texto = tarefa.valor.trim();
    if (!texto) return;
    setTarefas((tarefasAtuais) => [...tarefasAtuais, {
      id: criarId(), usuario: usuario.nome, texto, concluida: false,
    }]);
    tarefa.limpar();
  };

  const alternarTarefa = (id) => setTarefas((tarefasAtuais) => tarefasAtuais.map((item) =>
    item.id === id ? { ...item, concluida: !item.concluida } : item
  ));

  const removerTarefa = (id) => setTarefas((tarefasAtuais) =>
    tarefasAtuais.filter((item) => item.id !== id)
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Digite uma nova tarefa" value={tarefa.valor} onChange={tarefa.onChange} />
        <Button type="submit">Adicionar</Button>
      </Form>
      <List>
        {tarefas.map((item) => (
          <Tarefa key={item.id} texto={item.texto} concluida={item.concluida}
            onAlternar={() => alternarTarefa(item.id)} onRemover={() => removerTarefa(item.id)} />
        ))}
      </List>
    </>
  );
}

export default ListaTarefas;
