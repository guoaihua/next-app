import { CSSProperties } from "react";
import { RunTimeButton } from "./RunTimeButton";
import { useApplyDrag } from "@lowcode/hooks/useApplyDrag";

export const EditButton = (props: {
  id: number;
  styles: CSSProperties;
  text: string;
  name: string;
}) => {
  const { text, name, id, styles, ...resetProps } = props ?? {};
  const { _, drag } = useApplyDrag({ type: "button", id });

  return (
    <div ref={drag as any}>
      <RunTimeButton {...props} />
    </div>
  );
};
