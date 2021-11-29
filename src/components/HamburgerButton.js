

export default function HamburgerButton ({style, select}){

    return(
        <button className={style} onClick={() => select()}>
            <div/>
            <div/>
            <div/> 
        </button>
    )
}

