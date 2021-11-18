import { useEffect, useState } from "react";
import TextInput from "./TextInput";

export default function AddedText ({name}) {
    const [counter, addCount] = useState();
    const [inputList, setInputList] = useState([]);

    useEffect(() => {
        addCount(0);
        setInputList([""]);
    }, [])

    const addInput = (newName) => {
        setInputList[counter] = newName
    }
    
    // handle click event of the Add button
    const handleAddClick = () => {
        addCount(counter+1);
        setInputList([...inputList, ""]);
    };

    return (
    <div>
        <label htmlFor={`${name} 1`}> {`${name}s`}</label>
        {inputList.map((i, n) => 
        <TextInput key={i} name={`${name} ${n+1}`} setFunc={addInput} moreText={`${name} ${n+1}`}/>
        )}
        <button onClick={() => handleAddClick()}>{`Add ${name}`}</button>
    </div>
    )
}