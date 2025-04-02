import RunTimeSearch from "./RunTimeSearch";
import { useApplyDrag } from "@lowcode/hooks/useApplyDrag";

export const EditSearch = (props) => {
  const id = props.id;
  const { _, drag } = useApplyDrag({ type: "search", id });

  return (
    <div ref={drag as any} data-component-id={id}>
      {" "}
      <RunTimeSearch {...props} />
    </div>
  );
};
