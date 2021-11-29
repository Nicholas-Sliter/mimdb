//import styles from "../../styles/SubmitPage.module.css";
import CreatableSelect from "react-select/creatable";

export default function Select({ name, array, setCategoryList }) {

    const options = array.map((item) => {
        return { value: item, label: item };
    });

    function handleSelect(e) {
        const tempList = e.map((item) => item.value);
        setCategoryList(tempList);
    }

    const customStyles = {
        container: (provided) => ({
            ...provided,
            height: "fit-content",
        }),
        control: (provided) => ({
            ...provided,
            fontSize: 18,
            minHeight: "fit-content",
            height: "fit-content",       
            color: "#203569",
            border: "2px solid #203569",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"
        }),
        input: (provided) => ({
            ...provided,
            fontSize: 16,
            height: 24,
            padding: 0.6,
            color: "#203569",
        }),
        multiValue: (styles) => ({
            ...styles,
            backgroundColor: "white",
        })
    }

    return (
        <div>
            <label htmlFor={`${name}s`}> {`${name}s:`} </label>
            <CreatableSelect
                instanceId={name}
                isMulti isSearchable
                options={options} onChange={handleSelect}
                styles={customStyles}
            />



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