//import styles from "../../styles/SubmitPage.module.css";
import styles from "../../styles/components/TextInput.module.scss";
import ErrorMessage from "../common/ErrorMessage";
import { useState } from "react";

export default function TextInput({ name, setFunc, moreText, id, validator, errorObject, setErrorObject }) {
  const [errorMessage, setErrorMessage] = useState("");

  const validateInput = (input) => {
    const error = validator(input);
    console.log(error);
    setErrorMessage(error);
    return (error==="");
  };

  const updateErrorMessage = (input) => {
    console.log({ ...errorObject, [id]: !validateInput(input) });
    setErrorObject({ ...errorObject, [id]: !validateInput(input) })
  }


  return (
    <div className={styles.textInput}>
      <span htmlFor={name}> {`${name}:`} </span>
      <input
        type="text"
        id={name.replace(/\s/g, "")}
        placeholder={moreText ? moreText : `${name} must be set`}
        onChange={(event) => { setFunc(event.target.value); updateErrorMessage(event.target.value) }}
      />
      <ErrorMessage clasName={styles.error} message={errorMessage} />
    </div>
  )
}