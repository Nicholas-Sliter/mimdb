import CustomHead from "../CustomHead";
import Header from "../Header";
//import { GenreCourseContext } from "../context/GenreCourseContext";
//import Footer from "../Footer"


export default function Layout({pageTitle, children}){

   return (
     <>
       <CustomHead pageTitle={pageTitle} />
       <Header />

       <main>{children}</main>

       <footer>
         © {`${new Date().getFullYear()}`} Middlebury Movie Database
       </footer>
     </>
   );

}


//genreList={genres} classList={courses}
// </GenreCourseContext.Provider>

