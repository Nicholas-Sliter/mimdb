import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import Submit from "../../components/Submit";

export default function Home({genres, courses}) {

  return (
    <div /*className={styles.container}*/>
      <CustomHead />
      <Header genreList={genres} classList={courses} />
      <main>
        <Submit genres={genres} courses={courses}/>
      </main>

      <footer>
         © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}