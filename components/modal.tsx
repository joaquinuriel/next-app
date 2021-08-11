import { createRef, useEffect, useState } from "react";
import styles from "styles/modal.module.sass";

interface ModalBtn {
  text: string;
  handle: () => any;
}

export default function Modal() {
  const modal = createRef<HTMLDivElement>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [input, setInput] = useState("");
  const [buttons, setButtons] = useState<ModalBtn[]>();

  useEffect(() => {
    onclick = (e) => {
      const target = e.target as Node;
      target &&
        modal.current &&
        modal.current.contains(target) &&
        console.log("clicked away");
    };
  }, [modal.current]);

  return (
    <div className={styles.modal} ref={modal}>
      <h4>{title}</h4>
      <h5 hidden={!!description}>{description}</h5>
      <input type="text" placeholder={input} hidden={!!input} />
      <div hidden={buttons && !!buttons.length}>
        {buttons &&
          buttons.map((btn, n) => (
            <button onClick={btn.handle} key={n}>{btn.text}</button>
          ))}
      </div>
    </div>
  );
}

// export function useModal() {
//   return {
//     setTitle,
//     setDescription,
//     setInput,
//     setButtons,
//   };
// }
