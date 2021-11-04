/*
Category.js

Display a category of drop down menu that is used in Header.js
*/
import styles from "../styles/NavBar.module.css";
import { FiChevronDown } from "react-icons/fi";


export default function Category({fieldName, fieldList}){
    let uniqueFields = "";
    if (fieldList === undefined){
        uniqueFields = <a/>
    }
    else{
        let key = 0; //key should not be an array index, needs to change to the field name as it will be unique
        uniqueFields = fieldList.map((field)=><a data-testid="dropdown" key={key++}>{field}</a>);
    }


    return (
      <div className={styles.dropdown}>
        <div className={`${styles.filterCrit} noselect`}>
          <span>
            <b>{fieldName}</b> <FiChevronDown className={styles.icon} />
          </span>
          <div className={styles.dropdownContainer}>{uniqueFields}</div>
        </div>
      </div>
    );
}