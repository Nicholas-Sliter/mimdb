
import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

export default function Home() {

  return (
    <div className={styles.container}>
      <CustomHead/>
      <Header/>
      <main>
        <h1 className="title">Final Project</h1>
        <p>Hooray, you got the project deployed!</p>
        <p>Now go and give it some content...</p>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}

