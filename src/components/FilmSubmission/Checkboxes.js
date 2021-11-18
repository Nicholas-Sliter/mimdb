export default function Checkboxes ({name, array, newVar, setFunc}) {
    return (
    <div>
        <label htmlFor={`${name}s`}> {`${name}s:`} </label>
        <div id={`${name}s`}>
        {array.map((i) => 
        <div key={i}>
            <input
                type="checkbox"
                id={i}
                name={i}
                value={i}
                />
            <label htmlFor={i}>{i}</label><br />
        </div>
        )}
        <input
            type="checkbox"
            id={`${name}_other`}
            name={`${name}_other`}
            value={`${name}_other`}
            onClick={() => setFunc(!newVar)}
            />
        <label id="small" htmlFor={`${name}_other`}>Other</label>
        {newVar? <input 
                        type="text"
                        id={`${name}_other`}
                        placeholder="Other"
                        />
        : <div> </div>}
        </div>
    </div>
    )
}