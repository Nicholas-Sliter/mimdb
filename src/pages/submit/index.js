import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import Submit from "../../components/Submit";

import styles from "../../styles/Home.module.css";


export default function SubmitPage() {

  const submitComplete = (content) => {
    const postSubmit = async () => {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(content),
        headers: new Headers({ "Content-Type": "application/json" })
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    }
    postSubmit();
  }

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header />
      <main>
        
        <Submit complete={submitComplete}/>
      </main>

      <footer>
         © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}