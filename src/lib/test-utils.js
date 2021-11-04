export const movies = [
    {
      title: "Star Wars",
      genre_ids: "Sci-Fi",
      class: "Sigh and Sound",
    },
    {
    title: "Revenant",
    genre_ids: "Action",
    class: "Hollywood",
    },
    {
    title: "Black Fish",
    genre_ids: "Documentary",
    class: "Documentary"
    },
    {
    title: "Star Trek",
    genre_ids: "Sci Fi",
    class: "Hollywood"
    },
  ];
  
  export const genre_ids = [
    ...new Set(movies.map((movie) => movie.genre_ids)),
  ].sort();

  export const classes = [
    ...new Set(movies.map((movie) => movie.class)),
  ].sort();
  

  