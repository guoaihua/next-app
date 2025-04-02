import { CSSProperties } from "react";
import { RunTimeButton } from "./RunTimeButton";
import { useDrag } from "react-dnd";

export const EditButton = (props: {
  id: number;
  styles: CSSProperties;
  text: string;
  name: string;
}) => {
  const { text, name, id, styles, ...resetProps } = props ?? {};

  const [_, drag] = useDrag({
    type: "button",
    item: {
      type: "button",
      dragType: "move",
      id,
    },
  });

  return (
    <div ref={drag as any}>
      <RunTimeButton {...props} />
    </div>
  );
};
