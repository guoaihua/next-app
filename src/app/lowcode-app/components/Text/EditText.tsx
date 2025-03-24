
import { CSSProperties } from "react"
import RunTimeText from './RunTimeText'
export const EditText = (props) => {
    const { id } = props;
    return (
        <div data-component-id={id}><RunTimeText {...props} /></div>
    );
};