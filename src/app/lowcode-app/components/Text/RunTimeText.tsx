
import { CSSProperties } from "react"
import { Switch, Typography } from 'antd';

const { Text: AntdText, Title } = Typography;
import config from './config'

const RunTimeText = (props: {
    id: number;
    styles: CSSProperties;
    text: string;
    name: string;
    ellipsis?: boolean
    isInline?: boolean;
    rows?: number;
    level?: 1 | 2 | 3 | 4 | 5
    textAlign?: any
}) => {
    const { text, name, id, styles, ellipsis, rows, isInline, level, textAlign, ...resetProps } = props ?? {};

    const renderText = (chldren) => {
        if (level >= 1) {
            return <Title style={{ ...styles, textAlign }} data-component-id={id} ellipsis={rows ? { rows: rows, } : null} {...resetProps} level={level}>{chldren}</Title>
        } else {
            return (
                <AntdText
                    {...resetProps}
                    style={{ ...styles, display: isInline ? 'inline-block' : 'block', textAlign }}
                    data-component-id={id}
                    ellipsis
                >
                    {chldren ?? name}
                </AntdText >
            )
        }
    }

    return renderText(text)
};

export const Text = {
    ...config,
    component: RunTimeText,
}

export default RunTimeText;