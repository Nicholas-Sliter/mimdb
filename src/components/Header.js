
import styles from "../styles/NavBar.module.css";
import Category from "./Category";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useState } from "react";


export default function Header({genreList, classList}) {
  const [categoriesOpen, setCategoriesOpen] = useState();
  let button = false;


  const buttonFunc = () => {
    if (button === true){
      button = false
    }
    else{
      button = true
    }
    setCategoriesOpen(button);
  };


  return (
    <header>
      <div className={styles.navbar}>
        <Link href="/" passHref>
          <a className={`${styles.logo} noselect`} draggable={false}>
            <img draggable={false} alt="MIMDB" src="/mimdb-logo-full.svg" />
          </a>
        </Link>
        <div className={styles.filter}>
            <div className={styles.bigScreen}>
              <div className={styles.fullWidthContainer}>
                <Category fieldName={"Genre"} fieldList={genreList}/>
                <Category fieldName={"Course"} fieldList={classList}/>
                <SearchBar />
              </div>
            </div>


            <div className={styles.smallScreen}>
            <SearchBar />
              <button className={styles.menuButton} onClick={() => buttonFunc()}>
                <div/>
                <div/>
                <div/> 
              </button>
                <div className={categoriesOpen ? styles.dropDownContainerShow : styles.dropDownContainer}> 
                  <ul className={styles.dropDownList}>
                    <li><a>Filter</a></li>
                    <li><a>Courses</a></li>
                  </ul>

                </div>
            </div>
            

        </div>
      </div>
    </header>
  );
}
