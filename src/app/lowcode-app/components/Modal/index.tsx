import { Modal as AntdModal } from 'antd';
import { forwardRef, PropsWithChildren, useImperativeHandle, useState } from 'react';

export interface ModalRef {
    open: () => void
    close: () => void
}


const ModalApp: React.ForwardRefRenderFunction<ModalRef, PropsWithChildren<any>> = ({ children, title, onOk, onCancel, styles }, ref) => {

    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                setOpen(true);
            },
            close: () => {
                setOpen(false);
            }
        }
    }, []);

    return (
        <AntdModal
            title={title}
            style={styles}
            open={open}
            onCancel={() => {
                onCancel && onCancel();
                setOpen(false);
            }}
            onOk={() => {
                onOk && onOk();
            }}
            destroyOnClose
        >
            {children}
        </AntdModal>
    );
}

export const Modal = forwardRef(ModalApp);
