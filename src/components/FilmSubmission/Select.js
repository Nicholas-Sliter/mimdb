import styles from "../../styles/SubmitPage.module.css";
import CreatableSelect from 'react-select/creatable';

export default function Select({ name, array, newVar, setFunc, setCategoryList }) {

    const options = array.map((item) => {
        return { value: item, label: item };
    });

    function handleSelect(e) {
        const tempList = e.map((item) => item.value);
        setCategoryList(tempList);
    }

    const customStyles = {
        container: (provided, state) => ({
            ...provided,
            padding: 0,
            height: 'fit-content',
        }),
        control: (provided, state) => ({
            ...provided,
            minHeight: 'fit-content',
            height: 'fit-content',
            padding: 0,
        }),
        input: (provided, state) => ({
            ...provided,
            fontSize: 16,
            height: 24,
            padding: 0,
        }),
        multiValue: (styles) => {
            return {
              ...styles,
              backgroundColor: "white",
              padding: 0,
            };
        }
    }

    return (
        <div>
            <label htmlFor={`${name}s`}> {`${name}s:`} </label>

            <CreatableSelect
                style={{ padding: "0vw" }}
                instanceId={name}
                isMulti isSearchable autoFocus
                options={options} onChange={handleSelect}
                styles={customStyles}>
            </CreatableSelect>


            {/* {array.map((i) =>
                    <div key={i} className={styles.small}>
                        <input
                            type="checkbox"
                            id={i}
                            name={i}
                            value={i}
                        />
                        <label htmlFor={i}>{i}</label><br />
                    </div>
                )} */}

            {/* {<div className={styles.small}>
                    <input
                        type="checkbox"
                        id={`${name}_other`}
                        name={`${name}_other`}
                        value={`${name}_other`}
                        onClick={() => setFunc(!newVar)}
                    />
                    <label id="small" htmlFor={`${name}_other`}>Other</label>
                    {newVar && <input
                        type="text"
                        id={`${name}_other`}
                        placeholder="Other"
                    />}
                </div>} */}
        </div>
    )
}