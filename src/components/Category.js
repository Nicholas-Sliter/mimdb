/*
Category.js

Display a category of drop down menu that is used in Header.js
*/
import styles from "../styles/NavBar.module.css";


export default function Category({fieldName, fieldList}){
    let uniqueFields = "";
    if (fieldList === undefined){
        uniqueFields = <a/>
    }
    else{
        let key = 0;
        uniqueFields = fieldList.map((field)=><a data-testid="dropdown" key={key++}>{field}</a>);
    }


    return (
        <div className={styles.dropdown}>
            <div className={styles.filterCrit}>{fieldName}
                <div className={styles.dropdownContainer}>
                    {uniqueFields}
                </div>
            </div>
        </div>
    );
}