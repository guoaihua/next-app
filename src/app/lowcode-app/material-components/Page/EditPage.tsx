import RunTimePage from "./RunTimePage";
import { useApplyDrop } from "@/app/lowcode-app/hooks/useApplyDrop";
import { CSSProperties, PropsWithChildren } from "react";
import { CAN_BE_WRAPPED_LIST } from "../configs";

export const EditPage = (
  props: PropsWithChildren<{ id: number; styles: CSSProperties }>,
) => {
  const { id } = props;
  const { ref } = useApplyDrop({
    accept: CAN_BE_WRAPPED_LIST.concat("modal"),
    id,
  });

  return (
    <div ref={ref} data-component-id={id} className="page w-full h-full">
      <RunTimePage {...props} />
    </div>
  );
};
