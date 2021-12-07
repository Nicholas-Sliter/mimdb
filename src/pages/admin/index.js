import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import AdminPage from "../../components/AdminPage";

import styles from "../../styles/Home.module.css";
import useResolveQuery from "../../hooks/useResolveQuery";



export default function Admin() {

  const adminFunc = async(apiCall, film) => {
    if(film) {
        const response = await fetch(`/api/films/${film.slug}/${apiCall}`, {
        method: "PUT"

        })
        
        console.log(response)

        if (!response.ok) {
            //throw new Error(response.statusText)
        }
    }
  } 

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header />
      <main>
        
        <AdminPage films={useResolveQuery("")} adminFunc={adminFunc}/>
      </main>

      <footer>
         © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}