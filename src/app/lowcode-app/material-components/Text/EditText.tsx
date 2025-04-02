import RunTimeText from "./RunTimeText";
import { useApplyDrag } from "@lowcode/hooks/useApplyDrag";

export const EditText = (props) => {
  const { id } = props;
  const { drag } = useApplyDrag({ type: "text", id });

  return (
    <div ref={drag as any} data-component-id={id}>
      <RunTimeText {...props} />
    </div>
  );
};
