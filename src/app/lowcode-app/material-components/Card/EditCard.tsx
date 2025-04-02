import RunTimeCard from "./RunTimeCard";
import { PropsWithChildren, useEffect, useRef } from "react";
import { ComponentsBase } from "@lowcode/types/component";
import { useApplyDrop } from "@/app/lowcode-app/hooks/useApplyDrop";
import { useApplyDrag } from "@lowcode/hooks/useApplyDrag";
import { CAN_BE_WRAPPED_LIST } from "../configs";

export const EditCard = (props: PropsWithChildren<{} & ComponentsBase>) => {
  const { id } = props;
  const { ref } = useApplyDrop({ accept: CAN_BE_WRAPPED_LIST, id });
  const { _, drag } = useApplyDrag({ type: "card", id });
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    drag(divRef);
    ref(divRef);
  }, []);

  return (
    <div ref={divRef}>
      <RunTimeCard {...props} />
    </div>
  );
};
