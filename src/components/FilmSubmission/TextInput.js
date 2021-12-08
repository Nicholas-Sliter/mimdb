//import styles from "../../styles/SubmitPage.module.css";
import styles from "../../styles/components/TextInput.module.scss";
import ErrorMessage from "../common/ErrorMessage";
import { useState } from "react";

export default function TextInput({ name, setFunc, moreText, id, validator, errorObject, setErrorObject }) {
  const [errorMessage, setErrorMessage] = useState("");

  const validateInput = (input) => {
    const error = validator(input);
    console.log(error);
    if (error) {
      setErrorMessage(error);
      return false;
    }
    return true;
  };

  const updateErrorMessage = (input) => {
    setErrorObject({ ...errorObject, [id]: validateInput(input) })
  }


  return (
    <div className={styles.textInput}>
      <span htmlFor={name}> {`${name}:`} </span>
      <ErrorMessage message={errorMessage} />
      <input
        type="text"
        id={name.replace(/\s/g, "")}
        placeholder={moreText ? moreText : `${name} must be set`}
        onChange={(event) => { setFunc(event.target.value); updateErrorMessage(event.target.value) }}
      />
    </div>
  )
}