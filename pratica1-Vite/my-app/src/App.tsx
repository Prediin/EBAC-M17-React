import Tarefa from "./components/Tarefa"

function App() {
  const tarefas = [
    {id: 1, texto: "Estudar React"},
    {id: 2, texto: "Fazer compras"},
    {id: 3, texto: "Responder e-mails"}
  ];
  return (
    <main>
      <h1>To-Do List App</h1>
      <ul>
        {tarefas.map(tarefa => <Tarefa key={tarefa.id} texto={tarefa.texto}/>)}
      </ul>
    </main>
  )
}

export default App
