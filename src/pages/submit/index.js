import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import Submit from "../../components/Submit";

import styles from "../../styles/Home.module.css";


export default function SubmitPage() {

  const submitComplete = async (content) => {
    const postSubmit = async () => {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(content),
        headers: new Headers({ "Content-Type": "application/json" })
      });
      let error=null;
      if (!response.ok) {
        error = new Error(response.statusText);
      }

      return ({ok:response.ok, error});
    }
    return await postSubmit();
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