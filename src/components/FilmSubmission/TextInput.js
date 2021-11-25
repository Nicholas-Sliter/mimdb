import styles from "../../styles/SubmitPage.module.css";

export default function TextInput({ name, setFunc, moreText }) {
    return (
        <div className={styles.largeInput}>
            <label htmlFor={name}> {`${name}:`} </label>
            <input
                type="text"
                id={name}
                placeholder={moreText ? moreText : `${name} must be set`}
                onChange={(event) => setFunc(event.target.value)}
            />
        </div>
    )
}