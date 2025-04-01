import { CSSProperties, PropsWithChildren, useEffect, useRef } from "react";
import { useApplyDrop } from "@/app/lowcode-app/hooks/useApplyDrop";
import "./index.scss";
import RuntimeContainer from "./RunTimeContainer";
import { useApplyDrag } from "@lowcode/hooks/useApplyDrag";
import { CAN_BE_WRAPPED_LIST } from "../configs";

export const EditContainer = (
  props: PropsWithChildren<{
    id: number;
    styles: CSSProperties;
    isFlex: boolean;
  }>,
) => {
  const { id } = props;
  const { ref } = useApplyDrop({ accept: CAN_BE_WRAPPED_LIST, id });
  const { _, drag } = useApplyDrag({ type: "container", id });
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    drag(divRef);
    ref(divRef);
  }, []);

  return (
    <div ref={divRef}>
      <RuntimeContainer {...props} />
    </div>
  );
};
