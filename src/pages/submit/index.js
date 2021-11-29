import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import Submit from "../../components/Submit";

import styles from "../../styles/Home.module.css";

export default function SubmitPage() {

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header />
      <main>
        <Submit genres={genres} courses={courses}/>
      </main>

      <footer>
         © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}