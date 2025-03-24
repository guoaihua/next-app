
import RunTimeSearch from "./RunTimeSearch"

export const EditSearch = (props) => {
    const id = props.id
    return (
        <div data-component-id={id}> <RunTimeSearch {...props} /></div>
    )
}

