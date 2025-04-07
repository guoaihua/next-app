import { RunTimeTableItem } from "./RunTimeTableItem";
export const EditTableItem = (props) => {
  const { id } = props ?? {};
  return (
    <div>
      {" "}
      <RunTimeTableItem />{" "}
    </div>
  );
};
