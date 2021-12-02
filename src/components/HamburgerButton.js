

export default function HamburgerButton ({style, select}){

    return(
        <button data-testid="Menu-Button" className={style} onClick={() => select()}>
            <div/>
            <div/>
            <div/> 
        </button>
    )
}

