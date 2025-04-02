import { useDrag } from "react-dnd";

export const useApplyDrag = ({ type, id }) => {
  const [_, drag] = useDrag({
    type: type,
    item: {
      type: type,
      dragType: "move",
      id,
    },
  });
  return {
    _,
    drag,
  };
};
