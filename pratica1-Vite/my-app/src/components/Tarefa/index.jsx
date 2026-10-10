import { memo } from "react";
import { Item, Botao, Checkbox, Texto } from "./styles";

function Tarefa({ texto, concluida, onAlternar, onRemover }) {
  return (
    <Item>
      <Checkbox type="checkbox" checked={concluida} onChange={onAlternar}
        aria-label={`Marcar tarefa ${texto} como concluída`} />
      <Texto $concluida={concluida}>{texto}</Texto>
      <Botao type="button" onClick={onRemover}>Remover</Botao>
    </Item>
  );
}

export default memo(Tarefa);
