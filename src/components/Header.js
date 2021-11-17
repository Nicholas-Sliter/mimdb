
import styles from "../styles/NavBar.module.css";
import Category from "./Category";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useState } from "react";
import HamburgerButton from "./HamburgerButton";
import MenuDropDown from "./MenuDropDown";

export default function Header({genreList, classList}) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const buttonFunc = () => {
    setCategoriesOpen(!categoriesOpen);
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
            <SearchBar/>
            <HamburgerButton style={styles.menuButton} select={buttonFunc} />
                {(categoriesOpen) ? 
                  <MenuDropDown styleCont={styles.dropDownContainerShow} styleList={styles.dropDownList} />
                  : 
                  null}
            </div>
            

        </div>
      </div>
    </header>
  );
}
