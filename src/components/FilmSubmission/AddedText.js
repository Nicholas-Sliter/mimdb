// import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import styles from "../../styles/SubmitPage.module.css";

export default function AddedText({ name, inputList, setInputList }) {

    const addInput = (newName) => {
        const updatedList = [...inputList];
        updatedList[inputList.length - 1] = newName;
        setInputList(updatedList);
    }

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, ""]);
    };

    let key = 0;

    return (
        <div className={styles.smallInput}>
            <label htmlFor={`${name} 1`}> {`${name}s`}</label>
            <div className={styles.small}>
                {inputList.map((i, n) =>
                    <TextInput key={key++} name={`${name} ${n + 1}`} setFunc={addInput} moreText={`${name} ${n + 1}`} />
                )}
            </div>
            <button onClick={() => handleAddClick()}>{`Add ${name}`}</button>
        </div>
    )
}