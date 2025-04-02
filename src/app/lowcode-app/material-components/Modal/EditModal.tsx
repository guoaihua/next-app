import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from "react";
import RunTimeModal from "./RunTimeModal";

export interface ModalRef {
  open: () => void;
  close: () => void;
}

const ModalApp: React.ForwardRefRenderFunction<
  ModalRef,
  PropsWithChildren<any>
> = (props, ref) => {
  return (
    <div>
      <RunTimeModal ref={ref} {...props} />
    </div>
  );
};

export const EditModal = forwardRef(ModalApp);
