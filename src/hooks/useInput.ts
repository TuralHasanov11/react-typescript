import useLocalStorage from "./useLocalStorage";

const useInput = (key: any, initValue: any) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    const reset = () => setValue(initValue);

    const attributeObj = {
        value,
        onChange: (e: { target: { value: any; }; }) => setValue(e.target.value)
    }

    return [value, reset, attributeObj];
}

export default useInput 