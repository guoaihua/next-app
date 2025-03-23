
import { CSSProperties } from "react"
import RunTimeText from './RunTimeText'
export const EditText = (props: {
    id: number;
    styles: CSSProperties;
    text: string;
    name: string;
}) => {
    return (
        <div><RunTimeText {...props} /></div>
    );
};