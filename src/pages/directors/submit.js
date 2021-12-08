
import DirectorSubmit from "../../components/DirectorSubmit";

import styles from "../../styles/Home.module.css";


export default function SubmitDirPage() {

  const submitDirComplete = (content) => {
    console.log(JSON.stringify(content));
    const postSubmit = async () => {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(content), headers: new Headers({ "Content-Type": "application/json" })
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    }
    postSubmit();
  }

  return (

    <div className={styles.container}>


      <main>

        <DirectorSubmit complete={submitDirComplete} />
      </main>

      <footer>
        © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>

    </div>
  );
}