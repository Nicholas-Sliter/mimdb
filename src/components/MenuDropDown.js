import Link from "next/link";

export default function MobileMenuDropDown({ styleCont, styleList }) {
  // TODO: we need to create dropdown components for the filter and courses
  // perhaps on click replace the current contents of this menu with the 
  // contents for the Filter and Course dropdowns

  return (
    <div className={styleCont}>
      <ul className={styleList}>
        <li>
          <Link href={`/search?keyword=`} passHref>
            <a>Filter</a>
          </Link>
        </li>
        <li>
          <Link href={`/films/course/`} passHref>
            <a>Courses</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
