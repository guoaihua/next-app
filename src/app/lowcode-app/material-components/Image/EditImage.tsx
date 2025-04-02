import { RunTimeImage } from "./RunTimeImage";
import { useApplyDrag } from "@lowcode/hooks/useApplyDrag";
export const EditImage = (props) => {
  const { id, ...resetProps } = props ?? {};
  const { _, drag } = useApplyDrag({ type: "image", id });
  return (
    <div ref={drag as any} id={id}>
      <RunTimeImage {...resetProps} />
    </div>
  );
};
