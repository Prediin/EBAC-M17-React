function Tarefa({texto}){
    return (
        <li><input type="checkbox" /> {texto} <button>Remover</button></li>
    );
}

export default Tarefa;