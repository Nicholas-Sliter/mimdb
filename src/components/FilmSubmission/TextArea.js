import styles from "../../styles/SubmitPage.module.css";
import ErrorMessage from "../common/ErrorMessage";
import { useState } from "react";

export default function TextArea({ name, setFunc, moreText, id, validator, errorObject, setErrorObject }) {
  const [errorMessage, setErrorMessage] = useState("");

  const validateInput = (input) => {
    const error = validator(input);
    console.log(error);
    setErrorMessage(error);
    return (error==="");
  };

  const updateErrorMessage = (input) => {
    setErrorObject({ ...errorObject, [id]: validateInput(input) })
  }

  return (
    <div className={styles.largeTextarea}>
      <label htmlFor={name}> {`${name}:`} </label><br />
      <textarea
        id={name}
        placeholder={`Film ${name} (${moreText})`}
        onChange={(event) => {setFunc(event.target.value); updateErrorMessage(event.target.value)}}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  )
}