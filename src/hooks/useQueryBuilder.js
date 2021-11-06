//given an array of parameter to filter by, build a query string to be used in the fetch call

//import SERVER constant from config
//import SERVER from 
const SERVER = "#";

export default function useQueryBuilder({
  filterBy,
  sortBy,
  sortOrder,
  pageSize,
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [pageSizeNumber, setPageSizeNumber] = useState(null);

  useEffect(() => {
    //build query string
    //where filerBy is an object of key value pairs to filter by
    if (filterBy) {
      let queryString = "?";
      for (let key in filterBy) {
        queryString += `${key}=${filterBy[key]}&`;
      }
      setQuery(queryString);
    }
    let queryString = `${SERVER}/films/`;
    if (filterBy) {
      queryString += `filterBy=${filterBy.join(",")}`;
    }
    if (sortBy) {
      queryString += `&sortBy=${sortBy}`;
    }
    if (sortOrder) {
      queryString += `&sortOrder=${sortOrder}`;
    }
    if (pageSize) {
      queryString += `&pageSize=${pageSize}`;
    }
    setQuery(queryString);
    setSort(sortBy);
    setPageNumber(page);
    setPageSizeNumber(pageSize);
  }, [
    filterBy,
    sortBy,
    sortOrder,
    page,
    pageSize,
    searchTerm]);


    return query;

}