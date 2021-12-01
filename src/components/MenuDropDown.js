import Link from "next/link";
import Category from "./Category";
import { useContext } from "react";
import { GenreCourseContext} from  "./context/GenreCourseContext";

export default function MobileMenuDropDown({ styleCont, styleList }) {
  const {genres, courses} = useContext(GenreCourseContext);
  // TODO: we need to create dropdown components for the filter and courses
  // perhaps on click replace the current contents of this menu with the 
  // contents for the Filter and Course dropdowns

  return (
    <div className={styleCont}>
      <ul className={styleList}>
        <li>
        <Category fieldName={"Genre"} fieldList={genres} mobile={true}/>
        </li>
        <li>
        <Category fieldName={"Course"} fieldList={courses} mobile={true}/>
        </li>
      </ul>
    </div>
  );
}
