//given an array of parameter to filter by, build a query string to be used in the fetch call

//import SERVER constant from config
//import SERVER from 
import { useState, useEffect } from "react";
const SERVER = "#";

export default function useQueryBuilder({
  filterBy,
  sortBy,
  sortOrder,
  pageSize,
}) {
  const [query, setQuery] = useState("");


  useEffect(() => {
    //build query string
    //where filerBy is an object of key value pairs to filter by
    if (filterBy) {
      let queryString = "?";
      for (const key in filterBy) {
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
  }, [
    filterBy,
    sortBy,
    sortOrder,
    pageSize]);


    return query;

}