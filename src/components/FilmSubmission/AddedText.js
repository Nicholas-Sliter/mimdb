import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import styles from "../../styles/SubmitPage.module.css";

export default function AddedText({ name }) {
    const [counter, setCounter] = useState(0);
    const [inputList, setInputList] = useState([""]);

    const addInput = (newName) => {
        setInputList[counter] = newName;
    }

    // handle click event of the Add button
    const handleAddClick = () => {
        setCounter(counter + 1);
        setInputList([...inputList, ""]);
    };

    return (
        <div>
            <label htmlFor={`${name} 1`}> {`${name}s`}</label>
            <div className={styles.small}>
                {inputList.map((i, n) =>
                    <TextInput key={i} name={`${name} ${n + 1}`} setFunc={addInput} moreText={`${name} ${n + 1}`} />
                )}
            </div>
            <button onClick={() => handleAddClick()}>{`Add ${name}`}</button>
        </div>
    )
}