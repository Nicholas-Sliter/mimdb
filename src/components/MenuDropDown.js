
import Link from "next/link";



export default function HamburgerButton ({styleCont, styleList}){


    return(
        <div className={styleCont}> 
            <ul className={styleList}>
                <li>
                    <Link href={`/search?keyword=`} passHref>
                        <a>Filter</a>
                    </Link>
                </li>
                <li>
                    <Link href={`/films/course/`} passHref>
                        <a>Courses</a>
                    </Link>
                </li>
            </ul>
        </div> 


    )
}