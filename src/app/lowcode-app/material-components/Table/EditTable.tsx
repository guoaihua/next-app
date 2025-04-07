import { RunTimeTable } from "./RunTimeTable";
import { useApplyDrag } from "@lowcode/hooks/useApplyDrag";
import { useApplyDrop } from "@/app/lowcode-app/hooks/useApplyDrop";
import { CAN_BE_WRAPPED_LIST } from "../configs";
import { useEffect, useRef } from "react";

export const EditTable = (props) => {
  const { id, ...resetProps } = props ?? {};
  const { _, drag } = useApplyDrag({ type: "table", id });
  const { ref } = useApplyDrop({ accept: CAN_BE_WRAPPED_LIST, id });
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    drag(divRef);
    ref(divRef);
  }, []);
  return (
    <div ref={divRef as any} data-component-id={id}>
      <RunTimeTable {...resetProps} />
    </div>
  );
};
