import { memo, useEffect, useState } from "react";
import './Tarefa.css';

type TarefaProps = {
    texto: string;
};

function Tarefa({ texto }: TarefaProps) {
    const [concluida, setConcluida] = useState(false);

    useEffect(() => {
        console.log("Componente montado.", texto);
    }, []);

    console.log("Componente App executado.", texto);

    const alternarConcluida = () => {
        setConcluida(!concluida);
    };

    return (
        <li><input type="checkbox" onChange={alternarConcluida}/> <span className={concluida ? 'concluida' : ''}>{texto}</span> <button>Remover</button></li>
    );
}

export default memo(Tarefa);
