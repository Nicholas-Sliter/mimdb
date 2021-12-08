import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import Introduction from "../../components/Introduction";
import styles from "../../styles/Home.module.css";


export default function SubmitPage() {

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header />
      <main>
        
        <Introduction/>
      </main>

      <footer>
         © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}