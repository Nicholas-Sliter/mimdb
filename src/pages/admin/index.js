import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import AdminPage from "../../components/AdminPage";

import styles from "../../styles/Home.module.css";


export default function Admin() {

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header />
      <main>
        
        <AdminPage/>
      </main>

      <footer>
         © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}