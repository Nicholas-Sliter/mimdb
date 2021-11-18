
export default function TextArea({name, setFunc, moreText}) {

    return (
    <div>
        <label htmlFor={name}> {`${name}:`} </label><br/>
        <textarea
            id={name}
            placeholder={`Film ${name} (${moreText})`}
            onChange={(event) => setFunc(event.target.value) }
            />
    </div>
    )
}