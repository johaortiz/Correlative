import { useState } from "react";

const useOnChange = (props: { initialState: any }) => {

    const [values, setValues] = useState(props.initialState)

    const handleChange = (event) => {
        console.log(event);
    };

    return [values, handleChange];
};
export default useOnChange;