import DirectorPage from "../../components/DirectorPage";

export default function Director({films, genres, courses}) {

    return (
      <div /*className={styles.container}*/>
        <CustomHead />
        <Header genreList={genres} classList={courses} />
        <main>
          <DirectorPage />
        </main>
  
        <footer>
           © {`${new Date().getFullYear()}`} Middlebury Movie Database
        </footer>
      </div>
    );
  }