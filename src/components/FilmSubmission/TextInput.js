//import styles from "../../styles/SubmitPage.module.css";
import styles from "../../styles/components/TextInput.module.scss";

export default function TextInput({ name, contents="", setFunc, moreText, validator }) {
    return (
        <div className={styles.textInput}>
            <span htmlFor={name}> {`${name}:`} </span>
            <input
                type="text"
                id={name.replace(/\s/g, '')}
                placeholder={moreText ? moreText : `${name} must be set`}
                onChange={(event) => setFunc(event.target.value)}
            />
        </div>
    )
}