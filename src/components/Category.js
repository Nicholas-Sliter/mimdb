/*
Category.js

Display a category of drop down menu that is used in Header.js
*/
import styles from "../styles/NavBar.module.css";

export default function Category({fieldName, fieldList}){
    const uniqueFields = fieldList.map((field, index)=><a key={index}>{field}</a>);

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