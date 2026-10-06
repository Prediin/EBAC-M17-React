import { memo } from "react";
import styles from "./Tarefa.module.css";

function Tarefa({ texto, concluida, onAlternar, onRemover }) {
  return (
    <li className={styles.li}>
      <input
        type="checkbox"
        checked={concluida}
        onChange={onAlternar}
        className={styles.checkbox}
        aria-label={`Marcar tarefa ${texto} como concluída`}
      />
      <span className={concluida ? styles.concluida : ""}>{texto}</span>
      <button type="button" onClick={onRemover} className={styles.button}>
        Remover
      </button>
    </li>
  );
}

export default memo(Tarefa);
