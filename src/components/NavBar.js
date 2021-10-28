/*************
Logo needs to bring back to homepage

Need dropdowns for Genres and Classes 

Need search to return somewhere

SearchCriteria func

filterCriteria func


****************/



import styles from "../styles/NavBar.module.css";



export default function NavBar ({searchCriteria, filterCriteria}){

    



    return(
        <div className={styles.navbar}>
            <a className={styles.logo}><img src="/mimdb-logo-full.svg" /></a>
            <div className={styles.filter}>
                <a className={styles.filterCrit}>Genres</a>
                <a className={styles.filterCrit}>Courses</a>
                <a className={styles.serachbar}><input type="text" placeholder="Search.."/></a>
            </div>
        </div> 

    )
}