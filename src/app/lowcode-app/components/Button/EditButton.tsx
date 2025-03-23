
import { CSSProperties } from "react"
import { RunTimeButton } from "./RunTimeButton";

export const EditButton = (props: {
    id: number;
    styles: CSSProperties;
    text: string;
    name: string;
}) => {
    const { text, name, id, styles, ...resetProps } = props ?? {};
    return (
        <div><RunTimeButton {...props} /></div>
    );
};