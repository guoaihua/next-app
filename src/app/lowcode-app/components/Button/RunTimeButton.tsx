/** 运行时，最小运行组件 */

import { CSSProperties } from "react"
import { Button as AntButton } from "antd";
import config from './config'

export const RunTimeButton = (props: {
    id: number;
    styles: CSSProperties;
    text: string;
    name: string;
}) => {
    const { text, name, id, styles, ...resetProps } = props ?? {};
    return (
        <AntButton
            {...resetProps}
            style={styles}
            data-component-id={id}
            className="Button"
        >
            {text ?? name}
        </AntButton>
    );
};

export const Button = {
    ...config,
    component: RunTimeButton,
}

